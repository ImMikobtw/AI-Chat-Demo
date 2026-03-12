import type { RefObject } from "react";
import type { Message } from "@/types/chat";

type ChatMessagesProps = {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: RefObject<HTMLDivElement | null>;
};

export default function ChatMessages({
  messages,
  isLoading,
  messagesEndRef,
}: ChatMessagesProps) {
  return (
    <div className="mb-4 flex h-[420px] flex-col gap-3 overflow-y-auto rounded-2xl border border-white/10 bg-slate-900/50 p-4">
      {messages.length === 0 ? (
    <div className="flex flex-1 flex-col items-center justify-center text-center text-slate-400">
        <p className="text-base font-medium text-slate-300">
            Start your conversation
        </p>
        <p className="mt-2 max-w-md text-sm text-slate-400">
            Type a message below or use the voice input button to convert speech into text.
        </p>
    </div>
      ) : (
        messages.map((item) => (
          <div
            key={item.id}
            className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
              item.role === "user"
                ? "self-end bg-blue-600 text-white"
                : "self-start border border-white/10 bg-slate-800 text-slate-100"
            }`}
          >
            <p className="mb-1 text-xs uppercase tracking-wide opacity-70">
              {item.role === "user" ? "You" : "AI"}
            </p>
            <p className="whitespace-pre-wrap">{item.content}</p>
          </div>
        ))
      )}

      {isLoading && (
        <div className="max-w-[85%] self-start rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-slate-300">
          <p className="mb-1 text-xs uppercase tracking-wide opacity-70">AI</p>
          <p>Thinking...</p>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}