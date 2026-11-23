import {
  AlarmClock,
  BellRing,
  CameraOff,
  CardSim,
  Download,
  History,
  Image as ImageIcon,
  KeyRound,
  LockKeyhole,
  MapPin,
  MessageSquareOff,
  PhoneOff,
  Power,
  RotateCw,
  ShieldBan,
  Tv,
  Usb,
  Users,
  WifiOff,
} from "lucide-react";
import { cn } from "cn";

import { SectionHeading } from "./section-heading";

const features = [
  {
    icon: WifiOff,
    title: "Offline Auto-Lock",
    body: "SIM pulled out? The phone locks itself the moment the SIM is removed — no internet needed. Share an offline unlock key when they pay.",
    tone: "bg-blue-100 text-blue-700",
  },
  {
    icon: ShieldBan,
    title: "FRP Reset Block",
    body: "Factory-reset protection disables recovery-mode resets, so a defaulter can't wipe the phone to remove your lock.",
    tone: "bg-orange-100 text-orange-700",
  },
  {
    icon: MapPin,
    title: "Live GPS Location",
    body: "Request the device's current GPS coordinates whenever you need to find it — right from the app.",
    tone: "bg-sky-100 text-sky-700",
  },
  {
    icon: CardSim,
    title: "SIM Swap Alert",
    body: "Know when a SIM is removed or changed, and pull the current SIM details remotely.",
    tone: "bg-cyan-100 text-cyan-700",
  },
  {
    icon: Tv,
    title: "Android Smart TV Locker",
    body: "Selling TVs on EMI too? Lock Android Smart TVs on the same plan, at no extra cost.",
    tone: "bg-violet-100 text-violet-700",
  },
];

const extras = [
  { icon: CameraOff, label: "Disable camera" },
  { icon: Usb, label: "Block USB & ADB" },
  { icon: PhoneOff, label: "Block outgoing calls" },
  { icon: MessageSquareOff, label: "Block SMS" },
  { icon: Users, label: "Block social media" },
  { icon: Power, label: "Power button block" },
  { icon: RotateCw, label: "Force reboot" },
  { icon: AlarmClock, label: "Play 30s alarm" },
  { icon: ImageIcon, label: "Push wallpaper" },
  { icon: KeyRound, label: "Offline unlock key" },
  { icon: BellRing, label: "Auto EMI reminders" },
  { icon: Download, label: "Remote app update" },
  { icon: History, label: "Command history" },
];

function LockToggleDemo() {
  return (
    <div aria-hidden className="mt-6 grid gap-2.5 rounded-2xl bg-white/6 p-3 ring-1 ring-white/10">
      {[
        { name: "Vivo V22", sub: "EMI overdue · 3 days", locked: true },
        { name: "Realme C55", sub: "Paid on time", locked: false },
        { name: "OnePlus TV 43″", sub: "EMI due tomorrow", locked: false },
      ].map((d) => (
        <div key={d.name} className="flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 text-ink">
          <span
            className={cn(
              "grid size-9 place-items-center rounded-lg",
              d.locked ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
            )}
          >
            <LockKeyhole className="size-4" />
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-semibold">{d.name}</p>
            <p className={cn("truncate text-xs", d.locked ? "text-red-600" : "text-muted-foreground")}>{d.sub}</p>
          </div>
          <span
            className={cn(
              "relative h-6 w-11 shrink-0 rounded-full transition",
              d.locked ? "bg-ember" : "bg-ink/15"
            )}
          >
            <span
              className={cn(
                "absolute top-1 size-4 rounded-full bg-white shadow",
                d.locked ? "right-1" : "left-1"
              )}
            />
          </span>
        </div>
      ))}
    </div>
  );
}

export function Features() {
  return (
    <section className="px-4 py-20 sm:py-24">
      <SectionHeading eyebrow="Zero loopholes" title="6 anti-default features that keep phones locked">
        Every trick defaulters use — SIM swaps, Wi-Fi off, factory resets — is already covered.
      </SectionHeading>

      <div className="mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
        <article className="relative overflow-hidden rounded-3xl bg-ink p-6 text-white md:row-span-2 sm:p-7">
          <div aria-hidden className="absolute -top-20 -right-20 size-56 rounded-full bg-ember/30 blur-3xl" />
          <span className="relative grid size-12 place-items-center rounded-2xl bg-ember/20 text-orange-300">
            <LockKeyhole className="size-6" />
          </span>
          <h3 className="relative mt-5 text-2xl font-bold">1-Click Remote Lock</h3>
          <p className="relative mt-2 leading-relaxed text-blue-100/80">
            Lock or unlock any customer&apos;s phone from the app or the web panel. Turn on auto-lock and
            phones lock themselves when an EMI goes overdue.
          </p>
          <LockToggleDemo />
        </article>

        {features.map(({ icon: Icon, title, body, tone }, i) => {
          const wide = i === features.length - 1;
          return (
            <article
              key={title}
              className={cn(
                "rounded-3xl bg-surface p-6 ring-1 ring-ink/5 sm:p-7",
                wide && "md:col-span-2 lg:col-span-3 sm:flex sm:items-center sm:gap-6"
              )}
            >
              <span className={cn("grid size-12 shrink-0 place-items-center rounded-2xl", tone)}>
                <Icon className="size-6" />
              </span>
              <div>
                <h3 className={cn("mt-5 text-xl font-bold text-ink", wide && "sm:mt-0")}>{title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mx-auto mt-10 max-w-5xl text-center">
        <p className="text-sm font-semibold text-ink">Plus everything else in the Device Control tab</p>
        <ul className="mt-4 flex flex-wrap justify-center gap-2">
          {extras.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm text-ink/80 ring-1 ring-ink/10"
            >
              <Icon className="size-3.5 text-brand" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
