import { Cpu, Zap, ShieldCheck } from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="w-full bg-black text-white py-16">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-bold">AI-powered subscription management</h2>
        <p className="mt-4 text-white/70">Automate billing, forecasts, churn reduction and smart recommendations with a single dashboard.</p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-lg border border-white/6 bg-white/2 p-6 text-left">
            <div className="inline-flex items-center justify-center rounded-md bg-black/20 p-2">
              <Cpu className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-4 font-semibold">Smart Insights</h3>
            <p className="mt-2 text-white/70 text-sm">Realtime analytics and AI-generated insights to grow revenue and reduce churn.</p>
          </div>

          <div className="rounded-lg border border-white/6 bg-white/2 p-6 text-left">
            <div className="inline-flex items-center justify-center rounded-md bg-black/20 p-2">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-4 font-semibold">Automations</h3>
            <p className="mt-2 text-white/70 text-sm">Automate invoices, proration, dunning and custom workflows with AI rules.</p>
          </div>

          <div className="rounded-lg border border-white/6 bg-white/2 p-6 text-left">
            <div className="inline-flex items-center justify-center rounded-md bg-black/20 p-2">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-4 font-semibold">Secure by default</h3>
            <p className="mt-2 text-white/70 text-sm">Enterprise-grade security, audit logs and compliance-ready controls.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
