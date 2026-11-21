import Link from "next/link";
import type { Metadata } from "next";
import HomeAnimations from "@/components/HomeAnimations";
import InsightsSection from "@/components/InsightsSection";
import Navbar from "@/components/Navbar";

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
      <section
        className="relative w-full pt-5 has-[#mobile-navigation-menu]:z-[100]"
        data-gsap-section="hero"
      >
        <div
          className="relative h-[420px] w-full rounded-[28px] bg-[#005F13] max-sm:h-auto max-sm:pb-8 sm:rounded-[40px]"
          data-gsap-hero="shell"
        >
          <div data-gsap-hero="nav">
            <Navbar activeHref="/blog" />
          </div>
          <div className="hidden h-[120px] max-sm:block" aria-hidden="true" />

          <div
            className="absolute top-[270px] right-16 left-16 text-white max-sm:relative max-sm:top-auto max-sm:right-auto max-sm:left-auto max-sm:px-6"
            data-gsap-hero="copy"
          >
            <h1
              className="text-[55px] leading-none font-bold max-sm:text-[36px]"
              data-gsap-split
            >
              Blogs
            </h1>
            <p className="mt-3 text-[18px] leading-[var(--line-height-normal)] font-normal max-sm:text-[15px]">
              <Link href="/" className="transition-opacity hover:opacity-80">
                Home
              </Link>
              <span aria-hidden="true"> &gt; </span>
              <span aria-current="page">Blogs</span>
            </p>
          </div>
        </div>
      </section>
      <InsightsSection posts={posts} showBadge={false} pageVariant />
    </HomeAnimations>
  );
}
