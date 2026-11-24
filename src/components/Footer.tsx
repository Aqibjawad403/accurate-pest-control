import Image from "next/image";
import Link from "next/link";
import { locations } from "@/data/locations";
import styles from "./Footer.module.css";

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "Pest & Services", href: "/pests" },
  { label: "Sectors", href: "/sectors" },
  { label: "About Us", href: "/about" },
  { label: "Documents", href: "/documents" },
  { label: "Clients", href: "/clients" },
  { label: "Careers", href: "/careers" },
  { label: "Events", href: "/events" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const pestLinks = [
  { label: "Ants", href: "/ant" },
  { label: "Cockroaches", href: "/cockroach" },
  { label: "Bed Bugs", href: "/bedbug" },
  { label: "Rodents", href: "/rodents" },
  { label: "Flies", href: "/flies" },
  { label: "Mosquitoes", href: "/mosquito" },
  { label: "Spiders", href: "/spider" },
  { label: "Termites", href: "/termites" },
  { label: "Venomous", href: "/snake" },
  { label: "Birds", href: "/bird" },
  { label: "Fumigation", href: "/fumigation" },
];

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/accuratepestcontrolservices/" },
  { name: "Instagram", href: "https://www.instagram.com/accuratepestcontrolservices" },
  { name: "TikTok", href: "https://www.tiktok.com/@accuratepestcontrol" },
  { name: "X", href: "https://twitter.com/AccuratePestC" },
  { name: "YouTube", href: "https://www.youtube.com/@AccuratePestControlServices" },
  { name: "Pinterest", href: "https://www.pinterest.com/accuratepestcontrolservice/" },
] as const;

function SocialIcon({ name }: { name: (typeof socialLinks)[number]["name"] }) {
  switch (name) {
    case "Facebook":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M14.5 8.5V7.2c0-.7.5-1.2 1.2-1.2H17V3.5h-2.3c-2.1 0-3.7 1.6-3.7 3.7v1.3H9v2.5h2v7.5h3.5v-7.5h2.2l.3-2.5h-2.5z"
          />
        </svg>
      );
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="12"
            cy="12"
            r="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="17.5" cy="6.8" r="1.2" fill="currentColor" />
        </svg>
      );
    case "TikTok":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M19.6 8.4a5.7 5.7 0 0 1-3.4-1.1v6.5a5.5 5.5 0 1 1-5.5-5.5c.3 0 .6 0 .9.1v2.7a2.8 2.8 0 1 0 2 2.7V2.5h2.6a5.7 5.7 0 0 0 3.4 3.3v2.6z"
          />
        </svg>
      );
    case "X":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M18.9 2.5H22l-6.8 7.8 8.3 11.2h-6.4l-5-6.5-5.7 6.5H3.2l7.3-8.3L.5 2.5h6.6l4.5 6 5.3-6zm-1.1 17.1h1.7L6.3 4.3H4.5l13.3 15.3z"
          />
        </svg>
      );
    case "YouTube":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M23.5 7.2a3 3 0 0 0-2.1-2.1C19.5 4.5 12 4.5 12 4.5s-7.5 0-9.4.6A3 3 0 0 0 .5 7.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-4.8zM9.8 15.5v-7l6.3 3.5-6.3 3.5z"
          />
        </svg>
      );
    case "Pinterest":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2C6.5 2 2 6.5 2 12c0 4.2 2.6 7.8 6.3 9.3-.1-.8-.2-2 0-2.9.2-.8 1.3-5.4 1.3-5.4s-.3-.7-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.5-.3 1.1.5 1.9 1.6 1.9 1.9 0 3.2-2.4 3.2-5.3 0-2.2-1.5-3.8-4.2-3.8-3.1 0-5 2.3-5 4.8 0 .9.3 1.8.7 2.3.1.1.1.2.1.3l-.3 1c0 .1-.1.2-.3.1-1.2-.5-1.8-1.9-1.8-3.4 0-2.5 2.1-5.6 6.3-5.6 3.4 0 5.6 2.4 5.6 5.1 0 3.5-1.9 6.1-4.8 6.1-.9 0-1.8-.5-2.1-1.1l-.6 2.2c-.2.8-.7 1.7-1.1 2.3A10 10 0 0 0 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z"
          />
        </svg>
      );
  }
}

type ContactLink = {
  href: string;
  text: string;
  external?: boolean;
};

const contactGroups: {
  icon: string;
  label: string;
  links: ContactLink[];
}[] = [
  {
    icon: "/call.svg",
    label: "Call",
    links: [
      { href: "tel:+9718008725", text: "+971 800 8725" },
      { href: "tel:+97143756435", text: "+971 4 375 6435" },
    ],
  },
  {
    icon: "/whastapp.svg",
    label: "WhatsApp",
    links: [
      {
        href: "https://wa.me/971524496173",
        text: "+971 52 449 6173",
        external: true,
      },
      {
        href: "https://wa.me/971521528725",
        text: "+971 52 152 8725",
        external: true,
      },
    ],
  },
  {
    icon: "/email.svg",
    label: "Email",
    links: [
      {
        href: "mailto:info@accuratepestcontrol.ae",
        text: "info@accuratepestcontrol.ae",
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.panel}>
        <div className={styles.columns}>
          <div className={styles.brandColumn}>
            <Image
              src="/logo1.png"
              alt="Accurate Pest Control Services LLC"
              width={238}
              height={120}
              className={styles.logo}
            />
            <p className={styles.description}>
              Providing reliable pest management solutions across all seven
              Emirates of the UAE. We are committed to protecting homes,
              businesses, and workplaces through professional pest control
              services.
            </p>
            <p className={styles.followLabel}>Follow Us:</p>
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={styles.socialLink}
                >
                  <SocialIcon name={social.name} />
                </a>
              ))}
            </div>
          </div>

          <nav className={styles.linkColumn} aria-label="Company">
            <h2 className={styles.columnHeading}>Company</h2>
            <ul className={styles.linkList}>
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.linkColumn} aria-label="Pest Library">
            <h2 className={styles.columnHeading}>Pest Library</h2>
            <ul className={styles.linkList}>
              {pestLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={`${styles.linkColumn} ${styles.locations}`}>
            <h2 className={styles.columnHeading}>Our Locations</h2>
            <ul className={styles.locationList}>
              {locations.map((location) => (
                <li key={location.name}>
                  <strong>{location.name}:</strong> {location.address}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.contactSection}>
          <hr className={styles.divider} />
          <div className={styles.contactLinks}>
            {contactGroups.map((group) => (
              <div key={group.label} className={styles.contactLink}>
                <a
                  href={group.links[0].href}
                  className={styles.contactIcon}
                  aria-label={group.label}
                  {...(group.links[0].external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <Image
                    src={group.icon}
                    alt=""
                    width={17}
                    height={17}
                    className={styles.contactIconImage}
                  />
                </a>
                <span className={styles.contactNumbers}>
                  {group.links.map((link, index) => (
                    <span key={link.href}>
                      {index > 0 ? <>,&nbsp;</> : null}
                      <a
                        href={link.href}
                        className={styles.contactNumber}
                        {...(link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.text}
                      </a>
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className={styles.copyright}>
        © 2026 | Accurate Pest Control Services LLC | All rights reserved.
      </p>
    </footer>
  );
}
