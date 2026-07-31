import Link from "next/link";
import { Wallet } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white/70 py-8">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6 text-green-500" />
            <span className="text-green-500 font-semibold">wallet</span>
            <span className="text-white font-medium">SubIntel</span>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white">Privacy</Link>
            <Link href="#" className="hover:text-white">Terms</Link>
            <Link href="#" className="hover:text-white">Contact</Link>
          </div>
        </div>

        <p className="mt-6 text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="inline-flex items-center gap-2">
            <Wallet className="h-4 w-4 text-green-500" />
            <span className="text-green-500 font-semibold">wallet</span>
            <span className="text-white">SubIntel</span>
          </span>{" "}
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}
