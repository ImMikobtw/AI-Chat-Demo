"use client";

import { useEffect, useRef, useState } from "react";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import type { Message } from "@/types/chat";

export default function ChatClient() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const trimmedMessage = message.trim();

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedMessage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
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
        throw new Error(data?.error || "Failed to get response.");
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong.";

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setError("");
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
        e.preventDefault();
        void handleSend();
    }
  };

  const startVoiceInput = () => {
    const SpeechRecognitionConstructor =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionConstructor) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognitionConstructor();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsRecording(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };
  };

  const isHero = messages.length === 0;

  if (isHero) {
    return (
      <div className="w-full max-w-3xl text-center">
        <div className="mb-12">
          <h1 className="text-5xl font-bold tracking-tight">Hi there!</h1>

          <p className="mt-6 text-2xl font-semibold text-blue-100">
            What would you like to know?
          </p>

          <p className="mt-4 text-sm text-blue-200">
            Use one of the most common prompts below or ask your own question
          </p>
        </div>

        <ChatInput
          message={message}
          isLoading={isLoading}
          isRecording={isRecording}
          onMessageChange={setMessage}
          onSend={() => void handleSend()}
          onVoiceInput={startVoiceInput}
          onKeyDown={handleKeyDown}
        />
      </div>
    );
  }

  return (
    <section className="flex w-full max-w-4xl flex-col rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            AI Chat Demo
          </h1>
          <p className="mt-3 text-base text-slate-300 sm:text-lg">
            Ask anything and get a response from AI.
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Press Enter to send, Shift + Enter for a new line.
          </p>
        </div>

        <button
          type="button"
          onClick={handleClearChat}
          disabled={messages.length === 0 && !message && !error}
          className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Clear chat
        </button>
      </div>

      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        messagesEndRef={messagesEndRef}
      />

      {error && (
        <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <ChatInput
        message={message}
        isLoading={isLoading}
        isRecording={isRecording}
        onMessageChange={setMessage}
        onSend={() => void handleSend()}
        onVoiceInput={startVoiceInput}
        onKeyDown={handleKeyDown}
      />
    </section>
  );
}