import Image from "next/image";
import type { Metadata } from "next";
import BannerMedia, { bannerImages } from "@/components/BannerMedia";
import HomeAnimations from "@/components/HomeAnimations";
import Navbar from "@/components/Navbar";
import styles from "./Big5EventPage.module.css";

export const metadata: Metadata = {
  title: "Big 5 Global 2026 | Accurate Pest Control Events",
  description:
    "Meet Accurate Pest Control at Big 5 Global 2026, November 23–26 at Dubai World Trade Centre.",
};

const eventDetails = [
  {
    icon: "/events/calander.svg",
    width: 26,
    height: 21,
    text: "November 23 - 26, 2026",
  },
  {
    icon: "/events/clock.svg",
    width: 24,
    height: 24,
    text: "10:00 AM - 6:00 PM",
  },
  {
    icon: "/events/location_on.svg",
    width: 19,
    height: 24,
    text: "Dubai World Trade Centre, Dubai, UAE.",
  },
];

const expectations = [
  {
    icon: "/events/icon 1.svg",
    width: 45,
    height: 50,
    title: "Innovative Pest Control Solutions",
    description:
      "Discover modern pest management approaches, advanced equipment, and evolving technologies designed to improve pest detection, treatment efficiency, and long-term prevention.",
  },
  {
    icon: "/events/icon 2.svg",
    width: 47,
    height: 50,
    title: "Safe & Responsible Pest Management",
    description:
      "Explore the importance of responsible treatment methods, appropriate product use, and preventive measures that help protect people, property, and surrounding environments.",
  },
  {
    icon: "/events/icon 3.svg",
    width: 50,
    height: 50,
    title: "Industry Networking & Collaboration",
    description:
      "Connect with pest management professionals, exchange experiences, and discuss practical solutions to common challenges across residential, commercial, and industrial settings.",
  },
  {
    icon: "/events/icon 4.svg",
    width: 47,
    height: 50,
    title: "Knowledge Sharing & Industry Insights",
    description:
      "Learn about emerging pest control trends, changing pest behavior, and practical prevention strategies that can help improve service quality and pest management outcomes.",
  },
  {
    icon: "/events/icon 5.svg",
    width: 48,
    height: 50,
    title: "Residential & Commercial Pest Solutions",
    description:
      "Explore different approaches to managing pest problems in homes, offices, restaurants, warehouses, and other facilities, with an emphasis on suitable treatments and preventive care.",
  },
  {
    icon: "/events/icon 6.svg",
    width: 60,
    height: 50,
    title: "Continuous Improvement & Excellence",
    description:
      "Explore ideas that encourage ongoing learning, stronger professional standards, and more effective pest management practices, supporting our commitment to dependable customer service.",
  },
];

