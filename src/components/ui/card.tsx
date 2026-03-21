import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

/**
 * Compound component pattern: Card.Root, Card.Image, Card.Body, Card.Title
 *
 * Design rules (DESIGN.md):
 * - No 1px borders — elevation through tonal surface colors only
 * - md corner radius (1.5rem) on images
 * - Ambient shadow with on-surface tint, not pure black
 * - tertiary-container overlay at 10% on hover
 */

interface CardRootProps extends HTMLAttributes<HTMLDivElement> {
  href?: string;
  elevated?: boolean;
}

function CardRoot({ href, elevated, className, children, ...props }: CardRootProps) {
  const classes = cn(
    "group relative flex flex-col overflow-hidden rounded-3xl bg-surface-low",
    elevated && "shadow-ambient",
    className
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

interface CardImageProps extends HTMLAttributes<HTMLDivElement> {
  aspectRatio?: "square" | "video" | "portrait" | "landscape";
}

function CardImage({ aspectRatio = "landscape", className, children }: CardImageProps) {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl m-2",
        aspectClasses[aspectRatio],
        className
      )}
    >
      {/* Tertiary-container overlay on hover — warmth of the sun */}
      <div className="absolute inset-0 z-10 bg-tertiary-container opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl" />
      {children}
    </div>
  );
}

function CardBody({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-2 px-4 pb-5 pt-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "font-serif text-xl font-semibold text-on-surface leading-snug",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

function CardDescription({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "font-sans text-sm text-on-surface-variant leading-relaxed line-clamp-2",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export const Card = {
  Root: CardRoot,
  Image: CardImage,
  Body: CardBody,
  Title: CardTitle,
  Description: CardDescription,
};
