export const SEND_MAIL_URL = "/send-mail.php";
export const MAIL_TO = "info@accuratepestcontrol.ae";

export type FormStatus = "idle" | "sending" | "sent" | "error";

type SubmitMailFormOptions = {
  extras?: Record<string, string | Blob | null | undefined>;
};

export async function submitMailForm(
  form: HTMLFormElement | FormData,
  options: SubmitMailFormOptions = {},
): Promise<{ ok: true; message?: string }> {
  const body = form instanceof FormData ? form : new FormData(form);

  if (!body.has("_honey")) {
    body.set("_honey", "");
  }

  if (!body.has("_captcha")) {
    body.set("_captcha", "false");
  }

  if (options.extras) {
    for (const [key, value] of Object.entries(options.extras)) {
      if (value == null || value === "") continue;
      body.set(key, value);
    }
  }

  const response = await fetch(SEND_MAIL_URL, {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  });

  let payload: { ok?: boolean; error?: string; message?: string } | null = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok || !payload || payload.ok !== true) {
    throw new Error(payload?.error || `Form failed (${response.status})`);
  }

  return { ok: true, message: payload.message };
}
