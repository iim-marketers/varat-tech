import Image from "next/image";
import {
  BadgeCheck,
  BadgeIndianRupee,
  CheckCircle2,
  Infinity as InfinityIcon,
  LockKeyhole,
  Play,
  RotateCcw,
  ShieldCheck,
  Store,
  TrendingUp,
  Tv,
  Zap,
} from "lucide-react";

import { cn } from "cn";

import { site } from "@/lib/site";

import { SubscribeButton } from "./client-bits";
import { PhoneFrame } from "./frames";
import { QrLockScreen } from "./qr-lock-screen";

const tickerItems = [
  "Retailer Special: Unlimited Keys at ₹999/mo",
  "100% Money-Back Guarantee",
  "Android Phone + Smart TV Locker",
  "Official App on Google Play",
  "Login on WhatsApp in 2 minutes",
];

export function Ticker() {
  const row = (hidden?: boolean) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center">
      {tickerItems.map((t) => (
        <li key={t} className="flex items-center gap-3 px-5 whitespace-nowrap">
          <Zap className="size-3.5 fill-current" />
          {t}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="cta-gradient overflow-hidden py-2 text-xs font-semibold text-white sm:text-sm">
      <div className="flex w-max animate-marquee">
        {row()}
        {row(true)}
      </div>
    </div>
  );
}

export function PlayBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1.5 text-xs font-medium text-blue-50 ring-1 ring-white/15",
        className,
      )}
    >
      <ShieldCheck className="size-4 text-green-400" />
      Google Play · Play Protect verified
    </span>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <div className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt=""
            width={40}
            height={40}
            className="size-9 rounded-[22%] ring-1 ring-white/15 sm:size-10"
          />
          <div className="leading-tight">
            <p className="font-heading text-base font-bold text-white sm:text-lg">
              MDM Locker
            </p>
            <p className="text-[0.65rem] text-blue-100/60 sm:text-xs">
              by Varat Tech Global
            </p>
          </div>
        </div>
        <PlayBadge className="ml-auto hidden md:inline-flex" />
        <SubscribeButton
          source="header"
          size="default"
          className="ml-auto md:ml-3"
        >
          <span className="sm:hidden">Subscribe ₹{site.price}</span>
          <span className="hidden sm:inline">Subscribe — ₹{site.price}/mo</span>
        </SubscribeButton>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white lg:flex lg:min-h-[calc(100svh_-_1rem)] lg:flex-col">
      <div
        aria-hidden
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(70%_60%_at_70%_40%,black,transparent)]"
      />
      <div
        aria-hidden
        className="absolute -top-40 right-[-10%] size-[640px] rounded-full bg-brand/30 blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute bottom-[-30%] left-[-15%] size-[520px] rounded-full bg-ember/15 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-10 pb-28 lg:grid-cols-[1.08fr_0.92fr] lg:w-full lg:flex-1 lg:gap-8 lg:pt-0 lg:pb-32">
        <div>
          <h1 className="mt-5 text-[2.35rem] leading-[1.08] font-bold sm:text-5xl lg:mt-4 lg:text-[clamp(2.75rem,7svh,3.6rem)] lg:leading-[1.05]">
            Stop EMI defaulters.{" "}
            <span className="text-gradient-brand">
              Lock unlimited phones &amp; TVs
            </span>{" "}
            for{" "}
            <span className="whitespace-nowrap text-gold">
              ₹{site.price}/month.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-blue-100/80 sm:text-lg lg:mt-4 lg:text-base">
            Why pay ₹200 for every device key? MDM Locker gives you unlimited
            Android phone and Smart TV locks at one flat price — with offline
            auto-lock, factory-reset block and a UPI QR on the lock screen so
            customers pay to unlock.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2 lg:mt-5">
            {[
              { icon: InfinityIcon, label: "Unlimited keys" },
              { icon: BadgeCheck, label: "Official Play Store app" },
              { icon: Tv, label: "Smart TV locker included" },
            ].map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-1.5 rounded-lg bg-white/6 px-3 py-1.5 text-sm text-blue-50 ring-1 ring-white/10"
              >
                <Icon className="size-4 text-brand-soft" />
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-6">
            <SubscribeButton source="hero" />
            <a
              href={site.playStoreUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-xl px-6 font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/8"
            >
              <Play className="size-4 fill-current" /> View on Play Store
            </a>
          </div>
          <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-blue-100/70 lg:mt-3">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-green-400" /> 7-day 100%
              money-back
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-green-400" /> Login on
              WhatsApp in 2 min
            </span>
          </p>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-[10/11] w-full max-w-[460px] lg:max-w-[min(100%,calc((100svh_-_12rem)*10/11))]">
      <QrLockScreen className="absolute top-[4%] right-[2%] w-[46%] rotate-[7deg] animate-float-delayed opacity-95" />
      <PhoneFrame
        src="/screens/dashboard.webp"
        alt="MDM Locker retailer app dashboard showing enrolled, active, not-active and locked devices"
        preload
        sizes="(min-width: 1024px) 260px, 50vw"
        className="absolute top-[8%] left-[6%] w-[52%] -rotate-[4deg] animate-float"
      />

      <div className="absolute right-[-2%] bottom-[0%] flex animate-float items-center gap-2 rounded-2xl bg-white/95 py-2.5 pr-4 pl-2.5 text-ink shadow-xl ring-1 shadow-black/30 ring-black/5 backdrop-blur sm:right-[-6%] sm:py-3 sm:pr-5 sm:pl-3">
        <RecoveryRing value={99.8} />
        <div className="leading-tight">
          <p className="font-heading text-xl leading-none font-bold tracking-tight sm:text-2xl">
            99.8
            <span className="ml-0.5 text-base text-green-600 sm:text-lg">
              %
            </span>
          </p>
          <p className="text-[0.65rem] font-semibold tracking-wide text-muted-foreground uppercase sm:text-[0.7rem]">
            EMI recovery rate
          </p>
        </div>
      </div>

      {/* <div className="absolute bottom-[14%] left-[-2%] flex animate-float-delayed items-center gap-2.5 rounded-xl bg-white/95 py-2 pr-4 pl-2 text-ink shadow-xl backdrop-blur sm:left-[-8%]">
        <span className="grid size-8 place-items-center rounded-lg bg-red-100 text-red-600">
          <LockKeyhole className="size-4" />
        </span>
        <div className="leading-tight">
          <p className="text-xs font-semibold sm:text-sm">Vivo V22 locked</p>
          <p className="text-[0.65rem] text-muted-foreground sm:text-xs">
            EMI overdue · 1 tap
          </p>
        </div>
      </div> */}

      {/* <div className="absolute right-[-2%] bottom-[2%] flex animate-float items-center gap-2.5 rounded-xl bg-white/95 py-2 pr-4 pl-2 text-ink shadow-xl backdrop-blur">
        <span className="grid size-8 place-items-center rounded-lg bg-green-100 text-green-600">
          <BadgeIndianRupee className="size-4" />
        </span>
        <div className="leading-tight">
          <p className="text-xs font-semibold sm:text-sm">
            ₹1,680 paid via UPI
          </p>
          <p className="text-[0.65rem] text-muted-foreground sm:text-xs">
            Phone unlocked
          </p>
        </div>
      </div> */}
    </div>
  );
}

