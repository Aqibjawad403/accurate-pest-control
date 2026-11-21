import type { ReactNode } from "react";

const PHONE = "+971 52 152 8725";
const EMAIL = "info@accuratepestcontrol.ae";
const ICON_BG = "#ffffff";
const ICON_FG = "#005F13";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
        <path
          fill="currentColor"
          d="M14.5 8.5V7.2c0-.7.5-1.2 1.2-1.2h1.3V3.5h-2.3c-2.1 0-3.7 1.6-3.7 3.7v1.3H9v2.5h2v7.5h3.5v-7.5h2.2l.3-2.5h-2.5z"
        />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
        <path
          fill="currentColor"
          d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2zm5.1-8.2a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zm3.1 1.1c-.1-1.9-.5-3.5-1.9-4.9S15.1 1.5 13.2 1.4C11.2 1.3 12.8 1.3 12 1.3s-.8 0-2.8.1C7.3 1.5 5.7 1.9 4.3 3.3S1.5 6.7 1.4 8.6C1.3 10.6 1.3 9 1.3 12s0 .8.1 2.8c.1 1.9.5 3.5 1.9 4.9s3 1.8 4.9 1.9c2 .1.4.1 2.8.1s.8 0 2.8-.1c1.9-.1 3.5-.5 4.9-1.9s1.8-3 1.9-4.9c.1-2 .1-.4.1-2.8s0-.8-.1-2.8zm-2 10.3a3.7 3.7 0 0 1-2.1 2.1c-1.4.6-4.8.4-6.1.4s-4.7.1-6.1-.4a3.7 3.7 0 0 1-2.1-2.1c-.6-1.4-.4-4.8-.4-6.1s-.1-4.7.4-6.1a3.7 3.7 0 0 1 2.1-2.1c1.4-.6 4.8-.4 6.1-.4s4.7-.1 6.1.4a3.7 3.7 0 0 1 2.1 2.1c.6 1.4.4 4.8.4 6.1s.2 4.7-.4 6.1z"
        />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
        <path
          fill="currentColor"
          d="M19.6 8.4a5.7 5.7 0 0 1-3.4-1.1v6.5a5.5 5.5 0 1 1-5.5-5.5c.3 0 .6 0 .9.1v2.7a2.8 2.8 0 1 0 2 2.7V2.5h2.6a5.7 5.7 0 0 0 3.4 3.3v2.6z"
        />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3 w-3">
        <path
          fill="currentColor"
          d="M18.9 2.5h3.1l-6.8 7.8L23.5 21.5h-6.4l-5-6.5-5.7 6.5H3.2l7.3-8.3L.5 2.5h6.6l4.5 6 5.3-6zm-1.1 17.1h1.7L6.3 4.3H4.5l13.3 15.3z"
        />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
        <path
          fill="currentColor"
          d="M23.5 7.2a3 3 0 0 0-2.1-2.1C19.5 4.5 12 4.5 12 4.5s-7.5 0-9.4.6A3 3 0 0 0 .5 7.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-4.8zM9.8 15.5v-7l6.3 3.5-6.3 3.5z"
        />
      </svg>
    ),
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
        <path
          fill="currentColor"
          d="M12 2C6.5 2 2 6.5 2 12c0 4.2 2.6 7.8 6.3 9.3-.1-.8-.2-2 0-2.9.2-.8 1.3-5.4 1.3-5.4s-.3-.7-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.5-.3 1.1.5 1.9 1.6 1.9 1.9 0 3.2-2.4 3.2-5.3 0-2.2-1.5-3.8-4.2-3.8-3.1 0-5 2.3-5 4.8 0 .9.3 1.8.7 2.3.1.1.1.2.1.3l-.3 1c0 .1-.1.2-.3.1-1.2-.5-1.8-1.9-1.8-3.4 0-2.5 2.1-5.6 6.3-5.6 3.4 0 5.6 2.4 5.6 5.1 0 3.5-1.9 6.1-4.8 6.1-.9 0-1.8-.5-2.1-1.1l-.6 2.2c-.2.8-.7 1.7-1.1 2.3A10 10 0 0 0 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z"
        />
      </svg>
    ),
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
                <IconBadge>{social.icon}</IconBadge>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
