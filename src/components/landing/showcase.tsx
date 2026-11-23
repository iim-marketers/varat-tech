import {
  Check,
  LayoutDashboard,
  QrCode,
  ShieldAlert,
  Smartphone,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BrowserFrame, PhoneFrame } from "./frames";
import { QrLockScreen } from "./qr-lock-screen";
import { SectionHeading } from "./section-heading";

const tabs = [
  {
    id: "panel",
    label: "Master Web Panel",
    icon: LayoutDashboard,
    title: "Your whole EMI book on one screen",
    points: [
      "Live key balance, active, closed and rejected loans",
      "Due installments with overdue days flagged in red",
      "Every retailer, distributor and customer in one place",
    ],
  },
  {
    id: "app",
    label: "Retailer App",
    icon: Smartphone,
    title: "Run your shop's EMI from your phone",
    points: [
      "Enrolled, active, not-active and locked devices at a glance",
      "Add a customer and activate a phone without a QR scan",
      "Approve EMI payment requests on the go",
    ],
  },
  {
    id: "controls",
    label: "Device Controls",
    icon: ShieldAlert,
    title: "20+ controls, one tap each",
    points: [
      "Lock, unlock, ping and live-locate any device",
      "Block camera, USB/ADB, calls, SMS and social media",
      "Full command log so you know exactly what ran and when",
    ],
  },
  {
    id: "customer",
    label: "Customer Side",
    icon: QrCode,
    title: "Customers see what they owe — and pay to unlock",
    points: [
      "Lock screen shows the overdue EMI and a UPI QR code",
      "Customer app tracks financed amount, EMIs paid and remaining",
      "Automatic EMI reminders sent to the customer",
    ],
  },
] as const;

function Points({
  title,
  points,
}: {
  title: string;
  points: readonly string[];
}) {
  return (
    <div className="lg:pt-6">
      <h3 className="text-2xl leading-tight font-bold text-white sm:text-3xl">
        {title}
      </h3>
      <ul className="mt-6 grid gap-3.5">
        {points.map((p) => (
          <li key={p} className="flex gap-3 text-blue-100/85">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand/25 text-brand-soft">
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

const phoneSizes = "(min-width: 1024px) 220px, 30vw";

export function Showcase() {
  return (
    <section className="relative overflow-hidden bg-ink px-4 py-16 sm:py-20">
      <div
        aria-hidden
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_30%,black,transparent)]"
      />
      <div className="relative">
        <SectionHeading
          dark
          eyebrow="Real screens, not mock-ups"
          title="What you get the moment you subscribe"
        >
          Screenshots straight from the Master Panel and apps you’ll log in to.
        </SectionHeading>

        <Tabs defaultValue="panel" className="mx-auto mt-10 max-w-6xl gap-10">
          <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none]">
            <TabsList className="mx-auto flex h-auto! gap-1 rounded-2xl bg-white/6 p-1.5 ring-1 ring-white/10">
              {tabs.map(({ id, label, icon: Icon }) => (
                <TabsTrigger
                  key={id}
                  value={id}
                  className="h-10 rounded-xl px-4 text-sm text-blue-100/70 hover:text-white data-active:bg-white data-active:text-ink data-active:hover:text-ink"
                >
                  <Icon /> {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent
            value="panel"
            className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.6fr]"
          >
            <Points title={tabs[0].title} points={tabs[0].points} />
            <BrowserFrame
              src="/screens/web-panel.webp"
              alt="MDM Locker Master Web Panel dashboard with key balance, loan counts, due installments and customers"
              width={1914}
              height={914}
              label="Master Retailer Panel"
            />
          </TabsContent>

          <TabsContent
            value="app"
            className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.6fr]"
          >
            <Points title={tabs[1].title} points={tabs[1].points} />
            <div className="grid grid-cols-3 gap-3 sm:gap-5">
              <PhoneFrame
                src="/screens/dashboard.webp"
                alt="Retailer app dashboard with device overview"
                sizes={phoneSizes}
              />
              <PhoneFrame
                src="/screens/dashboard-menu.webp"
                alt="Retailer app menu: wireless activation, all loans, customers, payment requests"
                sizes={phoneSizes}
                className="lg:translate-y-8"
              />
              <PhoneFrame
                src="/screens/login.webp"
                alt="Retailer app login screen"
                sizes={phoneSizes}
              />
            </div>
          </TabsContent>

          <TabsContent
            value="controls"
            className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.6fr]"
          >
            <Points title={tabs[2].title} points={tabs[2].points} />
            <div className="grid grid-cols-3 gap-3 sm:gap-5">
              <PhoneFrame
                src="/screens/device-control.webp"
                alt="Device control: device lock, offline unlock key, camera and USB controls"
                sizes={phoneSizes}
              />
              <PhoneFrame
                src="/screens/location.webp"
                alt="Location tracking, SIM details, social media block and system locks"
                sizes={phoneSizes}
                className="lg:translate-y-8"
              />
              <PhoneFrame
                src="/screens/command-log.webp"
                alt="Command history showing executed lock, unlock and ping commands"
                sizes={phoneSizes}
              />
            </div>
          </TabsContent>

          <TabsContent
            value="customer"
            className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.6fr]"
          >
            <Points title={tabs[3].title} points={tabs[3].points} />
            <div className="mx-auto grid w-full max-w-xl grid-cols-2 gap-4 sm:gap-8">
              <div>
                <QrLockScreen />
                <p className="mt-3 text-center text-xs text-blue-100/60">
                  Lock screen (illustration)
                </p>
              </div>
              <div className="lg:translate-y-8">
                <PhoneFrame
                  src="/screens/customer-app.webp"
                  alt="Customer app showing financed amount, EMI progress and paid status"
                  width={720}
                  height={1264}
                  sizes={phoneSizes}
                />
                <p className="mt-3 text-center text-xs text-blue-100/60">
                  Customer loan ledger
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
