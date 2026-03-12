"use client";

import { useState } from "react";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
}

export default function ChatClient() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSend = async () => {
        if (!message.trim() || isLoading) return;

        const trimmedMessage = message.trim();

        const userMessage: Message = {
            id: crypto.randomUUID(),
            role: "user",
            content: trimmedMessage,
        };

        setMessages((prev) => [...prev, userMessage]);
        setMessage("")
        setError("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: trimmedMessage,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.error || "Failed to get response");
            }

            const assistantMessage: Message = {
                id: crypto.randomUUID(),
                role: "assistant",
                content: data.reply,
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Something went wrong";
            
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            void handleSend();
        }
    };

    return (
    <section className="flex w-full max-w-3xl flex-col rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
      <div className="mb-6">
        <h1 className="text-4xl font-bold tracking-tight">Hi there!</h1>
        <p className="mt-3 text-lg text-slate-300">
          What would you like to know?
        </p>
        <p className="mt-2 text-sm text-slate-400">
          Ask a question and get a response from AI.
        </p>
      </div>

      <div className="mb-4 flex min-h-[320px] flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/50 p-4">
        {messages.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-center text-slate-400">
            Your conversation will appear here.
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
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask whatever you want"
          rows={4}
          disabled={isLoading}
          className="w-full resize-none rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400 disabled:opacity-60"
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => void handleSend()}
            disabled={!message.trim() || isLoading}
            className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </section>
  );
}