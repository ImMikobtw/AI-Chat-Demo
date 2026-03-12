import type { KeyboardEvent } from "react";
import VoiceButton from "@/components/VoiceButton";

type ChatInputProps = {
  message: string;
  isLoading: boolean;
  isRecording: boolean;
  onMessageChange: (value: string) => void;
  onSend: () => void;
  onVoiceInput: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
};

export default function ChatInput({
  message,
  isLoading,
  isRecording,
  onMessageChange,
  onSend,
  onVoiceInput,
  onKeyDown,
}: ChatInputProps) {
  return (
    <div className="space-y-4">
      <textarea
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Ask whatever you want"
        rows={4}
        disabled={isLoading}
        className="w-full resize-none rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400 disabled:opacity-60"
      />

      <div className="flex items-center justify-between gap-3">
        <VoiceButton
          isRecording={isRecording}
          onClick={onVoiceInput}
          disabled={isLoading || isRecording}
        />

        <button
          type="button"
          onClick={onSend}
          disabled={!message.trim() || isLoading}
          className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}