import { MessageCircleMore, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ChatMessageType } from "src/types";
import { useAuth } from "../hooks/useAuth";

interface ChatProps {
  messages: ChatMessageType[];
  sendMessage: (message: string) => void;
  setUserInfoWithLLM: (message: string) => void;
  isLoading: boolean;
}

// Chat component
const Chat = ({
  messages,
  sendMessage,
  setUserInfoWithLLM,
  isLoading,
}: ChatProps) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const { principal } = useAuth(); // Get principal for user avatar initials
  const chatEndRef = useRef<HTMLDivElement>(null); // Ref for scrolling

  // Set user initials, improve later
  const userInitials = ": )";

  // Handle sending messages
  const handleSendMessage = () => {
    if (!currentMessage.trim() || isLoading) return; // Prevent sending empty or while loading

    const userInfoMessage = currentMessage.startsWith("/info")
      ? currentMessage.substring(5)
      : null;

    console.log({ userInfoMessage });

    userInfoMessage
      ? setUserInfoWithLLM(userInfoMessage)
      : sendMessage(currentMessage);

    setCurrentMessage("");
  };

  // Handle Enter key press in input
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent default newline on Enter
      handleSendMessage();
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col border-t-2 shadow-lg border-white/40 bg-linear-210 from-violet-800 to-fuchsia-800 inset-ring-4 inset-ring-white/20 -mb-8 -mr-8 rounded-2xl overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center justify-between py-4 px-6 border-b-2 border-white/10">
        <div className="flex items-center gap-2">
          <MessageCircleMore className="text-white/50" />
          <div className="font-medium text-lg leading-none">Conversation</div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex flex-col flex-1 px-6 py-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => {
          // Don't render system messages by default
          if (message.role === "system") return null;

          const isUser = message.role === "user";
          return (
            <div
              key={`${message.role}-${index}`}
              className={`flex gap-3 items-end ${
                isUser ? "justify-end pl-4" : "justify-start pr-4"
              }`}
            >
              {/* Assistant Avatar */}
              {!isUser && (
                <div className="bg-[url(/motogotchi-avatar.webp)] bg-cover w-8 h-8 shrink-0 rounded-lg inset-ring-[3px] inset-ring-white/30 shadow"></div>
              )}

              {/* Message Bubble */}
              <div
                className={`leading-snug rounded-lg shadow-md px-3 py-2 border-t border-white/20 max-w-[80%] ${
                  isUser ? "bg-white/30" : "bg-white/10"
                }`}
              >
                {/* Improve rendering of newlines */}
                {message.content.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </div>

              {/* User Avatar */}
              {isUser && (
                <div
                  title={principal?.toText()}
                  className="flex shrink-0 rounded-lg w-8 h-8 border-3 border-white/30 bg-gray-500 shadow"
                >
                  <span className="m-auto text-sm font-semibold text-white/70">
                    {userInitials}
                  </span>
                </div>
              )}
            </div>
          );
        })}
        {/* Empty div to scroll to */}
        <div ref={chatEndRef} />
        {isLoading &&
          messages.length > 0 &&
          messages[messages.length - 1].role === "user" && (
            <div className="flex gap-3 items-end justify-start pr-4">
              <div className="bg-[url(/motogotchi-avatar.webp)] bg-cover w-8 h-8 shrink-0 rounded-lg inset-ring-[3px] inset-ring-white/30 shadow"></div>
              <div className="leading-snug rounded-lg shadow-md px-3 py-2 border-t border-white/20 bg-white/10 italic text-white/50">
                Thinking...
              </div>
            </div>
          )}

        {messages.length === 0 ? (
          <div className="m-auto text-center opacity-60">
            <div>It's quiet here.</div>
            <div>Try saying hello to the Motogotchi.</div>
          </div>
        ) : null}
      </div>

      {/* Chat form */}
      <div className="p-2 flex items-center gap-2 m-2 border-t border-white/10 pt-3">
        {/* Input */}
        <input
          className="w-full bg-gray-300 text-black placeholder:text-gray-500 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500 inset-ring-4 inset-ring-white" // Improved focus style
          type="text"
          placeholder="Your message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        {/* Button */}
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !currentMessage.trim()}
          className="flex cursor-pointer bg-linear-210 from-teal-600 to-cyan-600 transition hover:from-teal-500 hover:to-cyan-500 hover:scale-105 shadow-lg rounded-lg inset-ring-4 inset-ring-white/20 aspect-square h-full active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Send className="w-5 h-5 m-auto" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
