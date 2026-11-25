import Link from "next/link";
import { ArrowDot } from "@/components/ArrowButton";
import { getBlogListingPosts } from "@/data/blogs";
import styles from "./InsightsSection.module.css";

type Post = {
  title: string;
  href: string;
  image: string;
};

type InsightCardProps = Post;

const POSTS: Post[] = getBlogListingPosts().slice(0, 3);

export function InsightCard({ title, href, image }: InsightCardProps) {
  return (
    <article
      className={styles.card}
      style={image ? { backgroundImage: `url("${image}")` } : undefined}
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
  pageVariant = false,
}: {
  posts?: Post[];
  pageVariant?: boolean;
}) {
  return (
    <section
      className={`${styles.section} ${pageVariant ? styles.pageVariant : ""}`}
    >
      <div className={styles.grid}>
        {posts.map((post, index) => (
          <InsightCard key={`${post.href}-${index}`} {...post} />
        ))}
      </div>
    </section>
  );
}
