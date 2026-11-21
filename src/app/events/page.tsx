import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import HomeAnimations from "@/components/HomeAnimations";
import Navbar from "@/components/Navbar";
import EventDateFilter from "./EventDateFilter";
import styles from "./EventsPage.module.css";

export const metadata: Metadata = {
  title: "Pest Control Events in UAE | Accurate Pest Control",
  description:
    "Stay updated on pest management events, training sessions, and exhibitions in the UAE.",
};

type Event = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
};

const event: Event = {
  title: "Pest Control Exhibition at Big 5 Global 2026",
  description:
    "Meet us at Big 5 Global 2026 in Dubai for pest control solutions, services, and expert industry advice.",
  startDate: "2026-11-23",
  endDate: "2026-11-26",
  location: "Dubai World Trade Centre, Dubai, UAE.",
};

const eventDetails = [
  {
    icon: "/events/calander.svg",
    iconWidth: 26,
    iconHeight: 21,
    label: "Event date",
    value: "November 23 – 26, 2026",
  },
  {
    icon: "/events/clock.svg",
    iconWidth: 24,
    iconHeight: 24,
    label: "Event time",
    value: "10:00 AM – 6:00 PM",
  },
  {
    icon: "/events/location_on.svg",
    iconWidth: 19,
    iconHeight: 24,
    label: "Location",
    value: event.location,
  },
];

type EventSearchParams = {
  search?: string | string[];
  location?: string | string[];
  date?: string | string[];
};

function parseDateFilter(value: string) {
  const displayDate = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  const isoDate = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? value
    : displayDate
      ? `${displayDate[3]}-${displayDate[2]}-${displayDate[1]}`
      : "";

  if (!isoDate) return null;

  const parsedDate = new Date(`${isoDate}T00:00:00.000Z`);
  if (
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.toISOString().slice(0, 10) !== isoDate
  ) {
    return null;
  }

  return isoDate;
}

export default function EventsPage({
  searchParams,
}: {
  searchParams: Promise<EventSearchParams>;
}) {
  return (
    <HomeAnimations>
      <section
        className="relative w-full pt-5 has-[#mobile-navigation-menu]:z-[100]"
        data-gsap-section="hero"
      >
        <div className={styles.hero}>
          <div data-gsap-hero="nav">
            <Navbar activeHref="/events" />
          </div>
          <h1 className={styles.heroTitle} data-gsap-split>
            Pest Control Events in UAE
          </h1>
        </div>
      </section>
      <Suspense
        fallback={
          <p className={styles.loadingState} role="status">
            Loading events...
          </p>
        }
      >
        <EventsContent searchParams={searchParams} />
      </Suspense>
    </HomeAnimations>
  );
}

async function EventsContent({
  searchParams,
}: {
  searchParams: Promise<EventSearchParams>;
}) {
  const filters = await searchParams;
  const search = typeof filters.search === "string" ? filters.search.trim() : "";
  const location =
    typeof filters.location === "string" ? filters.location : "";
  const submittedDate = typeof filters.date === "string" ? filters.date : "";
  const date = submittedDate ? parseDateFilter(submittedDate) : null;
  const matchesSearch =
    !search ||
    `${event.title} ${event.description} ${event.location}`
      .toLowerCase()
      .includes(search.toLowerCase());
  const matchesLocation = !location || event.location.includes(location);
  const matchesDate =
    !submittedDate ||
    (date !== null && date >= event.startDate && date <= event.endDate);

  return (
    <section className={styles.content} aria-labelledby="upcoming-events">
        <form className={styles.searchBar} action="/events" method="get" role="search">
          <div className={styles.searchFields}>
            <label className={styles.visuallyHidden} htmlFor="event-search">
              Search events
            </label>
            <input
              className={styles.searchInput}
              id="event-search"
              name="search"
              type="search"
              placeholder="Search Event"
              defaultValue={search}
            />
            <span className={styles.searchDivider} aria-hidden="true" />
            <label className={styles.visuallyHidden} htmlFor="event-location">
              Select event location
            </label>
            <select
              className={`${styles.locationSelect} ${location ? styles.selectedFilter : ""}`}
              id="event-location"
              name="location"
              defaultValue={location}
            >
              <option value="">Select Location</option>
              <option value="Dubai, UAE">Dubai, UAE</option>
            </select>
            <span className={styles.searchDivider} aria-hidden="true" />
            <EventDateFilter defaultValue={date ?? ""} />
          </div>
          <button className={styles.searchButton} type="submit">
            Search
          </button>
        </form>

        <div className={styles.intro}>
          <h2 className={styles.sectionTitle} id="upcoming-events">
            Upcoming Pest Control Events and Exhibitions in UAE
          </h2>
          <p className={styles.introText}>
            Stay updated on our upcoming pest management events in UAE: training
            sessions, industry exhibitions, and awareness campaigns showcasing
            pest control solutions for safer spaces.
          </p>
        </div>

        {matchesSearch && matchesLocation && matchesDate ? (
          <article className={styles.event} id="event-details">
            <div className={`${styles.eventImage} image-zoom`}>
              <Image
                className={styles.eventImagePhoto}
                src="/events/event.svg"
                alt="Pest control event exhibition"
                width={1312}
                height={559}
                loading="eager"
              />
            </div>
            <div className={styles.eventInfo}>
              <h3 className={styles.eventTitle}>{event.title}</h3>
              <p className={styles.eventDescription}>{event.description}</p>

              <ul className={styles.eventDetails}>
                {eventDetails.map((detail) => (
                  <li className={styles.detail} key={detail.label}>
                    <span className={styles.detailIcon}>
                      <Image
                        src={detail.icon}
                        alt=""
                        width={detail.iconWidth}
                        height={detail.iconHeight}
                      />
                    </span>
                    <span className={styles.detailCopy}>
                      <span className={styles.detailLabel}>{detail.label}</span>
                      <span className={styles.detailValue}>{detail.value}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                className={styles.detailsButton}
                href="/events/big-5-global-2026"
              >
                <span>View Event Details</span>
                <Image
                  src="/arrow-white.svg"
                  alt=""
                  width={12}
                  height={11}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </article>
        ) : (
          <p className={styles.emptyState} role="status">
            No events match your search. Try another keyword or date.
          </p>
        )}
    </section>
  );
}
