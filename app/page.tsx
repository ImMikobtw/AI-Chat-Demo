import ChatClient from "@/components/ChatClient";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 px-6 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <ChatClient />
      </div>
    </main>
  );
}