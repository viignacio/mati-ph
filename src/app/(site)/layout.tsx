import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { sanityFetch } from "@/sanity/lib/live";
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
      <Navbar data={headerData} />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer data={footerData} />
    </>
  );
}
