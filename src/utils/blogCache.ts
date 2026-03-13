import { Blog } from "@/types/blog";

let blogCache: Blog[] = [];

export const setBlogCache = (blogs: Blog[]) => {
    blogCache = blogs;
};

export const getBlogFromCache = (slug: string) => {
    return blogCache.find(b => b.slug === slug) || null;
};
