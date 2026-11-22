import Image from "next/image";

export const bannerImages = {
  home: "/banners/home.webp",
  about: "/banners/about.webp",
  services: "/banners/services.webp",
  pests: "/banners/pests.webp",
  sectors: "/banners/sectors.webp",
  clients: "/banners/clients.webp",
  documents: "/banners/documents.webp",
  careers: "/banners/careers.webp",
  contact: "/banners/contact.webp",
  events: "/banners/events.webp",
  blog: "/banners/blog.webp",
  big5: "/banners/big5.webp",
} as const;

type BannerMediaProps = {
  src: string;
  alt?: string;
  priority?: boolean;
  /** 0–100, higher = stronger green brand wash over the photo */
  overlayOpacity?: number;
};

/**
 * Full-bleed photo + green brand overlay for page banners.
 * Clips itself so parent shells can stay overflow-visible for mobile nav.
 */
export default function BannerMedia({
  src,
  alt = "",
  priority = false,
  overlayOpacity = 72,
}: BannerMediaProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
      aria-hidden={alt ? undefined : true}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0, 95, 19, ${overlayOpacity / 100})` }}
        aria-hidden
      />
    </div>
  );
}
