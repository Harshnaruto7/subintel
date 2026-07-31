import { ArrowRightIcon, Wallet } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="w-full bg-black text-white mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-20 lg:max-w-7xl lg:px-8">
  <div className="container">
  <div className="mx-auto max-w-2xl text-center">
    <div className="hidden sm:mb-4 sm:flex sm:justify-center">
      <div className="relative rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/90 backdrop-blur-sm">
        AI Subscription Intelligence Platform {" "}
        <Link href="#" className="font-semibold text-indigo-300">
          <span aria-hidden="true" className="absolute inset-0" />
          Learn more
        </Link>
      </div>
    </div>
    <div className="text-center">
      <div className="flex items-center justify-center gap-3">
        <Wallet className="h-12 w-12 text-green-500" />
        <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
          <span className="text-green-500">wallet</span>{" "}
          <span className="text-white">SubIntel</span>
        </h1>
      </div>
      <p className="mt-4 text-lg leading-relaxed text-white/70">
        Take control of recurring expenses with AI-powered insights Track active tools, 
        detect duplicate subscriptions, and get automated savings recommendations in real time.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-3">
        <Button size="lg" className={"rounded-3xl bg-white p-4 text-black hover:bg-white/90"} render={<Link href="#" />} nativeButton={false}>Get started</Button>
        <Button size="lg" variant="ghost" className="font-semibold text-white hover:bg-white/10" render={<Link href="#" />} nativeButton={false}>Learn more <ArrowRightIcon className="ml-1 h-4 w-4" /></Button>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}
