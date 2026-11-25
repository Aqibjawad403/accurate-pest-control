"use client";

import Image from "next/image";
import FormStatusMessage from "@/components/FormStatusMessage";
import { useMailForm } from "@/hooks/useMailForm";
import styles from "./ContactSection.module.css";

const pestConcerns = [
  "Ants",
  "Cockroaches",
  "Bed Bugs",
  "Rodents",
  "Flies",
  "Mosquitoes",
  "Spiders",
  "Termites",
  "Birds",
  "Other",
];

const propertyTypes = ["Residential", "Commercial", "Industrial", "Other"];

const highlights = [
  "Same-day inspection slots across Dubai & the UAE",
  "Licensed technicians for homes, offices & industrial sites",
  "Safe treatments with clear follow-up and prevention tips",
];

const contactLinks = [
  {
    label: "Call",
    detail: "+971 52 449 6173",
    href: "tel:+971524496173",
    icon: "/call.svg",
  },
  {
    label: "Email",
    detail: "info@accuratepestcontrol.ae",
    href: "mailto:info@accuratepestcontrol.ae",
    icon: "/email.svg",
  },
];

function ChevronIcon() {
  return (
    <svg viewBox="0 0 12 8" aria-hidden="true">
      <path
        d="m1 1.5 5 5 5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <span className={styles.buttonArrow} aria-hidden="true">
      <svg viewBox="0 0 12 12">
        <path
          d="M2.5 9.5 9 3m0 0H3.5M9 3v5.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3.5 8.5 6.5 11.5 12.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactSection() {
  const { status, isSubmitting, handleSubmit, clearStatus } = useMailForm({
    subject: "Website Contact Request",
  });

  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-section-heading"
    >
      <div className={styles.copy}>
        <span className={styles.badge} data-gsap-badge>
          Contact Us
        </span>
        <h2
          className={styles.heading}
          id="contact-section-heading"
          data-gsap-split
        >
          Let&apos;s Make Your Space
          <br />
          Pest-Free
        </h2>
        <div className={styles.copyBody} data-gsap-copy>
          <p className={styles.description}>
            Looking for reliable pest control solutions? Our expert team is
            ready to help protect your home or business with professional and
            effective services across the UAE. Tell us what you&apos;re dealing
            with and we&apos;ll get back with a clear next step.
          </p>

          <ul className={styles.highlights}>
            {highlights.map((item) => (
              <li key={item}>
                <span className={styles.highlightIcon}>
                  <CheckIcon />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <a
            className={styles.whatsappBar}
            href="https://wa.me/9718008725"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp +971 800 8725"
          >
            <span className={styles.whatsappIcon}>
              <Image src="/whastapp.svg" alt="" width={22} height={22} />
            </span>
            <span>+971 800 8725</span>
          </a>

          <div className={styles.contactLinks}>
            {contactLinks.map((link) => (
              <a
                key={link.label}
                className={styles.contactLink}
                href={link.href}
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <span className={styles.contactIcon}>
                  <Image
                    src={link.icon}
                    alt=""
                    width={20}
                    height={20}
                  />
                </span>
                <span className={styles.contactText}>
                  <span className={styles.contactLabel}>{link.label}</span>
                  <span className={styles.contactDetail}>{link.detail}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.card} data-gsap-card>
        <h3 className={styles.formHeading}>Get in Touch</h3>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="hidden" name="_honey" value="" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="Website Contact Request" />
          <input type="hidden" name="Country Code" value="+971" />
          <div className={styles.fields}>
            <label className={styles.visuallyHidden} htmlFor="contact-name">
              Full Name
            </label>
            <input
              className={styles.control}
              id="contact-name"
              name="Full Name"
              type="text"
              placeholder="Full Name"
              autoComplete="name"
              required
            />

            <label className={styles.visuallyHidden} htmlFor="contact-phone">
              Phone Number
            </label>
            <div className={styles.phoneControl}>
              <span className={styles.countryCode} aria-hidden="true">
                🇦🇪
                <span>+971</span>
                <ChevronIcon />
              </span>
              <input
                id="contact-phone"
                name="Phone Number"
                type="tel"
                placeholder="Phone No."
                autoComplete="tel"
                required
              />
            </div>

            <label className={styles.visuallyHidden} htmlFor="contact-pest">
              Pest Concern
            </label>
            <div className={styles.selectControl}>
              <select
                id="contact-pest"
                name="Pest Concern"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select Pest Concern
                </option>
                {pestConcerns.map((concern) => (
                  <option key={concern} value={concern}>
                    {concern}
                  </option>
                ))}
              </select>
              <ChevronIcon />
            </div>

            <label className={styles.visuallyHidden} htmlFor="contact-property">
              Property Type
            </label>
            <div className={styles.selectControl}>
              <select
                id="contact-property"
                name="Property Type"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select Property Type
                </option>
                {propertyTypes.map((propertyType) => (
                  <option key={propertyType} value={propertyType}>
                    {propertyType}
                  </option>
                ))}
              </select>
              <ChevronIcon />
            </div>

            <label className={styles.visuallyHidden} htmlFor="contact-message">
              Message
            </label>
            <textarea
              className={`${styles.control} ${styles.message}`}
              id="contact-message"
              name="Message"
              placeholder="Write a Message..."
              required
            />
          </div>

          <button
            className={styles.submitButton}
            type="submit"
            disabled={isSubmitting}
          >
            <span>{isSubmitting ? "Sending..." : "Submit Now"}</span>
            <ArrowIcon />
          </button>
          <FormStatusMessage status={status} onClear={clearStatus} />
        </form>
      </div>
    </section>
  );
}
