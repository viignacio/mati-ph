import Link from "next/link";
import { Container } from "@/components/ui/container";

const FOOTER_LINKS = {
  explore: [
    { label: "Destinations", href: "/destinations" },
    { label: "Activities", href: "/activities" },
    { label: "Culture & Heritage", href: "/culture" },
    { label: "Food & Dining", href: "/food" },
  ],
  plan: [
    { label: "Travel Guide", href: "/travel-guide" },
    { label: "About Mati", href: "/about" },
  ],
};

interface FooterProps {
  siteName?: string;
  tagline?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export function Footer({
  siteName = "Mati City Tourism",
  tagline = "Where the Philippines Gets Wilder",
  contactEmail = "tourism@mati.gov.ph",
  contactPhone = "+63 87 811 1234",
}: FooterProps) {
  return (
    <footer className="bg-surface-highest mt-auto">
      {/* Main footer */}
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Link
              href="/"
              className="font-serif text-2xl font-semibold text-on-surface"
            >
              {siteName}
            </Link>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed max-w-xs">
              {tagline}. Discover pristine beaches, world-class surfing, and
              the warmth of Mandaya culture in Davao Oriental, Philippines.
            </p>
            <div className="flex flex-col gap-1 mt-2">
              <a
                href={`mailto:${contactEmail}`}
                className="font-sans text-sm text-primary hover:underline"
              >
                {contactEmail}
              </a>
              <a
                href={`tel:${contactPhone.replace(/\s/g, "")}`}
                className="font-sans text-sm text-on-surface-variant"
              >
                {contactPhone}
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-4">
            <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-on-surface-variant">
              Explore
            </h3>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-on-surface hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Plan */}
          <div className="flex flex-col gap-4">
            <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-on-surface-variant">
              Plan
            </h3>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.plan.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-on-surface hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-outline-variant/15">
        <Container className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-on-surface-variant">
            © {new Date().getFullYear()} Mati City Tourism Office. All rights
            reserved.
          </p>
          <p className="font-sans text-xs text-on-surface-variant">
            Davao Oriental, Philippines
          </p>
        </Container>
      </div>
    </footer>
  );
}
