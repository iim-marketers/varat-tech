import { Check, X } from "lucide-react";
import Image from "next/image";

import { SectionHeading } from "./section-heading";

const other = [
  "₹150–₹250 charged for every single device key",
  "Defaulter pulls the SIM or formats the phone — lock gone",
  "Manual APK installs trigger security warnings",
  "Paid upfront, no refund if it doesn't work for you",
];

const ours = [
  "Unlimited phone + TV keys for one flat ₹999/month",
  "Offline auto-lock on SIM removal + FRP factory-reset block",
  "Official app on Google Play, Play Protect verified",
  "Customer scans a UPI QR on the lock screen to pay",
  "7-day money-back guarantee, no questions asked",
];

export function PainSolution() {
  return (
    <section className="px-4 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Customer ne 2 EMI ke baad paise dena band kar diya?"
        title="You're paying too much for locks that don't hold"
      >
        Most lock apps charge per key and can be beaten with a SIM swap or a
        factory reset. A shop selling 50 phones a month loses ₹7,500–₹12,500
        just on key fees.
      </SectionHeading>

      <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2 md:gap-6">
        <div className="rounded-3xl bg-red-50/70 p-6 ring-1 ring-red-100 sm:p-8">
          <p className="text-sm font-semibold tracking-wide text-red-700 uppercase">
            Other lock apps
          </p>
          <p className="mt-2 font-heading text-2xl font-bold text-ink">
            Costly &amp; easy to bypass
          </p>
          <ul className="mt-6 grid gap-4">
            {other.map((t) => (
              <li
                key={t}
                className="flex gap-3 text-[0.95rem] leading-snug text-ink/80"
              >
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-red-100 text-red-600">
                  <X className="size-3.5" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-ink p-6 text-white ring-1 ring-ink sm:p-8">
          <div
            aria-hidden
            className="absolute -top-24 -right-24 size-64 rounded-full bg-brand/40 blur-3xl"
          />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-wide text-green-400 uppercase">
                MDM Locker
              </p>
              <p className="mt-2 font-heading text-2xl font-bold">
                Unlimited &amp; loophole-proof
              </p>
            </div>
            <Image
              src="/logo.png"
              alt=""
              width={48}
              height={48}
              className="size-12 rounded-[22%] ring-1 ring-white/20"
            />
          </div>
          <ul className="relative mt-6 grid gap-4">
            {ours.map((t) => (
              <li
                key={t}
                className="flex gap-3 text-[0.95rem] leading-snug text-blue-50"
              >
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-green-500/20 text-green-400">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
