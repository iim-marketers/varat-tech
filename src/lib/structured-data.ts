import { faqs } from "@/components/landing/bottom";
import { ogImage, seo, site } from "@/lib/site";

const pageUrl = new URL(site.landingPath, site.url).href;
const orgId = `${site.url}/#organization`;
const siteId = `${site.url}/#website`;
const appId = `${site.url}/#app`;

// Don't add ratings/reviews unless they're real and shown on the page.
export const landingJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": orgId,
      name: site.company,
      url: site.url,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/logo.png`,
        width: 256,
        height: 256,
      },
      brand: { "@type": "Brand", name: site.product },
      sameAs: [site.playStoreUrl, `https://youtu.be/${site.youtubeId}`],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: `+${site.whatsappNumber}`,
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    },
    {
      "@type": "WebSite",
      "@id": siteId,
      url: site.url,
      name: site.product,
      publisher: { "@id": orgId },
      inLanguage: "en-IN",
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: seo.title,
      description: seo.description,
      isPartOf: { "@id": siteId },
      about: { "@id": appId },
      primaryImageOfPage: new URL(ogImage.url, site.url).href,
      inLanguage: "en-IN",
    },
    {
      "@type": "SoftwareApplication",
      "@id": appId,
      name: site.product,
      description: seo.description,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Android",
      url: pageUrl,
      downloadUrl: site.playStoreUrl,
      installUrl: site.playStoreUrl,
      image: `${site.url}/logo.png`,
      publisher: { "@id": orgId },
      featureList: [
        "Unlimited Android phone locker keys",
        "Unlimited Android Smart TV locker keys",
        "Remote lock and offline auto-lock",
        "Factory reset (FRP) block",
        "Live GPS location and SIM change alert",
        "UPI QR payment on the lock screen",
        "Automatic EMI reminders",
      ],
      offers: {
        "@type": "Offer",
        name: site.plan,
        price: site.price,
        priceCurrency: site.currency,
        availability: "https://schema.org/InStock",
        url: pageUrl,
        seller: { "@id": orgId },
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: site.price,
          priceCurrency: site.currency,
          referenceQuantity: {
            "@type": "QuantitativeValue",
            value: 1,
            unitCode: "MON",
          },
        },
        hasMerchantReturnPolicy: {
          "@type": "MerchantReturnPolicy",
          applicableCountry: "IN",
          returnPolicyCategory:
            "https://schema.org/MerchantReturnFiniteReturnWindow",
          merchantReturnDays: 7,
          refundType: "https://schema.org/FullRefund",
          returnFees: "https://schema.org/FreeReturn",
        },
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faqs.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export function toJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
