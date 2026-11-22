"use client";

import { useState, type FormEvent } from "react";
import {
  submitMailForm,
  type FormStatus,
} from "@/lib/send-mail";

type UseMailFormOptions = {
  subject?: string;
  onSuccess?: () => void;
};

export function useMailForm(options: UseMailFormOptions = {}) {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    try {
      await submitMailForm(form, {
        extras: options.subject ? { _subject: options.subject } : undefined,
      });
      form.reset();
      options.onSuccess?.();
      setStatus("sent");
    } catch (error) {
      console.error("Form submit failed:", error);
      setStatus("error");
    }
  }

  return {
    status,
    isSubmitting: status === "sending",
    handleSubmit,
    clearStatus: () => setStatus("idle"),
    setStatus,
  };
}
