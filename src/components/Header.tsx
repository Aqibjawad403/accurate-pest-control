import Image from "next/image";
import type { ReactNode } from "react";

const PHONE = "+971 52 152 8725";
const EMAIL = "info@accuratepestcontrol.ae";
const ICON_BG = "#ffffff";
const ICON_FG = "#005F13";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/accuratepestcontrolservices/",
    icon: "/header/Facebook.svg",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/accuratepestcontrolservices",
    icon: "/header/Instagram.svg",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@accuratepestcontrol",
    icon: "/header/Vector.svg",
  },
  {
    name: "X",
    href: "https://twitter.com/AccuratePestC",
    icon: "/header/Twitter.svg",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@AccuratePestControlServices",
    icon: "/header/you.svg",
  },
  {
    name: "Pinterest",
    href: "https://www.pinterest.com/accuratepestcontrolservice/",
    icon: "/header/pinterest.svg",
  },
];

function IconBadge({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[5px]"
      style={{ backgroundColor: ICON_BG, color: ICON_FG }}
    >
      {children}
    </span>
  );
}

export default function Header() {
  return (
    <div className="w-full bg-[#005F13] text-white">
      <div className="flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-2 px-16 py-2.5 max-md:px-6 max-sm:flex-col max-sm:items-start max-sm:gap-2 max-sm:px-4">
        <div className="flex min-w-0 flex-wrap items-center gap-x-6 gap-y-2 text-[13px] font-medium tracking-wide sm:text-sm">
          <a
            href={`tel:${PHONE.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 transition-opacity hover:opacity-90"
          >
            <IconBadge>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
                <path
                  fill="currentColor"
                  d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 2.2z"
                />
              </svg>
            </IconBadge>
            <span>{PHONE}</span>
          </a>

          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 transition-opacity hover:opacity-90"
          >
            <IconBadge>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
                <path
                  fill="currentColor"
                  d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"
                />
              </svg>
            </IconBadge>
            <span>{EMAIL}</span>
          </a>
        </div>

        <div className="flex items-center gap-3 text-[13px] font-medium sm:text-sm">
          <span className="whitespace-nowrap">Follow us on:</span>
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="transition-opacity hover:opacity-90"
              >
                <IconBadge>
                  <Image
                    src={social.icon}
                    alt=""
                    width={14}
                    height={14}
                    className="h-3.5 w-3.5 object-contain"
                    aria-hidden="true"
                  />
                </IconBadge>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
