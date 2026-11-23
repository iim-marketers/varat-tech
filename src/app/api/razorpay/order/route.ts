import { RAZORPAY_KEY_ID } from "@/lib/razorpay";
import { site } from "@/lib/site";

const clip = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, 120) : "");

/**
 * Creates a Razorpay order so the payment can be signature-verified.
 * Returns 501 when RAZORPAY_KEY_SECRET isn't set; the client then falls back
 * to a plain amount-based checkout.
 */
export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return Response.json({ error: "not_configured" }, { status: 501 });

  const body = await request.json().catch(() => ({}));
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${RAZORPAY_KEY_ID}:${secret}`).toString("base64")}`,
    },
    body: JSON.stringify({
      amount: site.amountPaise,
      currency: site.currency,
      receipt: `mdm_${Date.now()}`,
      notes: {
        plan: site.plan,
        retailer_name: clip(body.name),
        shop_name: clip(body.shop),
        mobile: clip(body.mobile),
        email: clip(body.email),
      },
    }),
  });

  if (!res.ok) return Response.json({ error: "order_failed" }, { status: 502 });
  const order = (await res.json()) as { id: string };
  return Response.json({ orderId: order.id });
}
