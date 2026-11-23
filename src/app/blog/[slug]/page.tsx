import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import BannerMedia, { bannerImages } from "@/components/BannerMedia";
import {
  BlogInspectionForm,
  BlogReplyForm,
} from "@/components/BlogMailForms";
import HomeAnimations from "@/components/HomeAnimations";
import Navbar from "@/components/Navbar";
import {
  blogCategories,
  blogTags,
  getBlogPost,
  getRecentBlogPosts,
  blogPosts,
  type BlogSection,
  type BlogSubsection,
} from "@/data/blogs";
import styles from "./BlogPostPage.module.css";

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: "Blog | Accurate Pest Control Services LLC" };
  }

  return {
    title: `${post.title} | Accurate Pest Control Services LLC`,
    description: post.excerpt,
  };
}

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function SectionImages({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  if (!images?.length) return null;
  return (
    <>
      {images.map((image) => (
        <div key={image.src} className={`${styles.inlineFrame} image-zoom`}>
          <Image
            className={styles.inlineImage}
            src={image.src}
            alt={image.alt || ""}
            width={865}
            height={420}
          />
        </div>
      ))}
    </>
  );
}

function SubsectionBlock({ subsection }: { subsection: BlogSubsection }) {
  return (
    <div className={styles.subsection} id={subsection.id}>
      <h3>{subsection.title}</h3>
      <SectionImages images={subsection.images} />
      {subsection.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {subsection.bullets.length > 0 && (
        <ul>
          {subsection.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SectionBlock({
  section,
  index,
}: {
  section: BlogSection;
  index: number;
}) {
  return (
    <section className={styles.articleSection} id={section.id}>
      <h2>
        {/^\d+\.|^tip\s*\d+/i.test(section.title)
          ? section.title
          : `${index + 1}. ${section.title}`}
      </h2>
      <SectionImages images={section.images} />
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets.length > 0 && (
        <ul>
          {section.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
      {section.subsections.map((subsection) => (
        <SubsectionBlock key={subsection.id} subsection={subsection} />
      ))}
    </section>
  );
}

async function BlogPostContent({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const recentPosts = getRecentBlogPosts(post.slug, 5);
  const toc = post.toc.length
    ? post.toc
    : post.sections.map((section) => ({
        id: section.id,
        title: section.title,
      }));

  return (
    <HomeAnimations>
      <section
        className="relative w-full pt-5 has-[#mobile-navigation-menu]:z-[100]"
        data-gsap-section="hero"
      >
        <div
          className="relative h-[420px] w-full overflow-visible rounded-[28px] bg-[#005F13] max-sm:h-auto max-sm:pb-8 sm:rounded-[40px]"
          data-gsap-hero="shell"
        >
          <BannerMedia
            src={bannerImages.blog}
            alt="Pest control blog and insights"
            priority
          />
          <div className="relative z-30" data-gsap-hero="nav">
            <Navbar activeHref="/blog" />
          </div>
          <div className="hidden h-[120px] max-sm:block" aria-hidden="true" />

          <div
            className="absolute top-[270px] right-16 left-16 z-10 text-white max-sm:relative max-sm:top-auto max-sm:right-auto max-sm:left-auto max-sm:px-6"
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
              <Link
                href="/blog"
                className="transition-opacity hover:opacity-80"
              >
                Blogs
              </Link>
              <span aria-hidden="true"> &gt; </span>
              <span aria-current="page">{post.cardTitle}</span>
            </p>
          </div>
        </div>
      </section>

      <main className={styles.page}>
        <div className={styles.columns}>
          <div className={styles.mainColumn}>
            <article>
              <div className={`${styles.featuredFrame} image-zoom`}>
                <Image
                  className={styles.featuredImage}
                  src={post.featuredImage || post.image}
                  alt={post.imageAlt || post.title}
                  width={865}
                  height={300}
                  priority
                />
              </div>
              <p className={styles.date}>{post.date}</p>
              <nav className={styles.contents} aria-labelledby="contents-title">
                <h2 id="contents-title">Table of Content</h2>
                <ol>
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`}>{item.title}</a>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className={styles.articleBody}>
                <h2 className={styles.articleTitle}>{post.title}</h2>
                <p>{post.intro}</p>
                {(() => {
                  let sectionNumber = 0;
                  return post.sections.map((section) => {
                    const isIntro = /^intro/i.test(section.id);
                    if (isIntro) {
                      // Intro copy is already shown above; keep subsections + anchor.
                      return (
                        <section
                          className={styles.articleSection}
                          id={section.id}
                          key={section.id}
                        >
                          <SectionImages images={section.images} />
                          {section.subsections.map((subsection) => (
                            <SubsectionBlock
                              key={subsection.id}
                              subsection={subsection}
                            />
                          ))}
                        </section>
                      );
                    }

                    const index = sectionNumber;
                    sectionNumber += 1;
                    return (
                      <SectionBlock
                        key={section.id}
                        section={section}
                        index={index}
                      />
                    );
                  });
                })()}
              </div>
            </article>

            <section className={styles.reply} aria-labelledby="reply-title">
              <h2 id="reply-title">Leave a Reply</h2>
              <p>
                Your email address will not be published. Required fields are
                marked.
              </p>
              <BlogReplyForm />
            </section>
          </div>

          <aside className={styles.sidebar} aria-label="Blog sidebar">
            <form className={styles.search} action="/blog" role="search">
              <label className={styles.visuallyHidden} htmlFor="blog-search">
                Search blog posts
              </label>
              <input
                id="blog-search"
                type="search"
                name="q"
                placeholder="Search..."
              />
              <button type="submit" aria-label="Search">
                <Image src="/search.svg" alt="" width={22} height={22} />
              </button>
            </form>

            <section className={styles.inspection}>
              <h2>Get a Free Inspection</h2>
              <BlogInspectionForm categories={blogCategories} />
            </section>

            <section className={styles.widget}>
              <h2 className={styles.widgetTitle}>Recent Posts</h2>
              <ul className={styles.recentPosts}>
                {recentPosts.map((recentPost) => (
                  <li key={recentPost.slug}>
                    <Link href={`/blog/${recentPost.slug}`}>
                      <span className={`${styles.recentThumb} image-zoom`}>
                        <Image
                          src={recentPost.image}
                          alt=""
                          width={96}
                          height={72}
                        />
                      </span>
                      <span>
                        <strong>{recentPost.cardTitle}</strong>
                        <small>{recentPost.date}</small>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.widget}>
              <h2 className={styles.widgetTitle}>Categories</h2>
              <ul className={styles.categoryList}>
                {blogCategories.map((category) => (
                  <li key={category}>
                    <span>{category}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.widget}>
              <h2 className={styles.widgetTitle}>Tags</h2>
              <div className={styles.tags}>
                {blogTags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </HomeAnimations>
  );
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <Suspense
      fallback={
        <main className={styles.page}>
          <p className={styles.loadingState} role="status">
            Loading blog post...
          </p>
        </main>
      }
    >
      <BlogPostContent params={params} />
    </Suspense>
  );
}
