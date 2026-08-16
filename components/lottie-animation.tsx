"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function LottieAnimation() {
  return (
    <div className="w-20 h-20">
      <DotLottieReact
        src="/animation/Chart Graph.lottie"
        autoplay
        loop
      />
    </div>
  );
}