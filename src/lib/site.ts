export const site = {
  product: "MDM Locker",
  company: "Varat Tech Global Pvt. Ltd.",
  url: "https://mdmlocker.in",
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
} as const;

export function whatsappLink(text: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
