"use client";

import FormStatusMessage from "@/components/FormStatusMessage";
import { useMailForm } from "@/hooks/useMailForm";
import styles from "@/app/contact/ContactPage.module.css";

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

const pestTypes = ["Residential", "Commercial", "Industrial", "Other"];

export default function ContactPageForm() {
  const { status, isSubmitting, handleSubmit, clearStatus } = useMailForm({
    subject: "Website Contact Request",
  });

  return (
    <section className={styles.formCard} aria-labelledby="contact-form-heading">
      <h2 className={styles.formHeading} id="contact-form-heading">
        Get in Touch
      </h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="hidden" name="_honey" value="" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_subject" value="Website Contact Request" />
        <div className={styles.fields}>
          <label className={styles.field}>
            <span>First Name</span>
            <input
              name="First Name"
              type="text"
              placeholder="First Name"
              required
            />
          </label>
          <label className={styles.field}>
            <span>Last Name</span>
            <input
              name="Last Name"
              type="text"
              placeholder="Last Name"
              required
            />
          </label>
          <label className={styles.field}>
            <span>Phone No.</span>
            <input
              name="Phone Number"
              type="tel"
              placeholder="Phone No"
              autoComplete="tel"
              required
            />
          </label>
          <label className={styles.field}>
            <span>Email Address</span>
            <input
              name="Email Address"
              type="email"
              placeholder="Email Address"
              autoComplete="email"
              required
            />
          </label>
          <label className={styles.field}>
            <span>Select Pest Concern</span>
            <select name="Pest Concern" defaultValue="" required>
              <option value="" disabled>
                Select...
              </option>
              {pestConcerns.map((concern) => (
                <option key={concern} value={concern}>
                  {concern}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            <span>Select Pest Type</span>
            <select name="Pest Type" defaultValue="" required>
              <option value="" disabled>
                Select...
              </option>
              {pestTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label className={`${styles.field} ${styles.messageField}`}>
            <span>Message</span>
            <textarea
              name="Message"
              placeholder="Write your message"
              required
            />
          </label>
        </div>
        <button
          className={styles.submitButton}
          type="submit"
          disabled={isSubmitting}
        >
          <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
          <span className={styles.submitArrow} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </span>
        </button>
        <FormStatusMessage status={status} onClear={clearStatus} />
      </form>
    </section>
  );
}
