import type { Metadata } from "next";
import { Noto_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/json-ld";
import { siteUrl } from "@/lib/utils";


const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mati City, Davao Oriental — Where Philippines Gets Wilder",
    template: "%s | Mati City",
  },
  description:
    "Discover Mati City — pristine beaches, world-class surfing, Mandaya culture, vibrant festivals, and the warmest hospitality in Davao Oriental, Philippines.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_PH",
    siteName: "Mati City Tourism",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mati City Tourism",
  url: siteUrl,
  description:
    "Discover Mati City — pristine beaches, world-class surfing, Mandaya culture, vibrant festivals, and the warmest hospitality in Davao Oriental, Philippines.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mati City Tourism",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "tourist information",
    areaServed: "PH",
    availableLanguage: ["English", "Filipino"],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mati City",
    addressRegion: "Davao Oriental",
    addressCountry: "PH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSerif.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-on-surface">
        <JsonLd data={websiteJsonLd} />
        <JsonLd data={organizationJsonLd} />
        {children}
      </body>
    </html>
  );
}
