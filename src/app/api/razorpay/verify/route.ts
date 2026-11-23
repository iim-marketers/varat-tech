import { createHmac, timingSafeEqual } from "node:crypto";

export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return Response.json({ verified: false, error: "not_configured" }, { status: 501 });

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request
    .json()
    .catch(() => ({}));
  if (![razorpay_order_id, razorpay_payment_id, razorpay_signature].every((v) => typeof v === "string")) {
    return Response.json({ verified: false }, { status: 400 });
  }

  const expected = createHmac("sha256", secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(razorpay_signature);
  const verified = a.length === b.length && timingSafeEqual(a, b);
  return Response.json({ verified }, { status: verified ? 200 : 400 });
}
