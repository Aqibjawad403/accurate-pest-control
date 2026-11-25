import scraped from "./blogs.scraped.json";

export type BlogImage = {
  src: string;
  alt: string;
};

export type BlogSubsection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets: string[];
  images: BlogImage[];
};

export type BlogSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets: string[];
  images: BlogImage[];
  subsections: BlogSubsection[];
};

export type BlogPost = {
  slug: string;
  title: string;
  cardTitle: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  imageAlt: string;
  intro: string;
  featuredImage: string;
  toc: { id: string; title: string; sub?: { id: string; label: string }[] }[];
  sections: BlogSection[];
};

export const blogPosts = scraped.posts as BlogPost[];
export const blogCategories = scraped.categories as string[];
export const blogTags = scraped.tags as string[];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogListingPosts() {
  return blogPosts.map((post) => ({
    title: post.cardTitle,
    href: `/blogs/${post.slug}`,
    image: post.image,
  }));
}

export function getRecentBlogPosts(excludeSlug?: string, limit = 5) {
  return blogPosts
    .filter((post) => post.slug !== excludeSlug)
    .slice(0, limit);
}
