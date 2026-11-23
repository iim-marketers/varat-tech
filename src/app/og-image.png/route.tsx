import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { ogImage, site } from "@/lib/site";

// Not opengraph-image: trailingSlash makes that URL redirect, which WhatsApp won't follow.
const size = { width: ogImage.width, height: ogImage.height };

// Default OG font has no ₹ glyph.
const [poppinsBold, poppinsMedium, logo] = await Promise.all([
  readFile(join(process.cwd(), "src/assets/fonts/Poppins-Bold.ttf")),
  readFile(join(process.cwd(), "src/assets/fonts/Poppins-Medium.ttf")),
  readFile(join(process.cwd(), "public/logo.png")),
]);
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

const chips = ["Offline auto-lock", "FRP block", "UPI QR unlock", "7-day refund"];

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "radial-gradient(circle at 85% 10%, rgba(37,99,235,0.55), transparent 55%), radial-gradient(circle at 0% 100%, rgba(234,88,12,0.28), transparent 50%), #081329",
          color: "white",
          fontFamily: "Poppins",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={72} height={72} style={{ borderRadius: 16 }} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.1 }}>
              {site.product}
            </span>
            <span style={{ fontSize: 20, fontWeight: 500, color: "rgba(219,234,254,0.7)" }}>
              by Varat Tech Global
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>
          <span>Stop EMI defaulters.</span>
          <span style={{ color: "#60a5fa" }}>Lock unlimited phones & TVs</span>
          <span>
            for&nbsp;<span style={{ color: "#fbbf24" }}>₹{site.price}/month.</span>
          </span>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {chips.map((c) => (
            <span
              key={c}
              style={{
                fontSize: 22,
                fontWeight: 500,
                padding: "8px 20px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "#eff6ff",
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Poppins", data: poppinsBold, weight: 700, style: "normal" },
        { name: "Poppins", data: poppinsMedium, weight: 500, style: "normal" },
      ],
    },
  );
}
