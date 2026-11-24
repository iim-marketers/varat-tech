const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://home.mdmlocker.in",
).origin;

export const site = {
  product: "MDM Locker",
  company: "Varat Tech Global Pvt. Ltd.",
  url: siteUrl,
  price: 999,
  amountPaise: 99_900,
  currency: "INR",
  plan: "Master Retailer Panel — 1 month",
  playStoreUrl:
    "https://play.google.com/store/apps/details?id=com.mdmlockapp.retailer&pcampaignid=web_share",
  youtubeId: "jZHks2x8HDI",
  whatsappNumber: "918945879609",
  whatsappDisplay: "+91 89458 79609",
  gtmId: "GTM-5DSH9BV6",
  landingPath: "/start/",
} as const;

export const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: `${site.product} — lock unlimited EMI phones and Smart TVs for ₹${site.price}/month`,
};

export const seo = {
  title: `${site.product} — Unlimited EMI Phone & TV Locker at ₹${site.price}/month`,
  shortTitle: `Unlimited EMI Phone & TV Locker — ₹${site.price}/month`,
  description: `Stop EMI defaulters. Lock unlimited Android phones & Smart TVs for a flat ₹${site.price}/month — offline auto-lock, FRP block, GPS & UPI QR unlock. 7-day refund.`,
  socialDescription: `Why pay ₹200 per key? Lock unlimited phones and Smart TVs for a flat ₹${site.price}/month. 7-day money-back guarantee.`,
  keywords: [
    "EMI locker",
    "EMI phone locker",
    "mobile EMI lock app",
    "EMI device locking software",
    "Smart TV EMI locker",
    "MDM locker",
    "phone finance lock app India",
    "EMI defaulter phone lock",
    "unlimited locker keys",
    "retailer EMI app",
    "FRP lock",
    "UPI QR unlock",
  ],
} as const;

export function whatsappLink(text: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
