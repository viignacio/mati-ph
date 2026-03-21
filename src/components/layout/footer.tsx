import Link from "next/link";
import { Container } from "@/components/ui/container";

export function Footer({ data }: { data?: any }) {
  const headline = data?.headline || "";
  const subheading = data?.subheading || "";
  
  const socialLinks = data?.socialLinks || [];
  
  const exploreHeadline = data?.explore?.headline || "";
  const exploreLinks = data?.explore?.links || [];

  const connectHeadline = data?.connect?.headline || "";
  const contactPhone = data?.connect?.phone || "";
  const contactEmail = data?.connect?.email || "";
  const contactLocation = data?.connect?.location || "";

  const copyrightText = data?.copyright?.text || "";
  const privacyPolicyUrl = data?.copyright?.privacyPolicyUrl || "";
  const termsOfUseUrl = data?.copyright?.termsOfUseUrl || "";

  const renderSocialIcon = (platform: string) => {
    switch (platform?.toLowerCase()) {
      case 'facebook': return <span className="material-symbols-outlined text-sm">thumb_up</span>;
      case 'instagram': return <span className="material-symbols-outlined text-sm">photo_camera</span>;
      case 'x': return <span className="material-symbols-outlined text-sm">tag</span>;
      case 'youtube': return <span className="material-symbols-outlined text-sm">play_circle</span>;
      case 'tiktok': return <span className="material-symbols-outlined text-sm">music_note</span>;
      default: return <span className="material-symbols-outlined text-sm">link</span>;
    }
  };

  const logoUrl = data?.logo?.asset?.url;

  return (
    <footer className="w-full rounded-t-[4rem] md:rounded-t-[6rem] mt-20 bg-stone-100 border-t border-stone-200 shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 lg:px-20 py-20 max-w-[1440px] mx-auto text-center md:text-left">
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-center md:justify-start gap-3">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
            ) : (
              <span className="font-headline font-bold text-lg text-primary">Mati PH</span>
            )}
            <h2 className="text-2xl font-headline font-black text-on-background tracking-tight">{headline}</h2>
          </div>
          <p className="font-sans text-on-surface-variant max-w-sm mx-auto md:mx-0 leading-relaxed text-sm">
            {subheading}
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            {socialLinks.map((social: any) => (
              <a 
                key={social._key || social.url}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-surface border border-outline-variant/30 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm"
              >
                {renderSocialIcon(social.platform)}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold text-lg text-primary">{exploreHeadline}</h4>
          <ul className="space-y-4 text-on-surface-variant text-sm font-medium">
            {exploreLinks.map((link: any) => (
              <li key={link._key || link.url}>
                <Link href={link.url} className="font-sans hover:text-primary transition-colors hover:underline decoration-primary underline-offset-4">
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold text-lg text-primary">{connectHeadline}</h4>
          <ul className="space-y-4 text-on-surface-variant text-sm font-medium">
            {contactPhone && (
              <li className="flex items-center justify-center md:justify-start gap-3">
                <span className="material-symbols-outlined text-primary scale-75">call</span>
                {contactPhone}
              </li>
            )}
            {contactEmail && (
              <li className="flex items-center justify-center md:justify-start gap-3">
                <span className="material-symbols-outlined text-primary scale-75">mail</span>
                {contactEmail}
              </li>
            )}
            {contactLocation && (
              <li className="flex items-center justify-center md:justify-start gap-3">
                <span className="material-symbols-outlined text-primary scale-75">location_on</span>
                {contactLocation}
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="px-8 lg:px-20 py-10 border-t border-stone-200 bg-stone-50/50">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 font-sans text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest">
          <p>{copyrightText}</p>
          <div className="flex gap-8">
            {privacyPolicyUrl && (
              <Link href={privacyPolicyUrl} className="font-sans hover:text-primary transition-colors">Privacy Policy</Link>
            )}
            {termsOfUseUrl && (
              <Link href={termsOfUseUrl} className="font-sans hover:text-primary transition-colors">Terms of Use</Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
