"use client";

import Image from "next/image";
import { useRef, useState, type FormEvent } from "react";
import FormStatusMessage from "@/components/FormStatusMessage";
import { submitMailForm, type FormStatus } from "@/lib/send-mail";
import styles from "@/app/careers/CareersPage.module.css";

const positions = [
  "Pest Control Technician",
  "Sales Executive",
  "Operations",
  "Customer Service",
  "Other",
];

const experienceLevels = [
  "No experience",
  "1-2 years",
  "3-5 years",
  "6-10 years",
  "10+ years",
];

const MAX_RESUME_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx"]);

function getExtension(name: string) {
  const parts = name.split(".");
  return parts.length > 1 ? (parts.pop() || "").toLowerCase() : "";
}

export default function CareersForm() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  function onFileChange(file: File | null) {
    if (!file) {
      setResume(null);
      setFileError("");
      return;
    }

    if (!ALLOWED_EXTENSIONS.has(getExtension(file.name))) {
      setResume(null);
      setFileError("Please upload a PDF or DOCX file.");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    if (file.size > MAX_RESUME_BYTES) {
      setResume(null);
      setFileError("File must be 10 MB or smaller.");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    setFileError("");
    setResume(file);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!resume) {
      setFileError("Please upload your resume / CV.");
      return;
    }

    setStatus("sending");

    const firstName = String(
      new FormData(form).get("First_Name") || "",
    ).trim();
    const lastName = String(new FormData(form).get("Last_Name") || "").trim();
    const fullName = [firstName, lastName].filter(Boolean).join(" ");

    try {
      await submitMailForm(form, {
        extras: {
          Resume: resume,
          _subject: fullName
            ? `Career Application — ${fullName}`
            : "Career Application",
        },
      });
      form.reset();
      setResume(null);
      setFileError("");
      if (fileRef.current) fileRef.current.value = "";
      setStatus("sent");
    } catch (error) {
      console.error("Career application error:", error);
      setStatus("error");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input type="hidden" name="_honey" value="" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_subject" value="Career Application" />

      <div className={styles.fieldGrid}>
        <label className={styles.field}>
          <span className={styles.label}>First Name *</span>
          <input
            className={styles.input}
            type="text"
            name="First_Name"
            placeholder="First Name"
            required
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Last Name *</span>
          <input
            className={styles.input}
            type="text"
            name="Last_Name"
            placeholder="Last Name"
            required
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Phone Number *</span>
          <input
            className={styles.input}
            type="tel"
            name="Phone"
            placeholder="Phone No"
            required
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Email Address *</span>
          <input
            className={styles.input}
            type="email"
            name="Email"
            placeholder="E-mail"
            required
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Position of Interest *</span>
          <select
            className={`${styles.input} ${styles.select}`}
            name="Position"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select
            </option>
            {positions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Years of Experience *</span>
          <select
            className={`${styles.input} ${styles.select}`}
            name="Experience"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select
            </option>
            {experienceLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className={styles.resumeField}>
        <span className={styles.label}>Upload Your Resume / CV *</span>
        <span className={styles.uploadArea}>
          <Image
            src="/upload.svg"
            alt=""
            width={32}
            height={40}
            className={styles.uploadIcon}
          />
          <strong className={styles.uploadTitle}>
            {resume ? resume.name : "Upload Your Resume / CV"}
          </strong>
          <span className={styles.uploadHint}>
            PDF or DOCX, Maximum 10 MB
          </span>
          <input
            ref={fileRef}
            className={styles.fileInput}
            type="file"
            name="Resume"
            accept=".pdf,.doc,.docx"
            onChange={(event) =>
              onFileChange(event.target.files?.[0] ?? null)
            }
          />
        </span>
      </label>
      {fileError ? (
        <p className="mt-2 text-sm font-semibold text-red-600" role="alert">
          {fileError}
        </p>
      ) : null}

      <label className={styles.field}>
        <span className={styles.label}>Short Introduction (Optional)</span>
        <textarea
          className={styles.textarea}
          name="Introduction"
          placeholder="Tell us a little about yourself..."
          rows={5}
        />
      </label>

      <button
        className={styles.submitButton}
        type="submit"
        disabled={status === "sending"}
      >
        <span>
          {status === "sending" ? "Sending..." : "Submit Application"}
        </span>
        <span className={styles.submitArrow} aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </span>
      </button>
      <FormStatusMessage
        status={status}
        onClear={() => setStatus("idle")}
      />
    </form>
  );
}
