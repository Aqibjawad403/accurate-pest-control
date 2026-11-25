"use client";

import FormStatusMessage from "@/components/FormStatusMessage";
import { useMailForm } from "@/hooks/useMailForm";
import styles from "@/app/blogs/[slug]/BlogPostPage.module.css";

type BlogMailFormsProps = {
  categories: string[];
};

export function BlogReplyForm() {
  const { status, isSubmitting, handleSubmit, clearStatus } = useMailForm({
    subject: "Blog comment",
  });

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="_honey" value="" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_subject" value="Blog comment" />
      <label htmlFor="comment">Comment</label>
      <textarea
        id="comment"
        name="Comment"
        placeholder="Write a comment..."
        required
      />
      <label htmlFor="comment-name">Name</label>
      <input
        id="comment-name"
        name="Name"
        placeholder="Name"
        autoComplete="name"
        required
      />
      <label htmlFor="comment-email">E-mail</label>
      <input
        id="comment-email"
        name="Email"
        type="email"
        placeholder="Email Address"
        autoComplete="email"
        required
      />
      <label htmlFor="comment-website">Website</label>
      <input
        id="comment-website"
        name="Website"
        type="url"
        placeholder="Website Link"
        autoComplete="url"
      />
      <label className={styles.remember}>
        <input type="checkbox" name="Remember details" value="yes" />
        Save my name, email, and website in this browser for the next time I
        comment.
      </label>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Submit"}
      </button>
      <FormStatusMessage status={status} onClear={clearStatus} />
    </form>
  );
}

export function BlogInspectionForm({ categories }: BlogMailFormsProps) {
  const { status, isSubmitting, handleSubmit, clearStatus } = useMailForm({
    subject: "Free Inspection Request",
  });

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="_honey" value="" />
      <input type="hidden" name="_captcha" value="false" />
      <input
        type="hidden"
        name="_subject"
        value="Free Inspection Request"
      />
      <label className={styles.visuallyHidden} htmlFor="inspection-pest">
        Select Pest Concern
      </label>
      <select id="inspection-pest" name="Pest Concern" defaultValue="">
        <option value="" disabled>
          Select Pest Concern
        </option>
        {categories.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </select>
      <label className={styles.visuallyHidden} htmlFor="inspection-name">
        Your Name
      </label>
      <input
        id="inspection-name"
        name="Name"
        placeholder="Your Name"
        autoComplete="name"
        required
      />
      <label className={styles.visuallyHidden} htmlFor="inspection-phone">
        Phone Number
      </label>
      <input
        id="inspection-phone"
        name="Phone"
        type="tel"
        placeholder="Number"
        autoComplete="tel"
        required
      />
      <label className={styles.visuallyHidden} htmlFor="inspection-email">
        Email Address
      </label>
      <input
        id="inspection-email"
        name="Email"
        type="email"
        placeholder="E-mail"
        autoComplete="email"
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Submit"}
      </button>
      <FormStatusMessage status={status} onClear={clearStatus} />
    </form>
  );
}
