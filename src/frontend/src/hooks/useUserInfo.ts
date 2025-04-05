import { useState, useEffect, useCallback } from "react";
import { useActors } from "./useActors";
import { UserInfoType } from "../types";

const defaultUserInfo: UserInfoType = {
  name: "Loading...",
  height: "-",
  weight: "-",
  goals: "Loading...",
};

// User info hooks
export const useUserInfo = () => {
  const { userActor, isLoading: actorsLoading } = useActors();
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInfo = useCallback(async () => {
    if (!userActor) {
      if (!actorsLoading) setIsLoading(false);
      return;
    }

    console.log("Fetching user info...");
    setIsLoading(true);
    setError(null);
    try {
      const fetchedInfo = await userActor.getUserInfo();

      // Check if fetchedInfo is valid
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
        setUserInfo(defaultUserInfo);
        setError("Received unexpected user info format.");
      }
    } catch (err) {
      console.error("Failed to fetch user info:", err);
      setError("Could not load user information.");
      setUserInfo(null);
    } finally {
      setIsLoading(false);
    }
  }, [userActor, actorsLoading]);

  // Initial fetch
  useEffect(() => {
    if (userActor && !actorsLoading) {
      fetchUserInfo();
    } else if (!actorsLoading) {
      setIsLoading(false);
      setError("User backend is not available.");
      setUserInfo(null);
    } else {
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
      setIsLoading(true);
      setError(null);
      try {
        await userActor.setUserInfoWithLLM(message);
        console.log("User info set via LLM, refreshing...");
        await fetchUserInfo();
      } catch (err) {
        console.error("Failed to set user info with LLM:", err);
        setError("Could not update user information using the provided text.");
        setIsLoading(false);
      }
    },
    [userActor, fetchUserInfo]
  );

  return {
    userInfo: userInfo ?? defaultUserInfo,
    isLoading: isLoading || actorsLoading,
    error,
    refreshUserInfo: fetchUserInfo,
    setUserInfoWithLLM,
  };
};
