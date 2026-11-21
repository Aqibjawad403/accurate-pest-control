import Link from "next/link";
import type { Metadata } from "next";
import HomeAnimations from "@/components/HomeAnimations";
import InsightsSection from "@/components/InsightsSection";
import styles from "./BlogPage.module.css";

export const metadata: Metadata = {
  title: "Blogs | Accurate Pest Control Services LLC",
  description:
    "Practical pest control tips and insights for a pest-free home and business.",
};

const posts = [
  {
    title: "Effective Ways to Keep Your Home Pest-Free",
    href: "/blog/keep-home-pest-free",
    image: "",
  },
  {
    title: "Why Regular Pest Control Matters for Businesses",
    href: "/blog/pest-control-for-businesses",
    image: "",
  },
  {
    title: "Understanding Integrated Pest Management (IPM)",
    href: "/blog/understanding-ipm",
    image: "",
  },
  {
    title: "Effective Ways to Keep Your Home Pest-Free",
    href: "/blog/keep-home-pest-free",
    image: "",
  },
  {
    title: "Why Regular Pest Control Matters for Businesses",
    href: "/blog/pest-control-for-businesses",
    image: "",
  },
  {
    title: "Understanding Integrated Pest Management (IPM)",
    href: "/blog/understanding-ipm",
    image: "",
  },
];

export default function BlogPage() {
  return (
    <HomeAnimations>
      <section className={styles.hero} data-gsap-section="hero">
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle} data-gsap-split>
            Blogs
          </h1>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span aria-hidden="true">&gt;</span>
            <span aria-current="page">Blogs</span>
          </nav>
        </div>
      </section>
      <InsightsSection posts={posts} showBadge={false} pageVariant />
    </HomeAnimations>
  );
}
