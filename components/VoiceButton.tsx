type VoiceButtonProps = {
  isRecording: boolean;
  onClick: () => void;
  disabled?: boolean;
};

export default function VoiceButton({
  isRecording,
  onClick,
  disabled = false,
}: VoiceButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isRecording ? "Listening..." : "Speach"}
    </button>
  );
}