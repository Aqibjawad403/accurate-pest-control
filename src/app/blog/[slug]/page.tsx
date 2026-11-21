import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import HomeAnimations from "@/components/HomeAnimations";
import Navbar from "@/components/Navbar";
import styles from "./BlogPostPage.module.css";

const featuredImage =
  "/pests/ants/Professional_Exterminator_Performing_Home_Kitchen_Pest_Control-B5-y8AKB.webp";

const posts = [
  {
    slug: "keep-home-pest-free",
    cardTitle: "Effective Ways to Keep Your Home Pest-Free",
    title: "5 Eco-Friendly Pest Control Methods You Should Know About",
    date: "01/12/2022",
    image: featuredImage,
    intro:
      "Pests can cause serious damage to your home and affect your family’s health. The good news is that many everyday prevention steps and lower-impact treatments can help keep them away. Start by removing food and water sources, sealing entry points, and choosing targeted solutions when needed.",
  },
  {
    slug: "pest-control-for-businesses",
    cardTitle: "Why Regular Pest Control Matters for Businesses",
    title: "Why Regular Pest Control Matters for Businesses",
    date: "14/06/2023",
    image: "/pests/fumigation/Professional_Fumigation_Service_in_Action.webp",
    intro:
      "A consistent pest prevention plan helps protect staff, customers, stock, and the reputation of your business. Regular inspections can identify small issues early, before they interrupt day-to-day operations or create avoidable health concerns.",
  },
  {
    slug: "understanding-ipm",
    cardTitle: "Understanding Integrated Pest Management (IPM)",
    title: "Understanding Integrated Pest Management (IPM)",
    date: "08/09/2023",
    image: "/pests/termites/Termite_Exterminator_Inspecting_Home_Furniture_in_Dubai-Dyk-uWQP.webp",
    intro:
      "Integrated Pest Management combines inspection, prevention, monitoring, and carefully selected treatments. This practical approach focuses on the source of a pest problem and helps reduce unnecessary pesticide use.",
  },
];

type ArticleSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

const articleSections: ArticleSection[] = [
  {
    id: "keep-it-clean",
    title: "Keep It Clean: Prevention Is Key",
    paragraphs: [
      "A clean home gives pests fewer places to find food and shelter. Wipe kitchen surfaces after preparing food, store pantry items in sealed containers, and take rubbish out regularly.",
      "Pay extra attention to areas that are easy to overlook, such as under appliances, inside cupboards, and around pet food bowls.",
    ],
    bullets: [
      "Clean up crumbs and spills as soon as possible.",
      "Keep food in airtight containers and empty bins often.",
      "Fix leaks and remove standing water.",
    ],
  },
  {
    id: "seal-entry-points",
    title: "Seal Entry Points",
    paragraphs: [
      "Small gaps around doors, windows, pipes, and vents can provide pests with an easy way inside. Inspect these areas and seal openings with suitable weather stripping or caulk.",
    ],
    bullets: [
      "Repair damaged window screens and door sweeps.",
      "Seal gaps around utility lines and plumbing.",
      "Keep drains covered when they are not in use.",
    ],
  },
  {
    id: "natural-repellents",
    title: "Use Natural Repellents",
    paragraphs: [
      "Some plant-based scents can discourage common insects in specific areas. Use these products according to their labels, and keep them away from children, pets, and food-preparation surfaces.",
    ],
    bullets: [
      "Use only products that are suitable for the intended pest.",
      "Test products on a small area before wider use.",
      "Do not mix household chemicals or apply them off-label.",
    ],
  },
  {
    id: "biological-control",
    title: "Try Biological Pest Control",
    paragraphs: [
      "In outdoor spaces, beneficial insects and other natural predators can help keep pest populations in balance. Choose methods suited to your plants and local environment, and seek professional advice if the problem persists.",
    ],
  },
  {
    id: "eco-friendly-professionals",
    title: "Hire Eco-Friendly Pest Control Professionals",
    paragraphs: [
      "When prevention is not enough, a qualified pest control professional can identify the source of the problem and recommend an appropriate treatment plan. Ask about the products used, preparation requirements, and steps to prevent pests from returning.",
      "A targeted, professionally managed approach can help protect your home while avoiding unnecessary treatment.",
    ],
  },
];

const businessSections: ArticleSection[] = [
  {
    id: "routine-inspections",
    title: "Schedule Routine Inspections",
    paragraphs: [
      "Regular inspections help teams catch signs of pest activity before they become larger problems. Focus on kitchens, storage rooms, loading bays, and other areas where food or waste may collect.",
    ],
  },
  {
    id: "protect-staff-customers",
    title: "Protect Staff and Customers",
    paragraphs: [
      "A clean, pest-free environment supports the comfort and wellbeing of everyone who visits or works at your premises. Clear reporting steps help staff flag concerns early.",
    ],
  },
  {
    id: "prevent-disruption",
    title: "Prevent Costly Disruptions",
    paragraphs: [
      "Early treatment can reduce the likelihood of stock damage, closures, and emergency callouts. Keep a record of inspections and maintenance to spot recurring issues.",
    ],
  },
  {
    id: "maintain-hygiene",
    title: "Maintain Hygiene Standards",
    paragraphs: [
      "Good waste handling, sealed food storage, and prompt repairs make your pest control plan more effective and help maintain a hygienic workplace.",
    ],
  },
  {
    id: "choose-professionals",
    title: "Work With Pest Control Professionals",
    paragraphs: [
      "A qualified provider can tailor visits to your premises, explain recommended treatments, and help your team prevent future activity.",
    ],
  },
];