function RecoveryRing({ value }: { value: number }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative grid size-11 shrink-0 place-items-center sm:size-12">
      <svg
        viewBox="0 0 44 44"
        className="absolute inset-0 size-full -rotate-90"
        aria-hidden
      >
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          strokeWidth="4"
          className="stroke-green-100"
        />
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - value / 100)}
          className="stroke-green-500"
        />
      </svg>
      <TrendingUp
        className="size-4 text-green-600 sm:size-4.5"
        strokeWidth={2.5}
      />
    </div>
  );
}

export function TrustStrip() {
  const items = [
    {
      icon: BadgeIndianRupee,
      value: `₹${site.price} flat`,
      label: "Unlimited keys, no per-device fee",
      tone: "text-ember bg-ember/10",
    },
    {
      icon: ShieldCheck,
      value: "Play verified",
      label: "Official app on Google Play",
      tone: "text-green-600 bg-green-100",
    },
    {
      icon: RotateCcw,
      value: "7-day refund",
      label: "100% money back, no questions",
      tone: "text-amber-600 bg-amber-100",
    },
    {
      icon: Store,
      value: "10,000+",
      label: "Retailers across India",
      tone: "text-brand bg-brand/10",
    },
  ];
  return (
    <section
      aria-label="Why retailers trust MDM Locker"
      className="relative z-10 -mt-16 px-4 lg:-mt-20"
    >
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {items.map(({ icon: Icon, value, label, tone }) => (
          <li
            key={value}
            className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-[0_18px_40px_-20px_rgb(8_19_41/0.35)] ring-1 ring-ink/5 sm:flex-row sm:items-center sm:p-5"
          >
            <span
              className={`grid size-11 shrink-0 place-items-center rounded-xl ${tone}`}
            >
              <Icon className="size-5" />
            </span>
            <div>
              <p className="font-heading text-lg leading-tight font-bold sm:text-xl">
                {value}
              </p>
              <p className="mt-0.5 text-xs leading-snug text-muted-foreground sm:text-sm">
                {label}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
