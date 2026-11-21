import Link from "next/link";
import { ArrowDot } from "@/components/ArrowButton";
import styles from "./InsightsSection.module.css";

type Post = {
  title: string;
  href: string;
  image: string;
};

type InsightCardProps = Post;

const POSTS: Post[] = [
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

export function InsightCard({ title, href, image }: InsightCardProps) {
  return (
    <article
      className={styles.card}
      style={image ? { backgroundImage: `url(${image})` } : undefined}
      data-gsap-card
    >
      <h3 className={styles.cardTitle}>{title}</h3>
      <hr className={styles.line} />
      <Link href={href} className={styles.readMore}>
        Read More
        <ArrowDot variant="white" size="sm" />
      </Link>
    </article>
  );
}

export default function InsightsSection({
  posts = POSTS,
  showBadge = true,
  pageVariant = false,
}: {
  posts?: Post[];
  showBadge?: boolean;
  pageVariant?: boolean;
}) {
  return (
    <section
      className={`${styles.section} ${pageVariant ? styles.pageVariant : ""}`}
    >
      {showBadge && (
        <span className={styles.badge} data-gsap-badge>
          Insights
        </span>
      )}
      <h2 className={styles.heading} data-gsap-split>
        Insights &amp; Tips for a <br className={styles.br} />
        Pest-Free Environment
      </h2>

      <div className={styles.grid}>
        {posts.map((post, index) => (
          <InsightCard key={`${post.href}-${index}`} {...post} />
        ))}
      </div>
    </section>
  );
}
