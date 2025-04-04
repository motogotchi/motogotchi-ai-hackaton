import { MessageCircleMore, Send } from "lucide-react";
import { useState } from "react";
import { ChatMessageType } from "src/types";

// Chat
const Chat = ({
  messages,
  sendMessage,
}: {
  messages: ChatMessageType[];
  sendMessage: (message: string) => void;
}) => {
  const [currentMessage, setCurrentMessage] = useState("");

  // Handle sending messages
  const handleSendMessage = () => {
    sendMessage(currentMessage);
    setCurrentMessage("");
  };

  return (
    <div className="flex-1 flex flex-col border-t-2 shadow-lg border-white/40 bg-linear-210 from-violet-800 to-fuchsia-800 inset-ring-4 inset-ring-white/20 -mb-8 -mr-8 rounded-2xl overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center justify-between py-4 px-6 border-b-2 border-white/10">
        <div className="flex items-center gap-2">
          <MessageCircleMore className="text-white/50" />
          <div className="font-medium text-lg leading-none">Conversation</div>
        </div>
        <button className="border-2 border-white/20 rounded-md px-2 py-1 text-sm tracking-wide cursor-pointer active:translate-y-px hover:border-white/30 transition hover:bg-white/10">
          View history
        </button>
      </div>

      {/* Chat area */}
      <div className="flex flex-col-reverse flex-1 px-6 py-2 overflow-y-scroll">
        <div className="flex flex-col gap-4 justify-end">
          {messages.map((message) => {
            if (message.role === "user") {
              return (
                <div
                  key={message.content}
                  className="pl-4 flex gap-3 justify-end items-end"
                >
                  <div className="leading-snug bg-white/30 rounded-lg shadow-md px-3 py-2 border-t border-white/20">
                    {message.content}
                  </div>
                  <div className="flex shrink-0 rounded-lg w-8 h-8 border-3 border-white/30 bg-gray-500 shadow">
                    <span className="m-auto text-sm font-semibold text-white/70">
                      JD
                    </span>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={message.content}
                  className="pr-4 flex gap-3 items-end"
                >
                  <div className="bg-[url(/public/motogotchi-avatar.webp)] bg-cover w-8 h-8 shrink-0 rounded-lg inset-ring-[3px] inset-ring-white/30 shadow"></div>
                  <div className="bg-white/10 leading-snug rounded-lg shadow-md px-3 py-2 border-t border-white/20">
                    {message.content}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>

      {/* Chat form */}
      <div className="p-2 rounded-xl flex items-center gap-2  m-2">
        {/* Input */}
        <input
          className="w-full bg-gray-300 text-black placeholder:text-gray-500 rounded-lg px-4 py-3.5 focus:outline-0 inset-ring-4 inset-ring-white"
          type="text"
          placeholder="Your message.."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleSendMessage}
          className="flex cursor-pointer bg-linear-210 from-teal-600 to-cyan-600 transition hover:from-teal-500 hover:to-cyan-500 hover:scale-105 shadow-lg rounded-lg inset-ring-4 inset-ring-white/20 aspect-square h-full active:translate-y-px"
        >
          <Send className="w-5 h-5 m-auto" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
