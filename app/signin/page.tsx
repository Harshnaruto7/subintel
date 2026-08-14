import { Show, UserButton, SignOutButton } from "@clerk/nextjs";
import { Wallet } from "lucide-react";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
      <Show when="signed-in">
        <h1 className="text-3xl font-bold">You are in!</h1>
        <UserButton />
        <SignOutButton>
          <button className="border border-[#6c47ff] text-[#6c47ff] rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-6">
            Sign Out
          </button>
        </SignOutButton>
        <div className="flex flex-col py-5">
            <Wallet className="h-12 w-12 text-green-500" />
        </div>
      </Show>

      <Show when="signed-out">
        <p className="text-gray-400">You need to log in first.</p>
      </Show>
    </main>
  );
}