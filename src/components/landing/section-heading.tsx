import { cn } from "cn";

export function SectionHeading({
  eyebrow,
  title,
  children,
  className,
  dark,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      <p
        className={cn(
          "text-xs font-semibold tracking-[0.14em] uppercase sm:text-sm",
          dark ? "text-gold" : "text-ember"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-3 text-3xl leading-tight font-bold sm:text-4xl",
          dark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {children && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            dark ? "text-blue-100/75" : "text-muted-foreground"
          )}
        >
          {children}
        </p>
      )}
    </div>
  );
}
