"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./EventsPage.module.css";

function parseDate(value: string) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return "";

  const isoDate = `${match[3]}-${match[2]}-${match[1]}`;
  const date = new Date(`${isoDate}T00:00:00.000Z`);

  return Number.isNaN(date.getTime()) ||
    date.toISOString().slice(0, 10) !== isoDate
    ? ""
    : isoDate;
}

function formatDate(value: string) {
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

export default function EventDateFilter({
  defaultValue,
}: {
  defaultValue: string;
}) {
  const datePickerRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState(defaultValue);
  const [dateText, setDateText] = useState(
    defaultValue ? formatDate(defaultValue) : "",
  );

  return (
    <div className={styles.dateField}>
      <input
        aria-label="Select event date"
        className={styles.dateInput}
        id="event-date"
        inputMode="numeric"
        name="date"
        onChange={(event) => {
          setDateText(event.target.value);
          setDate(parseDate(event.target.value));
        }}
        pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}"
        placeholder="DD/MM/YYYY"
        type="text"
        value={dateText}
      />
      <button
        aria-label="Open date picker"
        className={styles.datePickerButton}
        onClick={() => datePickerRef.current?.showPicker()}
        type="button"
      >
        <Image
          alt=""
          className={styles.datePickerIcon}
          height={21}
          src="/events/calander.svg"
          width={26}
        />
      </button>
      <input
        aria-hidden="true"
        className={styles.nativeDateInput}
        onChange={(event) => {
          const value = event.target.value;
          setDate(value);
          setDateText(value ? formatDate(value) : "");
        }}
        ref={datePickerRef}
        tabIndex={-1}
        type="date"
        value={date}
      />
    </div>
  );
}
