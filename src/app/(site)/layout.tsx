import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { HEADER_QUERY, FOOTER_QUERY } from "@/sanity/lib/queries";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [headerRes, footerRes] = await Promise.all([
    sanityFetch({ query: HEADER_QUERY }),
    sanityFetch({ query: FOOTER_QUERY }),
  ]);

  const headerData = headerRes.data;
  const footerData = footerRes.data;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-2xl focus:bg-primary focus:text-on-primary focus:font-sans focus:text-sm focus:font-medium focus:shadow-ambient"
      >
        Skip to content
      </a>
      <Navbar data={headerData} />
      <main id="main-content" className="flex-1 flex flex-col">{children}</main>
      <Footer data={footerData} />
      <SanityLive />
    </>
  );
}
