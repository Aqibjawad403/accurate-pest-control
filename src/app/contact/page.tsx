import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import BannerMedia, { bannerImages } from "@/components/BannerMedia";
import ContactPageForm from "@/components/ContactPageForm";
import HomeAnimations from "@/components/HomeAnimations";
import Navbar from "@/components/Navbar";
import { locations } from "@/data/locations";
import styles from "./ContactPage.module.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Contact Us | Accurate Pest Control Services LLC",
  description:
    "Contact Accurate Pest Control Services LLC for professional pest control support across the UAE.",
};

const contactMethods = [
  {
    title: "Whatsapp",
    detail: "+971 800 8725, +971 4 375 6435",
    href: "https://wa.me/971524496173",
    icon: "/whastapp.svg",
    iconAlt: "",
  },
  {
    title: "Call",
    detail: "+971 524496173, +971 521528725",
    href: "tel:+971524496173",
    icon: "/call.svg",
    iconAlt: "",
  },
  {
    title: "Email",
    detail: "info@accuratepestcontrol.ae",
    href: "mailto:info@accuratepestcontrol.ae",
    icon: "/email.svg",
    iconAlt: "",
  },
];

export default function ContactPage() {
  return (
    <HomeAnimations>
      <div className={inter.className}>
        <section className={styles.hero} data-gsap-section="hero">
          <div className={styles.heroShell} data-gsap-hero="shell">
            <BannerMedia
              src={bannerImages.contact}
              alt="Customer reaching out on a smartphone"
              priority
            />
            <div className="relative z-10" data-gsap-hero="nav">
              <Navbar activeHref="/contact" />
            </div>
            <div className={`${styles.heroCopy} z-10`} data-gsap-hero="copy">
              <p className={styles.eyebrow}>We&apos;re here to help</p>
              <h1 data-gsap-split>Contact Us</h1>
              <p className={styles.heroDescription}>
                Reach out to our team for fast, reliable pest control support
                anywhere in the UAE.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.contactContent} aria-label="Contact details">
          <div className={styles.contactMethods}>
            {contactMethods.map((method) => (
              <a
                className={styles.contactCard}
                href={method.href}
                key={method.title}
              >
                <span className={styles.contactCardTop}>
                  <span className={styles.contactIcon}>
                    <Image
                      src={method.icon}
                      alt={method.iconAlt}
                      width={28}
                      height={28}
                    />
                  </span>
                  <span className={styles.contactTitle}>{method.title}</span>
                </span>
                <span className={styles.contactDetail}>{method.detail}</span>
              </a>
            ))}
          </div>

          <div className={styles.contactGrid}>
            <div className={styles.intro}>
              <div className={styles.introCopy}>
                <h2>We are always ready to help you and answer your questions</h2>
                <p>
                  We&apos;re just a call or message away let&apos;s solve your pest
                  problems quickly and hassle-free!
                </p>
              </div>
              <div className={`${styles.contactImage} image-zoom`}>
                <Image
                  className={styles.contactImagePhoto}
                  src="/pests/fumigation/Professional_Fumigation_Service_in_Action.webp"
                  alt="Pest control professional providing a fumigation service"
                  width={641}
                  height={450}
                />
              </div>
            </div>

            <ContactPageForm />
          </div>
        </section>

        <section
          className={styles.locationsSection}
          aria-labelledby="locations-heading"
        >
          <div className={styles.locationsInner}>
            <h2 className={styles.locationsHeading} id="locations-heading">
              Our Locations
            </h2>
            <div className={styles.locationsGrid}>
              {locations.map((location) => {
                const addressQuery = encodeURIComponent(location.address);
                const mapUrl =
                  location.mapUrl ??
                  `https://maps.google.com/maps?q=${addressQuery}&z=14&output=embed`;
                const mapLink =
                  location.mapLink ??
                  `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;

                return (
                  <article className={styles.locationCard} key={location.name}>
                    <iframe
                      className={styles.locationMap}
                      src={mapUrl}
                      title={`Map of ${location.name}`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <p className={styles.locationAddress}>
                      <a
                        href={mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {location.name}
                      </a>
                      : {location.address}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </HomeAnimations>
  );
}