export default function Big5EventPage() {
  return (
    <HomeAnimations>
      <section
        className="relative w-full pt-5 has-[#mobile-navigation-menu]:z-[100]"
        data-gsap-section="hero"
      >
        <div className={styles.banner}>
          <BannerMedia
            src={bannerImages.big5}
            alt="Construction and trade exhibition at Big 5 Global"
            priority
          />
          <div className="relative z-10" data-gsap-hero="nav">
            <Navbar activeHref="/events" />
          </div>
          <h1 className={`${styles.bannerTitle} z-10`} data-gsap-split>
            Pest Control Events in UAE
          </h1>
        </div>
      </section>

      <section
        className={styles.eventSection}
        aria-labelledby="big-five-title"
      >
        <div className={styles.eventRow}>
          <div className={`${styles.eventImage} image-zoom`}>
            <Image
              src="/events/event.svg"
              alt="Accurate Pest Control at Big 5 Global 2026"
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 55vw"
              className={styles.eventImageContent}
            />
          </div>

          <div className={styles.eventCopy}>
            <h2 className={styles.eventTitle} id="big-five-title">
              Pest Control Exhibition at Big 5 Global 2026
            </h2>
            <p className={styles.eventDescription}>
              Meet us at Big 5 Global 2026 in Dubai for pest control solutions,
              services, and expert industry advice.
            </p>

            <ul className={styles.eventDetails}>
              {eventDetails.map((detail) => (
                <li className={styles.eventDetail} key={detail.text}>
                  <span className={styles.detailIcon}>
                    <Image
                      src={detail.icon}
                      alt=""
                      width={detail.width}
                      height={detail.height}
                    />
                  </span>
                  <span>{detail.text}</span>
                </li>
              ))}
            </ul>

            <div className={styles.contactButtons}>
              <a
                className={styles.contactButton}
                href="https://wa.me/971524496173"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.contactIcon}>
                  <Image
                    src="/whastapp.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                </span>
                <span className={styles.contactCopy}>
                  <span className={styles.contactLabel}>WHATSAPP</span>
                  <span className={styles.contactValue}>+971 52 449 6173</span>
                </span>
                <Image
                  src="/arrow-white.svg"
                  alt=""
                  width={12}
                  height={11}
                  className={styles.contactArrow}
                />
              </a>

              <a
                className={styles.contactButton}
                href="mailto:big5@apcs.ae"
              >
                <span className={styles.contactIcon}>
                  <Image src="/email.svg" alt="" width={20} height={16} />
                </span>
                <span className={styles.contactCopy}>
                  <span className={styles.contactLabel}>MAIL US</span>
                  <span className={styles.contactValue}>big5@apcs.ae</span>
                </span>
                <Image
                  src="/arrow-white.svg"
                  alt=""
                  width={12}
                  height={11}
                  className={styles.contactArrow}
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.aboutSection} aria-labelledby="about-event">
        <div className={styles.aboutContent}>
          <h2 className={styles.aboutTitle} id="about-event">
            About the Event
          </h2>
          <div className={styles.aboutCopy}>
            <p>
              Big 5 Global 2026 is the 47th edition of the region&apos;s largest
              construction and building exhibition, held at Dubai World Trade
              Centre, 23 to 26 November 2026. Big 5 Global Dubai 2026 will host
              Big 5 Global 2026 exhibitors from 165 countries during the event
              dates.
            </p>
            <p>
              Accurate Pest Control Services LLC will exhibit at Hall 4, Stall
              4A200, offering professional pest management for facilities
              management and pest control for construction sites in Dubai,
              backed by Dubai Municipality-approved (Group A) expertise.
            </p>
            <p>
              Visitors can discuss termite prevention for new projects,
              cost-effective annual maintenance contracts, and handover
              compliance. Big 5 Global 2026 registration is now open, and our
              free entry pass makes visiting simple.
            </p>
            <p>
              The event location on Sheikh Zayed Road, and Future FM 2026 Dubai,
              bring facilities professionals together. As the pest control
              company at the event, Accurate Pest Control Big 5 Global 2026
              warmly welcomes all contractors, developers, and FM teams to
              meet us in person.
            </p>
          </div>

          <div className={styles.expectations}>
            <h2 className={styles.expectationsTitle}>What to Expect</h2>
            <div className={styles.expectationGrid}>
              {expectations.map((item) => (
                <article className={styles.expectationCard} key={item.title}>
                  <Image
                    src={item.icon}
                    alt=""
                    width={item.width}
                    height={item.height}
                    className={styles.expectationIcon}
                  />
                  <h3 className={styles.expectationTitle}>{item.title}</h3>
                  <p className={styles.expectationDescription}>
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.venueSection} aria-labelledby="find-venue">
        <div className={styles.venueContent}>
          <div className={styles.venueCopy}>
            <h2 className={styles.venueTitle} id="find-venue">
              Find the Venue
            </h2>
            <p className={styles.venueDescription}>
              Find the event location and get directions to reach us with ease.
            </p>
            <a
              className={styles.directionsButton}
              href="https://www.google.com/maps/dir/?api=1&destination=Dubai+World+Trade+Centre%2C+Dubai%2C+UAE"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Direction
            </a>
          </div>
          <div className={styles.venueMap}>
            <iframe
              title="Dubai World Trade Centre location map"
              src="https://maps.google.com/maps?q=Dubai%20World%20Trade%20Centre%2C%20Dubai%2C%20UAE&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </HomeAnimations>
  );
}
