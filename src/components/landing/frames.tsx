import Image from "next/image";
import { cn } from "cn";

export function PhoneFrame({
  src,
  alt,
  width = 738,
  height = 1502,
  className,
  preload,
  sizes = "(min-width: 1024px) 280px, 45vw",
  children,
}: {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  preload?: boolean;
  sizes?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[2.2rem] bg-[#0b1220] p-[6px] shadow-[0_30px_60px_-20px_rgb(8_19_41/0.55)] ring-1 ring-white/10",
        className
      )}
    >
      <div className="relative overflow-hidden rounded-[1.85rem] bg-white">
        {src ? (
          <Image
            src={src}
            alt={alt ?? ""}
            width={width}
            height={height}
            sizes={sizes}
            preload={preload}
            className="block h-auto w-full"
          />
        ) : (
          children
        )}
      </div>
      <span
        aria-hidden
        className="absolute top-1/4 -right-[3px] h-14 w-[3px] rounded-r bg-[#0b1220]"
      />
    </div>
  );
}

export function BrowserFrame({
  src,
  alt,
  width,
  height,
  label,
  className,
  sizes = "(min-width: 1024px) 760px, 100vw",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  label: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl bg-white shadow-[0_30px_70px_-25px_rgb(8_19_41/0.45)] ring-1 ring-ink/10",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate rounded-md bg-white px-3 py-0.5 text-xs text-muted-foreground ring-1 ring-border">
          {label}
        </span>
      </div>
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} className="block h-auto w-full" />
    </div>
  );
}
