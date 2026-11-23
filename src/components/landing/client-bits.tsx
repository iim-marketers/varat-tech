"use client";

import { useEffect } from "react";
import { MessageCircle, Zap } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { site, whatsappLink } from "@/lib/site";
import { loadMetaPixel, resolvePixelId, track } from "@/lib/track";

import { useCheckout } from "./checkout";

export function PageTracking() {
  useEffect(() => {
    const pixelId = resolvePixelId();
    if (pixelId) {
      loadMetaPixel(pixelId);
      window.fbq?.("track", "PageView");
    }
    track("ViewContent", {
      value: site.price,
      currency: site.currency,
      content_name: site.plan,
    });
  }, []);
  return null;
}

export function SubscribeButton({
  source,
  className,
  size = "lg",
  children,
}: {
  source: string;
  className?: string;
  size?: "default" | "lg";
  children?: React.ReactNode;
}) {
  const { openCheckout } = useCheckout();
  return (
    <Button
      onClick={() => openCheckout(source)}
      className={cn(
        "cta-gradient border-0 font-semibold text-white shadow-lg shadow-ember/30 transition hover:brightness-105 hover:shadow-ember/40",
        size === "lg"
          ? "h-13 rounded-xl px-6 text-base"
          : "h-9 rounded-lg px-4 text-sm",
        className,
      )}
    >
      {children ?? (
        <>
          Subscribe — ₹{site.price}/mo{" "}
          <Zap data-icon="inline-end" className="fill-current" />
        </>
      )}
    </Button>
  );
}

export function WhatsAppLink({
  source,
  className,
  children,
  message = "Hi, I have a question about MDM Locker.",
}: {
  source: string;
  className?: string;
  children?: React.ReactNode;
  message?: string;
}) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener"
      onClick={() => track("Contact", { cta_source: source })}
      className={className}
    >
      {children ?? (
        <>
          <MessageCircle className="size-4" /> WhatsApp us
        </>
      )}
    </a>
  );
}

export function StickyBar() {
  const { openCheckout } = useCheckout();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-3">
        <div className="min-w-0 flex-1 leading-tight text-white">
          <p className="font-heading text-lg font-bold">
            ₹{site.price}
            <span className="text-sm font-medium text-blue-100/70">/mo</span>
          </p>
          <p className="truncate text-[0.7rem] text-blue-100/70">
            Unlimited keys · 7-day refund
          </p>
        </div>
        <WhatsAppLink
          source="sticky_bar"
          className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-green-400 ring-1 ring-white/15"
        >
          <MessageCircle className="size-5" />
          <span className="sr-only">WhatsApp us</span>
        </WhatsAppLink>
        <button
          onClick={() => openCheckout("sticky_bar")}
          className="cta-gradient flex h-11 shrink-0 items-center gap-1.5 rounded-xl px-5 font-semibold text-white shadow-lg shadow-ember/30"
        >
          Subscribe <Zap className="size-4 fill-current" />
        </button>
      </div>
    </div>
  );
}

export function BackToTop({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      className={cn(
        "text-xs font-medium cursor-pointer text-white transition-colors hover:text-brand-soft",
        className,
      )}
    >
      Back to top
    </button>
  );
}
