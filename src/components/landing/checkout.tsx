"use client";

import { createContext, useCallback, useContext, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Download,
  Loader2,
  LockKeyhole,
  MessageCircle,
  PlayCircle,
  ShieldCheck,
  Smartphone,
  Zap,
} from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loadRazorpay, RAZORPAY_KEY_ID, type RazorpaySuccess } from "@/lib/razorpay";
import { site, whatsappLink } from "@/lib/site";
import { track } from "@/lib/track";

type Form = { name: string; mobile: string; shop: string; email: string };
type Status =
  | { kind: "form" }
  | { kind: "processing" }
  | { kind: "success"; paymentId: string }
  | { kind: "error"; message: string };

const CheckoutContext = createContext<{ openCheckout: (source: string) => void } | null>(null);

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used inside <CheckoutProvider>");
  return ctx;
}

const value = { value: site.price, currency: site.currency, content_name: site.plan };

function validate(f: Form) {
  const errors: Partial<Record<keyof Form, string>> = {};
  if (f.name.trim().length < 2) errors.name = "Please enter your name";
  if (!/^[6-9]\d{9}$/.test(f.mobile)) errors.mobile = "Enter a valid 10-digit mobile number";
  if (f.shop.trim().length < 2) errors.shop = "Please enter your shop name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) errors.email = "Enter a valid email";
  return errors;
}

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Form>({ name: "", mobile: "", shop: "", email: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [status, setStatus] = useState<Status>({ kind: "form" });

  const openCheckout = useCallback((source: string) => {
    setStatus((s) => (s.kind === "success" ? s : { kind: "form" }));
    setOpen(true);
    window.dataLayer?.push({ event: "checkout_open", cta_source: source });
  }, []);

  async function pay(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    const details = {
      name: form.name.trim(),
      mobile: form.mobile,
      shop: form.shop.trim(),
      email: form.email.trim(),
    };
    track("Lead", value);
    setStatus({ kind: "processing" });

    try {
      await loadRazorpay();
      const orderRes = await fetch("/api/razorpay/order/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      }).catch(() => null);
      const orderId: string | undefined = orderRes?.ok ? (await orderRes.json()).orderId : undefined;

      const onSuccess = async (res: RazorpaySuccess) => {
        if (orderId) {
          const check = await fetch("/api/razorpay/verify/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(res),
          }).catch(() => null);
          if (!check?.ok) {
            setStatus({
              kind: "error",
              message: `We couldn't confirm payment ${res.razorpay_payment_id}. If money was debited, WhatsApp us this ID and we'll activate you right away.`,
            });
            setOpen(true);
            return;
          }
        }
        track("Purchase", { ...value, transaction_id: res.razorpay_payment_id }, res.razorpay_payment_id);
        setStatus({ kind: "success", paymentId: res.razorpay_payment_id });
        setOpen(true);
      };

      const rzp = new window.Razorpay!({
        key: RAZORPAY_KEY_ID,
        amount: site.amountPaise,
        currency: site.currency,
        name: site.product,
        description: site.plan,
        image: `${window.location.origin}/logo.png`,
        order_id: orderId,
        prefill: { name: details.name, email: details.email, contact: `+91${details.mobile}` },
        notes: {
          plan: site.plan,
          retailer_name: details.name,
          shop_name: details.shop,
          mobile: details.mobile,
          email: details.email,
        },
        theme: { color: "#1d4ed8" },
        handler: (res) => void onSuccess(res),
        modal: {
          confirm_close: true,
          ondismiss: () => {
            setStatus((s) => (s.kind === "error" ? s : { kind: "form" }));
            setOpen(true);
          },
        },
      });
      rzp.on("payment.failed", (r) => {
        setStatus({
          kind: "error",
          message: r.error.description ?? "Your payment could not be completed.",
        });
      });

      // Our modal dialog blocks outside clicks, so hand the screen to Razorpay.
      setOpen(false);
      rzp.open();
      track("InitiateCheckout", value);
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "Something went wrong. Please try again.",
      });
    }
  }

  const field = (key: keyof Form) => ({
    id: `co-${key}`,
    value: form[key],
    "aria-invalid": errors[key] ? true : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = key === "mobile" ? e.target.value.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "").slice(0, 10) : e.target.value;
      setForm((f) => ({ ...f, [key]: v }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    },
    className: "h-11 rounded-lg bg-white text-base",
  });

  return (
    <CheckoutContext.Provider value={{ openCheckout }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={cn(
            "max-h-[calc(100dvh-2rem)] gap-0 overflow-y-auto p-0 sm:max-w-md",
            status.kind === "success" && "sm:max-w-lg"
          )}
        >
          {status.kind === "success" ? (
            <Success paymentId={status.paymentId} form={form} />
          ) : (
            <>
              <div className="bg-ink bg-grid px-6 pt-6 pb-5 text-white">
                <DialogHeader className="gap-1.5">
                  <p className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-gold uppercase">
                    <Zap className="size-3.5" /> Instant activation
                  </p>
                  <DialogTitle className="font-heading text-xl font-semibold text-white">
                    Start locking for ₹{site.price}/month
                  </DialogTitle>
                  <DialogDescription className="text-blue-100/80">
                    Unlimited phone + Smart TV keys. Login details on WhatsApp &amp; email within 2 minutes.
                  </DialogDescription>
                </DialogHeader>
              </div>

              {status.kind === "error" && (
                <div role="alert" className="mx-6 mt-5 flex gap-3 rounded-lg bg-red-50 p-3 text-sm text-red-800 ring-1 ring-red-200">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                  <div>
                    <p>{status.message}</p>
                    <a
                      href={whatsappLink("Hi, I need help with my MDM Locker payment.")}
                      target="_blank"
                      rel="noopener"
                      onClick={() => track("Contact", { cta_source: "checkout_error" })}
                      className="mt-1 inline-block font-medium underline underline-offset-2"
                    >
                      Get help on WhatsApp
                    </a>
                  </div>
                </div>
              )}

              <form onSubmit={pay} noValidate className="grid gap-4 px-6 pt-5 pb-6">
                <Field label="Your name" error={errors.name} htmlFor="co-name">
                  <Input {...field("name")} autoComplete="name" placeholder="Ramesh Kumar" />
                </Field>
                <Field label="WhatsApp mobile number" error={errors.mobile} htmlFor="co-mobile">
                  <div className="flex">
                    <span className="grid h-11 place-items-center rounded-l-lg border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                      +91
                    </span>
                    <Input
                      {...field("mobile")}
                      className="h-11 rounded-l-none rounded-r-lg bg-white text-base"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      placeholder="98765 43210"
                    />
                  </div>
                </Field>
                <Field label="Shop name" error={errors.shop} htmlFor="co-shop">
                  <Input {...field("shop")} autoComplete="organization" placeholder="Kumar Mobile Point" />
                </Field>
                <Field label="Email" error={errors.email} htmlFor="co-email">
                  <Input {...field("email")} type="email" autoComplete="email" placeholder="you@example.com" />
                </Field>

                <Button
                  type="submit"
                  disabled={status.kind === "processing"}
                  className="cta-gradient mt-1 h-12 rounded-xl border-0 text-base font-semibold text-white shadow-lg shadow-ember/25 hover:brightness-105"
                >
                  {status.kind === "processing" ? (
                    <>
                      <Loader2 className="animate-spin" /> Opening secure checkout…
                    </>
                  ) : (
                    <>
                      Pay ₹{site.price} &amp; activate <ArrowRight data-icon="inline-end" />
                    </>
                  )}
                </Button>
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <LockKeyhole className="size-3.5" /> Secured by Razorpay
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="size-3.5 text-green-600" /> 7-day money-back guarantee
                  </span>
                </div>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </CheckoutContext.Provider>
  );
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </Label>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

type Step = {
  icon: typeof Download;
  title: string;
  body: string;
  action?: { label: string; href: string; contact?: boolean };
};

function Success({ paymentId, form }: { paymentId: string; form: Form }) {
  const steps: Step[] = [
    {
      icon: Download,
      title: "Download the Retailer App",
      body: "Official app on Google Play — no manual APK.",
      action: { label: "Open Play Store", href: site.playStoreUrl },
    },
    {
      icon: Smartphone,
      title: "Register with your mobile number",
      body: `Use +91 ${form.mobile} — the number you just paid with.`,
    },
    {
      icon: PlayCircle,
      title: "Watch the 2-minute setup video",
      body: "See exactly how to enrol and lock a phone.",
      action: { label: "Watch tutorial", href: `https://youtu.be/${site.youtubeId}` },
    },
    {
      icon: MessageCircle,
      title: "Verify on WhatsApp",
      body: "Send us your payment ID to get verified instantly.",
      action: {
        label: "Verify on WhatsApp",
        href: whatsappLink(
          `Hi, I just subscribed to MDM Locker.\nPayment ID: ${paymentId}\nName: ${form.name}\nShop: ${form.shop}\nMobile: ${form.mobile}`
        ),
        contact: true,
      },
    },
  ];

  return (
    <div className="px-6 pt-7 pb-6">
      <DialogHeader className="items-center gap-2 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 className="size-8" />
        </span>
        <DialogTitle className="font-heading text-2xl font-semibold">You&apos;re in, {form.name.split(" ")[0]}!</DialogTitle>
        <DialogDescription>
          Payment received. Your Master Panel login is on its way to WhatsApp and {form.email} — usually within 2 minutes.
        </DialogDescription>
        <p className="rounded-full bg-muted px-3 py-1 font-mono text-xs text-muted-foreground">
          Payment ID: {paymentId}
        </p>
      </DialogHeader>
      <ol className="mt-6 grid gap-3">
        {steps.map(({ icon: Icon, title, body, action }, i) => (
          <li key={title} className="flex gap-3 rounded-xl border border-border p-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
              <Icon className="size-4.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">
                {i + 1}. {title}
              </p>
              <p className="text-xs text-muted-foreground">{body}</p>
              {action && (
                <a
                  href={action.href}
                  target="_blank"
                  rel="noopener"
                  onClick={() => {
                    if (action.contact) track("Contact", { cta_source: "onboarding" });
                  }}
                  className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                >
                  {action.label} <ArrowRight className="size-3" />
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