const ipmSections: ArticleSection[] = [
  {
    id: "inspect-identify",
    title: "Inspect and Identify",
    paragraphs: [
      "Start by inspecting the affected area and identifying the pest correctly. Knowing where pests are active and how they enter helps determine the right response.",
    ],
  },
  {
    id: "prevent-activity",
    title: "Prevent Pest Activity",
    paragraphs: [
      "Reduce access to food, water, and shelter. Seal entry points, improve sanitation, and make repairs that remove the conditions pests need to thrive.",
    ],
  },
  {
    id: "monitor-results",
    title: "Monitor Results",
    paragraphs: [
      "Use regular checks and monitoring tools to understand whether pest activity is increasing or declining. Keep notes so changes can be measured over time.",
    ],
  },
  {
    id: "targeted-treatment",
    title: "Choose Targeted Treatments",
    paragraphs: [
      "If treatment is needed, choose an approach that targets the identified pest and affected area. Follow product instructions and avoid unnecessary broad applications.",
    ],
  },
  {
    id: "review-plan",
    title: "Review and Improve the Plan",
    paragraphs: [
      "Review inspection notes and treatment results, then adjust prevention steps as needed. A consistent cycle of assessment and follow-up helps keep pest management effective.",
    ],
  },
];

const categories = [
  "Ants",
  "Cockroaches",
  "Bed Bugs",
  "Rodents",
  "Flies",
  "Mosquitoes",
  "Spiders",
  "Termites",
  "Birds",
  "Fumigation",
];

const tags = [
  "Ants",
  "Cockroaches",
  "Bed Bugs",
  "Rodents",
  "Flies",
  "Mosquitoes",
  "Spiders",
  "Termites",
  "Venomous",
  "Birds",
];

function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: "Blog | Accurate Pest Control Services LLC" };
  }

  return {
    title: `${post.title} | Accurate Pest Control Services LLC`,
    description: post.intro,
  };
}

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

async function BlogPostContent({
  params,
}: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const sections =
    post.slug === "pest-control-for-businesses"
      ? businessSections
      : post.slug === "understanding-ipm"
        ? ipmSections
        : articleSections;
  const recentPosts = [...posts.filter((item) => item.slug !== post.slug), ...posts]
    .slice(0, 5);

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
                src={post.image}
                alt="Pest control professional treating a home"
                width={865}
                height={300}
                priority
              />
            </div>
            <p className={styles.date}>{post.date}</p>
            <nav className={styles.contents} aria-labelledby="contents-title">
              <h2 id="contents-title">Table of Content</h2>
              <ol>
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.title}</a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className={styles.articleBody}>
              <h2 className={styles.articleTitle}>{post.title}</h2>
              <p>{post.intro}</p>
              {sections.map((section, index) => (
                <section
                  className={styles.articleSection}
                  id={section.id}
                  key={section.id}
                >
                  <h2>
                    {index + 1}. {section.title}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets && (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </article>

          <section className={styles.reply} aria-labelledby="reply-title">
            <h2 id="reply-title">Leave a Reply</h2>
            <p>
              Your email address will not be published. Required fields are
              marked.
            </p>
            <form
              action="mailto:info@accuratepestcontrol.ae?subject=Blog%20comment"
              method="post"
              encType="text/plain"
            >
              <label htmlFor="comment">Comment</label>
              <textarea
                id="comment"
                name="Comment"
                placeholder="Write a comment..."
                required
              />
              <label htmlFor="comment-name">Name</label>
              <input
                id="comment-name"
                name="Name"
                placeholder="Name"
                autoComplete="name"
                required
              />
              <label htmlFor="comment-email">E-mail</label>
              <input
                id="comment-email"
                name="Email"
                type="email"
                placeholder="Email Address"
                autoComplete="email"
                required
              />
              <label htmlFor="comment-website">Website</label>
              <input
                id="comment-website"
                name="Website"
                type="url"
                placeholder="Website Link"
                autoComplete="url"
              />
              <label className={styles.remember}>
                <input type="checkbox" name="Remember details" />
                Save my name, email, and website in this browser for the next
                time I comment.
              </label>
              <button type="submit">Submit</button>
            </form>
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
            <form
              action="mailto:info@accuratepestcontrol.ae?subject=Free%20Inspection%20Request"
              method="post"
              encType="text/plain"
            >
              <label className={styles.visuallyHidden} htmlFor="inspection-pest">
                Select Pest Concern
              </label>
              <select id="inspection-pest" name="Pest Concern" defaultValue="">
                <option value="" disabled>
                  Select Pest Concern
                </option>
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
              <label
                className={styles.visuallyHidden}
                htmlFor="inspection-name"
              >
                Your Name
              </label>
              <input
                id="inspection-name"
                name="Name"
                placeholder="Your Name"
                autoComplete="name"
                required
              />
              <label
                className={styles.visuallyHidden}
                htmlFor="inspection-phone"
              >
                Phone Number
              </label>
              <input
                id="inspection-phone"
                name="Phone"
                type="tel"
                placeholder="Number"
                autoComplete="tel"
                required
              />
              <label
                className={styles.visuallyHidden}
                htmlFor="inspection-email"
              >
                Email Address
              </label>
              <input
                id="inspection-email"
                name="Email"
                type="email"
                placeholder="E-mail"
                autoComplete="email"
                required
              />
              <button type="submit">Submit</button>
            </form>
          </section>

          <section className={styles.widget}>
            <h2 className={styles.widgetTitle}>Recent Posts</h2>
            <ul className={styles.recentPosts}>
              {recentPosts.map((recentPost, index) => (
                <li key={`${recentPost.slug}-${index}`}>
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
              {categories.map((category) => (
                <li key={category}>
                  <span>{category}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.widget}>
            <h2 className={styles.widgetTitle}>Tags</h2>
            <div className={styles.tags}>
              {tags.map((tag) => (
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
