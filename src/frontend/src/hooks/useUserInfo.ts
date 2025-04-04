import { useState, useEffect, useCallback } from "react";
import { useActors } from "./useActors";
import { UserInfoType } from "../types"; // Your existing type

const defaultUserInfo: UserInfoType = {
  name: "Loading...",
  height: "-",
  weight: "-",
  goals: "Loading...",
};

export const useUserInfo = () => {
  const { userActor, isLoading: actorsLoading } = useActors();
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null); // Start as null
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInfo = useCallback(async () => {
    if (!userActor) {
      // Only set loading if actors aren't already loading
      if (!actorsLoading) setIsLoading(false);
      return;
    }

    console.log("Fetching user info...");
    setIsLoading(true);
    setError(null);
    try {
      // Make sure the backend returns the correct type {name: Text; height: Text; ...}
      const fetchedInfo = await userActor.getUserInfo();

      // Basic check if fetchedInfo is valid - adjust based on actual return type
      if (fetchedInfo && typeof fetchedInfo.name === "string") {
        console.log("User info fetched:", fetchedInfo);
        setUserInfo({
          name: fetchedInfo.name,
          height: fetchedInfo.height,
          weight: fetchedInfo.weight,
          goals: fetchedInfo.goals,
        });
      } else {
        console.warn(
          "Fetched user info is not in expected format:",
          fetchedInfo
        );
        setUserInfo(defaultUserInfo); // Or handle as error
        setError("Received unexpected user info format.");
      }
    } catch (err) {
      console.error("Failed to fetch user info:", err);
      setError("Could not load user information.");
      setUserInfo(null); // Set back to null on error
    } finally {
      setIsLoading(false);
    }
  }, [userActor, actorsLoading]);

  // Initial fetch
  useEffect(() => {
    // Only fetch if userActor is available and not loading actors
    if (userActor && !actorsLoading) {
      fetchUserInfo();
    } else if (!actorsLoading) {
      // If actors are loaded but userActor is null (e.g., error during creation)
      setIsLoading(false);
      setError("User backend is not available.");
      setUserInfo(null);
    } else {
      // Still waiting for actors to load
      setIsLoading(true);
    }
  }, [userActor, actorsLoading, fetchUserInfo]);

  const setUserInfoWithLLM = useCallback(
    async (message: string) => {
      if (!userActor) {
        setError("User backend is not available.");
        return;
      }
      console.log("Setting user info via LLM...");
      setIsLoading(true); // Indicate loading for the update+fetch cycle
      setError(null);
      try {
        await userActor.setUserInfoWithLLM(message);
        console.log("User info set via LLM, refreshing...");
        await fetchUserInfo(); // Refresh data after setting
      } catch (err) {
        console.error("Failed to set user info with LLM:", err);
        setError("Could not update user information using the provided text.");
        setIsLoading(false); // Ensure loading stops on error
      }
      // setIsLoading is handled by fetchUserInfo's finally block if successful
    },
    [userActor, fetchUserInfo]
  );

  return {
    userInfo: userInfo ?? defaultUserInfo, // Provide default while null
    isLoading: isLoading || actorsLoading, // Combine loading states
    error,
    refreshUserInfo: fetchUserInfo, // Expose refresh function
    setUserInfoWithLLM,
  };
};
