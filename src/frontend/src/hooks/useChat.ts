import { useState, useEffect, useCallback } from "react";
import { useActors } from "./useActors";
import { ChatMessageType } from "../types"; // Your existing type
import { ChatMessage as BackendChatMessageType } from "declarations/user/user.did"; // Import backend type

// Helper to convert backend role enum to frontend string
const convertRole = (role: any): "user" | "assistant" | "system" => {
  if (role && typeof role === "object") {
    if ("user" in role) return "user";
    if ("assistant" in role) return "assistant";
    if ("system" in role) return "system";
  }
  console.warn("Unknown role format:", role);
  return "assistant"; // Default to assistant
};

// Use chat
export const useChat = () => {
  const { userActor, isLoading: actorsLoading } = useActors();
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChatHistory = useCallback(async () => {
    if (!userActor) {
      if (!actorsLoading) setIsLoading(false);
      return;
    }
    console.log("Fetching chat history...");
    setIsLoading(true);
    setError(null);
    try {
      const history: BackendChatMessageType[] =
        await userActor.getChatHistory();
      const formattedHistory: ChatMessageType[] = history.map((msg) => ({
        // Convert backend structure to frontend
        role: convertRole(msg.role),
        content: msg.content,
      }));
      setMessages(formattedHistory);
      console.log("Chat history fetched:", formattedHistory.length, "messages");
    } catch (err) {
      console.error("Failed to fetch chat history:", err);
      setError("Could not load chat history.");
      setMessages([]); // Clear messages on error
    } finally {
      setIsLoading(false);
    }
  }, [userActor, actorsLoading]);

  // Initial fetch
  useEffect(() => {
    if (userActor && !actorsLoading) {
      fetchChatHistory();
    } else if (!actorsLoading) {
      setIsLoading(false);
      setError("User backend is not available for chat.");
      setMessages([]);
    } else {
      setIsLoading(true);
    }
  }, [userActor, actorsLoading, fetchChatHistory]);

  const sendMessage = useCallback(
    async (userMessage: string) => {
      if (!userActor) {
        setError("Cannot send message: User backend not available.");
        return;
      }
      if (!userMessage.trim()) return; // Don't send empty messages

      console.log("Sending message:", userMessage);
      const newUserMessage: ChatMessageType = {
        role: "user",
        content: userMessage,
      };
      // Optimistic update
      setMessages((prev) => [...prev, newUserMessage]);
      setIsLoading(true); // Indicate loading for response
      setError(null);

      try {
        const response = await userActor.chat(userMessage);
        const assistantMessage: ChatMessageType = {
          role: "assistant",
          content: response,
        };
        // Replace optimistic + add response properly (or fetch history again if needed)
        // This simple add might lead to duplicates if backend already added user message
        // A safer approach might be to refetch history, but this is faster UI
        setMessages((prev) => [...prev, assistantMessage]);
        console.log("Received response:", response);
      } catch (err) {
        console.error("Failed to send message or get response:", err);
        setError("Failed to get a response from the assistant.");
        // Optional: Remove optimistic user message on error
        // setMessages(prev => prev.filter(msg => msg !== newUserMessage));
      } finally {
        setIsLoading(false);
      }
    },
    [userActor]
  ); // Removed setMessages from dependencies - managed internally

  const fetchAdvice = useCallback(async () => {
    if (!userActor) {
      setError("Cannot get advice: User backend not available.");
      return;
    }
    console.log("Fetching advice...");
    setIsLoading(true);
    setError(null);
    try {
      const adviceResponse = await userActor.advice();
      const adviceMessage: ChatMessageType = {
        role: "assistant",
        content: adviceResponse,
      };
      setMessages((prev) => [...prev, adviceMessage]);
      console.log("Received advice:", adviceResponse);
    } catch (err) {
      console.error("Failed to fetch advice:", err);
      setError("Could not fetch advice.");
    } finally {
      setIsLoading(false);
    }
  }, [userActor]); // Removed setMessages from dependencies

  const clearChatHistory = useCallback(async () => {
    if (!userActor) {
      setError("Cannot clear history: User backend not available.");
      return;
    }
    console.log("Clearing chat history...");
    // Optional: Optimistic UI update
    // setMessages([]);
    setIsLoading(true);
    setError(null);
    try {
      await userActor.clearChatHistory();
      setMessages([]); // Clear local state on success
      console.log("Chat history cleared.");
    } catch (err) {
      console.error("Failed to clear chat history:", err);
      setError("Could not clear chat history.");
      // Optional: Refetch history on error to revert optimistic update
      // fetchChatHistory();
    } finally {
      setIsLoading(false);
    }
  }, [userActor]); // Removed setMessages from dependencies

  return {
    messages,
    isLoading: isLoading || actorsLoading, // Combine loading states
    error,
    sendMessage,
    fetchAdvice,
    clearChatHistory,
  };
};
