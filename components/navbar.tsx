import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-black/0 text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Wallet className="h-7 w-7 text-green-500" />
            <span className="text-green-500 font-semibold">wallet</span>
            <span className="text-white font-bold">SubIntel</span>
          </Link>

          <nav className="hidden gap-8 md:flex items-center">
            <Link href="#features" className="text-white/80 hover:text-white">Features</Link>
            <Link href="#pricing" className="text-white/80 hover:text-white">Pricing</Link>
            <Link href="#docs" className="text-white/80 hover:text-white">Docs</Link>
            <Button size="sm" variant="default" className="ml-4" render={<Link href="#" />} nativeButton={false}>
              Get started
            </Button>
          </nav>

          <div className="md:hidden">
            <Button size="sm" variant="ghost" render={<Link href="#" />} nativeButton={false}>Menu</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
