import Image from "next/image";
import {
  Check,
  CreditCard,
  Download,
  LockKeyhole,
  MessageCircle,
  Play,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { site } from "@/lib/site";

import { BackToTop, SubscribeButton, WhatsAppLink } from "./client-bits";
import { SectionHeading } from "./section-heading";

function GuaranteeSeal() {
  const text = "100% MONEY-BACK GUARANTEE • NO QUESTIONS ASKED • ";
  return (
    <svg
      viewBox="0 0 200 200"
      className="size-40 shrink-0 sm:size-48"
      role="img"
      aria-label="7-day 100% money-back guarantee seal"
    >
      <defs>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fde68a" />
          <stop offset="0.5" stopColor="#f59e0b" />
          <stop offset="1" stopColor="#b45309" />
        </linearGradient>
        <path
          id="ring"
          d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
        />
      </defs>
      <circle cx="100" cy="100" r="96" fill="url(#gold)" />
      <circle
        cx="100"
        cy="100"
        r="86"
        fill="none"
        stroke="#fff7e0"
        strokeOpacity="0.6"
        strokeDasharray="2 4"
      />
      <circle cx="100" cy="100" r="58" fill="#081329" />
      <text
        fontSize="11.5"
        fontWeight="700"
        letterSpacing="1.6"
        fill="#081329"
        fontFamily="var(--font-inter)"
      >
        <textPath href="#ring" startOffset="0">
          {text}
        </textPath>
      </text>
      <text
        x="100"
        y="104"
        textAnchor="middle"
        fontSize="48"
        fontWeight="800"
        fill="#fbbf24"
        fontFamily="var(--font-poppins)"
      >
        7
      </text>
      <text
        x="100"
        y="128"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        letterSpacing="3"
        fill="#fde68a"
        fontFamily="var(--font-inter)"
      >
        DAYS
      </text>
    </svg>
  );
}

export function Guarantee() {
  return (
    <section className="bg-surface px-4 py-16 sm:py-20">
      <div className="relative mx-auto max-w-5xl rounded-[2rem] bg-gradient-to-br from-gold via-amber-400 to-amber-600 p-[2px] shadow-[0_30px_60px_-30px_rgb(180_83_9/0.6)]">
        <div className="flex flex-col items-center gap-8 rounded-[calc(2rem-2px)] bg-gradient-to-br from-amber-50 to-white px-6 py-10 text-center sm:px-10 md:flex-row md:text-left">
          <GuaranteeSeal />
          <div>
            <p className="text-sm font-semibold tracking-[0.14em] text-amber-700 uppercase">
              Pasand nahi aaya? Poore paise wapas.
            </p>
            <h2 className="mt-3 text-3xl leading-tight font-bold text-ink sm:text-4xl">
              Try it for 7 days. Love it, or get every rupee back.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/75 sm:text-lg">
              Subscribe, install the app and lock a few phones. If MDM Locker
              isn&apos;t right for your shop within 7 days, message us on
              WhatsApp and we&apos;ll refund your full ₹{site.price}. No
              questions, no forms.
            </p>
            <SubscribeButton source="guarantee" className="mt-6">
              Try risk-free — ₹{site.price}/mo
            </SubscribeButton>
          </div>
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    icon: CreditCard,
    title: `Pay ₹${site.price}`,
    body: "Secure Razorpay checkout — UPI, cards or net banking.",
  },
  {
    icon: Download,
    title: "Install the app",
    body: "Download the official Retailer App from Google Play.",
  },
  {
    icon: Smartphone,
    title: "Register your mobile",
    body: "Login details arrive on WhatsApp & email in 2 minutes.",
  },
  {
    icon: LockKeyhole,
    title: "Start locking",
    body: "Enrol your customers' phones and TVs — unlimited.",
  },
];

export function Steps() {
  return (
    <section className="px-4 py-16 sm:py-20">
      <SectionHeading
        eyebrow="No demo calls. No waiting."
        title="Go live in 4 simple steps"
      />
      <div className="relative mx-auto mt-12 max-w-6xl">
        <div
          aria-hidden
          className="absolute top-10 right-[12%] left-[12%] hidden h-0.5 bg-[repeating-linear-gradient(90deg,var(--color-ember)_0_8px,transparent_8px_16px)] opacity-40 lg:block"
        />
        <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <li
              key={title}
              className="relative flex gap-4 rounded-3xl bg-surface p-5 ring-1 ring-ink/5 lg:flex-col lg:items-center lg:bg-transparent lg:p-0 lg:text-center lg:ring-0"
            >
              <span className="relative grid size-14 shrink-0 place-items-center rounded-2xl bg-ink text-white shadow-lg lg:size-20 lg:rounded-3xl">
                <Icon className="size-6 lg:size-8" />
                <span className="cta-gradient absolute -top-2 -right-2 grid size-6 place-items-center rounded-full text-xs font-bold text-white ring-2 ring-white lg:size-7 lg:text-sm">
                  {i + 1}
                </span>
              </span>
              <div>
                <h3 className="text-lg font-bold text-ink lg:mt-2">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const included = [
  "Unlimited Android phone locker keys",
  "Unlimited Android Smart TV locker keys",
  "Master Retailer web panel + mobile app",
  "Remote lock, offline auto-lock & FRP block",
  "Live GPS, SIM alert & 20+ device controls",
  "Auto-lock on overdue + auto EMI reminders",
  "UPI QR payment on the lock screen",
  "WhatsApp support",
];

export function Pricing() {
  return (
    <section className="relative overflow-hidden bg-ink px-4 py-16 sm:py-20">
      <div
        aria-hidden
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]"
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-[120px]"
      />
      <div className="relative">
        <SectionHeading
          dark
          eyebrow="One plan. Everything unlimited."
          title="Simple, flat pricing"
        />

        <div className="mx-auto mt-10 max-w-xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
          <div className="cta-gradient px-6 py-2.5 text-center text-sm font-semibold text-white">
            Retailer Special · Unlimited keys
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-ink">
                  Master Retailer Panel
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Phone + Smart TV locker
                </p>
              </div>
              <Image
                src="/logo.png"
                alt=""
                width={48}
                height={48}
                className="size-12 rounded-[22%]"
              />
            </div>
            <p className="mt-2 flex items-baseline gap-2">
              <span className="font-heading text-6xl font-extrabold tracking-tight text-ink">
                ₹{site.price}
              </span>
              <span className="text-lg font-medium text-muted-foreground">
                /month
              </span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Other apps:{" "}
              <span className="font-semibold text-red-600 line-through">
                ₹10,000/mo
              </span>{" "}
              for 50 phones at ₹200/key
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {included.map((t) => (
                <li key={t} className="flex gap-2.5 text-sm text-ink/85">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-green-100 text-green-600">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <SubscribeButton source="pricing" className="mt-4 w-full" />
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <ShieldCheck className="size-3.5 text-green-600" /> 7-day
                money-back guarantee
              </span>
              <span className="flex items-center gap-1">
                <LockKeyhole className="size-3.5" /> Secure payment via Razorpay
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const faqs = [
  {
    q: "Are the keys really unlimited?",
    a: `Yes. One flat ₹${site.price}/month covers unlimited Android phone and Android Smart TV locks. There are no per-device key charges, however many phones you sell.`,
  },
  {
    q: "How does the 7-day money-back guarantee work?",
    a: `If MDM Locker isn't right for your shop, message our WhatsApp helpline within 7 days of paying and we'll refund your full ₹${site.price}. No questions asked.`,
  },
  {
    q: "Can a defaulter bypass the lock?",
    a: "MDM Locker is built against the common tricks. Removing the SIM triggers an offline auto-lock, factory-reset protection blocks recovery-mode resets, and you can also block the power menu, USB/ADB transfer and outgoing calls.",
  },
  {
    q: "Does it work on Android Smart TVs?",
    a: "Yes. The Android Smart TV locker is included in the same plan at no extra cost — lock TVs sold on EMI just like phones.",
  },
  {
    q: "How does my customer pay and unlock?",
    a: "The locked screen shows the overdue EMI with a UPI QR code. The customer scans it and pays with any UPI app to unlock. You can also generate an offline unlock key from the app to share with them.",
  },
  {
    q: "What happens right after I pay?",
    a: "Activation is automatic. You'll get your Master Panel login on WhatsApp and email within about 2 minutes, plus a link to the Retailer App on Google Play and a 2-minute setup video.",
  },
  {
    q: "Is the app safe to install?",
    a: "Yes. The MDM Locker Retailer App is on the Google Play Store and verified by Play Protect — no manual APK downloads or security warnings.",
  },
];

export function Faq() {
  return (
    <section className="px-4 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Questions?"
        title="Everything retailers ask us"
      />
      <Accordion className="mx-auto mt-10 max-w-3xl gap-3">
        {faqs.map(({ q, a }) => (
          <AccordionItem
            key={q}
            value={q}
            className="rounded-2xl bg-surface px-5 ring-1 ring-ink/5 not-last:border-b-0"
          >
            <AccordionTrigger className="items-center pt-3 font-heading text-base font-semibold text-ink hover:no-underline sm:text-lg">
              {q}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-[0.95rem] leading-relaxed text-muted-foreground">
              {a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mx-auto mt-6 flex max-w-3xl flex-col items-center justify-center gap-3 text-center sm:flex-row">
        <p className="text-muted-foreground">Still have a question?</p>
        <WhatsAppLink
          source="faq"
          className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          <MessageCircle className="size-4" /> Chat on WhatsApp
        </WhatsAppLink>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink px-4 pt-12 pb-28 text-blue-100/70 md:pb-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt=""
              width={40}
              height={40}
              className="size-10 rounded-[22%]"
            />
            <p className="font-heading text-lg font-bold text-white">
              MDM Locker
            </p>
          </div>
          <p className="mt-3 text-sm leading-relaxed">
            EMI device locking for mobile and electronics retailers across
            India. A product of {site.company}
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <WhatsAppLink
            source="footer"
            className="inline-flex items-center gap-2 text-white hover:text-green-400"
          >
            <MessageCircle className="size-4" /> WhatsApp:{" "}
            {site.whatsappDisplay}
          </WhatsAppLink>
          <a
            href={site.playStoreUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 text-white hover:text-brand-soft"
          >
            <Play className="size-4" /> Retailer App on Google Play
          </a>
          <a
            href={`https://youtu.be/${site.youtubeId}`}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 text-white hover:text-brand-soft"
          >
            <Play className="size-4" /> Setup video on YouTube
          </a>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-col-reverse items-start gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs">
          © 2026 {site.company} All rights reserved. Payments processed securely
          by Razorpay.
        </p>
        <BackToTop className="shrink-0" />
      </div>
    </footer>
  );
}
