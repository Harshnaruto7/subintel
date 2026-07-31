import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  return (
    <section id="pricing" className="w-full bg-black text-white py-16">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-bold">Simple pricing for teams of all sizes</h2>
        <p className="mt-2 text-white/70">Start small and scale — predictable billing and flexible plans.</p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-lg border border-white/6 bg-white/2 p-6">
            <h3 className="text-xl font-semibold">Starter</h3>
            <p className="mt-2 text-white/70">Essential tools for early-stage teams</p>
            <div className="mt-4 text-2xl font-bold">$0</div>
            <div className="mt-6">
              <Button size="sm" variant="default" render={<Link href="#" />} nativeButton={false}>Start free</Button>
            </div>
          </div>

          <div className="rounded-lg border border-white/6 bg-white/2 p-6">
            <h3 className="text-xl font-semibold">Pro</h3>
            <p className="mt-2 text-white/70">Advanced automations and analytics</p>
            <div className="mt-4 text-2xl font-bold">$29/mo</div>
            <div className="mt-6">
              <Button size="sm" variant="default" render={<Link href="#" />} nativeButton={false}>Get Pro</Button>
            </div>
          </div>

          <div className="rounded-lg border border-white/6 bg-white/2 p-6">
            <h3 className="text-xl font-semibold">Enterprise</h3>
            <p className="mt-2 text-white/70">Custom SLA, onboarding and integrations</p>
            <div className="mt-4 text-2xl font-bold">Contact us</div>
            <div className="mt-6">
              <Button size="sm" variant="default" render={<Link href="#" />} nativeButton={false}>Contact</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
