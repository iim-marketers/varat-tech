import { LockKeyhole, Phone, ScanLine } from "lucide-react";

import { PhoneFrame } from "./frames";

function Finder({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="7" height="7" rx="1.2" />
      <rect x="1" y="1" width="5" height="5" rx="0.8" fill="white" />
      <rect x="2" y="2" width="3" height="3" rx="0.5" />
    </g>
  );
}

/** Deterministic, decorative QR-style grid (not a scannable code). */
function QrGlyph({ size = 21 }: { size?: number }) {
  const cells: React.ReactNode[] = [];
  const finder = (x: number, y: number) =>
    (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (finder(x, y)) continue;
      const v = (x * 73 + y * 151 + x * y * 17) % 7;
      if (v < 3) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />);
    }
  }
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="size-full" fill="#081329" aria-hidden>
      {cells}
      <Finder x={0} y={0} />
      <Finder x={size - 7} y={0} />
      <Finder x={0} y={size - 7} />
    </svg>
  );
}

export function QrLockScreen({ className }: { className?: string }) {
  return (
    <PhoneFrame className={className}>
      <div
        role="img"
        aria-label="Illustration: a customer's phone locked with an EMI overdue notice and a UPI QR code to pay and unlock"
        className="@container relative flex aspect-[738/1502] flex-col items-center bg-[radial-gradient(120%_70%_at_50%_0%,#1e3a8a_0%,#0b1530_55%,#060d1f_100%)] px-[9%] pt-[12%] text-center text-white"
      >
        <div className="relative grid size-[18%] place-items-center rounded-full bg-red-500/15 ring-1 ring-red-400/40">
          <span className="absolute inset-0 animate-ping-slow rounded-full bg-red-500/20" />
          <LockKeyhole className="size-1/2 text-red-300" />
        </div>
        <p className="mt-[6%] font-heading text-[8.5cqw] leading-tight font-semibold">
          Device locked
        </p>
        <p className="mt-[2%] text-[5.4cqw] leading-snug text-blue-100/80">
          EMI of <span className="font-semibold text-white">₹1,680</span> is overdue by 3 days
        </p>
        <div className="mt-[7%] w-[78%] rounded-2xl bg-white p-[7%] shadow-lg">
          <QrGlyph />
        </div>
        <p className="mt-[6%] flex items-center gap-[2cqw] text-[5.2cqw] font-medium text-blue-100">
          <ScanLine className="size-[5.5cqw]" /> Scan &amp; pay with any UPI app
        </p>
        <p className="mt-[1%] text-[4.4cqw] leading-snug text-blue-100/60">
          Phone unlocks once your EMI is paid
        </p>
        <div className="mt-auto mb-[9%] flex w-full items-center justify-center gap-[2cqw] rounded-full bg-white/10 py-[4%] text-[5cqw] font-medium ring-1 ring-white/15">
          <Phone className="size-[5cqw]" /> Call your retailer
        </div>
      </div>
    </PhoneFrame>
  );
}
