import type { Metadata } from "next";
import { Suspense } from "react";
import BannerMedia, { bannerImages } from "@/components/BannerMedia";
import HomeAnimations from "@/components/HomeAnimations";
import Navbar from "@/components/Navbar";
import EventsContent from "./EventsContent";
import styles from "./EventsPage.module.css";

export const metadata: Metadata = {
  title: "Pest Control Events in UAE | Accurate Pest Control",
  description:
    "Stay updated on pest management events, training sessions, and exhibitions in the UAE.",
};

export default function EventsPage() {
  return (
    <HomeAnimations>
      <section
        className="relative w-full pt-5 has-[#mobile-navigation-menu]:z-[100]"
        data-gsap-section="hero"
      >
        <div className={styles.hero}>
          <BannerMedia
            src={bannerImages.events}
            alt="Industry conference and exhibition hall"
            priority
          />
          <div className="relative z-30" data-gsap-hero="nav">
            <Navbar activeHref="/events" />
          </div>
          <h1 className={`${styles.heroTitle} z-10`} data-gsap-split>
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
        <EventsContent />
      </Suspense>
    </HomeAnimations>
  );
}
