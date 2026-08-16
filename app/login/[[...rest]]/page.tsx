import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-4 bg-black">
      <SignIn fallbackRedirectUrl="/dashboard" />
    </main>
  );
}