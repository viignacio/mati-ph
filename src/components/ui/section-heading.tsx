import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        align === "left" && "items-start text-left",
        className
      )}
    >
      {label && (
        <span className="font-sans text-sm font-semibold tracking-widest uppercase text-tertiary">
          {label}
        </span>
      )}

      <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-on-surface leading-tight">
        {title}
      </h2>

      {/* Gradient underline accent */}
      <div
        className={cn(
          "h-1 w-16 rounded-full cta-gradient",
          align === "center" && "self-center"
        )}
      />

      {description && (
        <p className="font-sans text-lg text-on-surface-variant leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
