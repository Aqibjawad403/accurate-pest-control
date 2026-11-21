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
  { label: "Ants", href: "/pests/ants" },
  { label: "Cockroaches", href: "/pests/cockroaches" },
  { label: "Bed Bugs", href: "/pests/bed-bugs" },
  { label: "Rodents", href: "/pests/rodents" },
  { label: "Flies", href: "/pests/flies" },
  { label: "Mosquitoes", href: "/pests/mosquitoes" },
  { label: "Spiders", href: "/pests/spiders" },
  { label: "Termites", href: "/pests/termites" },
  { label: "Venomous", href: "/pests/venomous" },
  { label: "Birds", href: "/pests/birds" },
  { label: "Fumigation", href: "/services/fumigation" },
];

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/accuratepestcontrolservices/" },
  { name: "Instagram", href: "https://www.instagram.com/accuratepestcontrolservices" },
  { name: "TikTok", href: "https://www.tiktok.com/@accuratepestcontrol" },
  { name: "X", href: "https://twitter.com/AccuratePestC" },
  { name: "YouTube", href: "https://youtube.com/@AccuratePestControlServices" },
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

function ContactIcon({ kind }: { kind: "whatsapp" | "phone" | "email" }) {
  if (kind === "email") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
        />
      </svg>
    );
  }

  if (kind === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2a9.7 9.7 0 0 0-8.3 14.7L2.4 22l5.5-1.3A9.8 9.8 0 1 0 12 2zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-3.3.8.9-3.2-.2-.3A8 8 0 1 1 12 19.8zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8.9-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.1 7.1 0 0 1-1.3-1.6c-.1-.2 0-.3.1-.4l.4-.5.3-.4v-.4l-.7-1.7c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.3a9.2 9.2 0 0 0 3.5 3.1c.5.2.9.4 1.2.4.5.2 1 .1 1.3.1.4-.1 1.4-.6 1.6-1.1.2-.6.2-1 .2-1.1s-.1-.2-.3-.3z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 2.2z"
      />
    </svg>
  );
}

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
            <a href="tel:+9718008725" className={styles.contactLink}>
              <span className={styles.contactIcon}>
                <ContactIcon kind="whatsapp" />
              </span>
              <span>+971 800 8725,&nbsp; +971 4 375 6435</span>
            </a>
            <a href="tel:+971524496173" className={styles.contactLink}>
              <span className={styles.contactIcon}>
                <ContactIcon kind="phone" />
              </span>
              <span>+971 52 449 6173,&nbsp; +971 52 152 8725</span>
            </a>
            <a
              href="mailto:info@accuratepestcontrol.ae"
              className={styles.contactLink}
            >
              <span className={styles.contactIcon}>
                <ContactIcon kind="email" />
              </span>
              <span>info@accuratepestcontrol.ae</span>
            </a>
          </div>
        </div>
      </div>

      <p className={styles.copyright}>
        © 2026 | Accurate Pest Control Services LLC | All rights reserved.
      </p>
    </footer>
  );
}
