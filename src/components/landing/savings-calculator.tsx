"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { cn } from "cn";

import { Slider } from "@/components/ui/slider";
import { inr, site } from "@/lib/site";

import { SubscribeButton } from "./client-bits";
import { SectionHeading } from "./section-heading";

const KEY_PRICES = [150, 200, 250];

function Receipt({
  title,
  lines,
  total,
  tone,
}: {
  title: string;
  lines: [string, string][];
  total: string;
  tone: "bad" | "good";
}) {
  return (
    <div className="flex flex-col drop-shadow-[0_14px_24px_rgb(8_19_41/0.12)]">
      <div className="rounded-t-2xl bg-white px-5 pt-5 pb-4 font-mono text-sm">
        <p
          className={cn(
            "font-sans text-xs font-semibold tracking-wider uppercase",
            tone === "bad" ? "text-red-600" : "text-green-600",
          )}
        >
          {title}
        </p>
        <div className="my-3 border-t border-dashed border-ink/20" />
        <dl className="grid gap-1.5 text-ink/70">
          {lines.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3">
              <dt>{k}</dt>
              <dd className="tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="my-3 border-t border-dashed border-ink/20" />
        <div className="flex items-baseline justify-between">
          <span className="font-sans text-xs font-medium text-muted-foreground">
            Per month
          </span>
          <span
            className={cn(
              "font-heading text-2xl font-bold tabular-nums",
              tone === "bad"
                ? "text-red-600 line-through decoration-2"
                : "text-green-600",
            )}
          >
            {total}
          </span>
        </div>
      </div>
      <div
        aria-hidden
        className="h-3 bg-[radial-gradient(circle_at_8px_0,transparent_7px,#fff_7.5px)] bg-[length:16px_12px] bg-repeat-x"
      />
    </div>
  );
}

export function SavingsCalculator() {
  const [phones, setPhones] = useState(50);
  const [keyPrice, setKeyPrice] = useState(200);

  const otherCost = phones * keyPrice;
  const savings = Math.max(0, otherCost - site.price);
  const breakEven = Math.ceil(site.price / keyPrice);

  return (
    <section className="px-4 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Do the math"
        title="How much are you losing to key fees?"
      >
        Move the slider to the number of phones you sell on EMI each month.
      </SectionHeading>

      <div className="mx-auto mt-12 grid max-w-5xl gap-6 rounded-[2rem] bg-surface p-5 ring-1 ring-ink/5 sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10 lg:p-10">
        <div className="flex flex-col">
          <label
            htmlFor="phones"
            className="text-sm font-medium text-muted-foreground"
          >
            Phones sold on EMI per month
          </label>
          <p className="mt-1 font-heading text-5xl font-bold text-ink tabular-nums">
            {phones}
          </p>
          <Slider
            id="phones"
            aria-label="Phones sold on EMI per month"
            min={10}
            max={300}
            step={5}
            value={[phones]}
            onValueChange={(v) =>
              setPhones(Array.isArray(v) ? v[0] : (v as number))
            }
            className="mt-5 [&_[data-slot=slider-range]]:bg-ember [&_[data-slot=slider-thumb]]:size-6! [&_[data-slot=slider-thumb]]:border-2! [&_[data-slot=slider-thumb]]:border-ember! [&_[data-slot=slider-track]]:h-2! [&_[data-slot=slider-track]]:bg-ink/10"
          />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>10</span>
            <span>300</span>
          </div>

          <p
            className="mt-8 text-sm font-medium text-muted-foreground"
            id="key-price"
          >
            What other apps charge you per key
          </p>
          <div
            role="radiogroup"
            aria-labelledby="key-price"
            className="mt-2 grid grid-cols-3 gap-2"
          >
            {KEY_PRICES.map((p) => (
              <button
                key={p}
                role="radio"
                aria-checked={keyPrice === p}
                onClick={() => setKeyPrice(p)}
                className={cn(
                  "h-11 rounded-xl text-sm font-semibold ring-1 transition",
                  keyPrice === p
                    ? "bg-ink text-white ring-ink"
                    : "bg-white text-ink ring-ink/10 hover:ring-ink/30",
                )}
              >
                ₹{p}
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-white p-4 text-sm leading-relaxed text-ink/80 ring-1 ring-gold/50">
            <p className="font-semibold text-ink">
              Ek default bacha liya, 15 mahine ka subscription free.
            </p>
            <p className="mt-1">
              Recovering just one ₹15,000 phone pays for 15 months of MDM
              Locker. And at ₹{keyPrice}/key, it pays for itself after your{" "}
              {breakEven}th phone.
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Receipt
              title="Other lock apps"
              tone="bad"
              lines={[
                ["Keys", `${phones} × ₹${keyPrice}`],
                ["Refund", "None"],
              ]}
              total={inr(otherCost)}
            />
            <Receipt
              title="MDM Locker"
              tone="good"
              lines={[
                ["Keys", "Unlimited + TV"],
                ["Refund", "7-day, 100%"],
              ]}
              total={inr(site.price)}
            />
          </div>

          <div className="mt-6 flex flex-1 flex-col justify-center rounded-2xl bg-ink p-6 text-white">
            <p className="flex items-center gap-2 text-sm font-medium text-green-400">
              <TrendingUp className="size-4" /> You save every month
            </p>
            <p
              className="mt-1 font-heading text-5xl font-bold tabular-nums sm:text-6xl"
              aria-live="polite"
            >
              {inr(savings)}
            </p>
            <p className="mt-1 text-sm text-blue-100/70">
              That&apos;s{" "}
              <span className="font-semibold text-white">
                {inr(savings * 12)}
              </span>{" "}
              a year back in your pocket.
            </p>
            <SubscribeButton
              source="calculator"
              className="mt-5 w-full sm:w-auto sm:self-start"
            >
              Start saving — ₹{site.price}/mo
            </SubscribeButton>
          </div>
        </div>
      </div>
    </section>
  );
}
