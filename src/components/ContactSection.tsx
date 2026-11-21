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

export default function ContactSection() {
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
        <p className={styles.description} data-gsap-copy>
          Looking for reliable pest control solutions? Our expert team is ready
          to help protect your home or business with professional and effective
          services across the UAE.
        </p>
      </div>

      <div className={styles.card} data-gsap-card>
        <h3 className={styles.formHeading}>Get in Touch</h3>
        <form
          className={styles.form}
          action="mailto:info@accuratepestcontrol.ae?subject=Website%20Contact%20Request"
          method="post"
          encType="text/plain"
        >
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
              <select id="contact-pest" name="Pest Concern" defaultValue="" required>
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

          <button className={styles.submitButton} type="submit">
            <span>Submit Now</span>
            <ArrowIcon />
          </button>
        </form>
      </div>
    </section>
  );
}
