import React from "react";
import Image from "next/image";
import { Blog } from "@/types/blog";
import { format } from "date-fns";
import Link from "next/link";
const BlogCard = ({ blog }: { blog: Blog }) => {
    const { title, image, description, createdAt, slug, category } = blog;
    return (
        <>
            <div className="group mb-0 relative h-full flex flex-col bg-white dark:bg-dark_border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="overflow-hidden h-60 relative">
                    <Link href={`/blog/${slug}`} aria-label="blog cover" className="block h-full">
                        {image ? (
                            <Image
                                src={image}
                                alt={title}
                                className="w-full h-full object-contain transition group-hover:scale-110"
                                width={408}
                                height={272}
                                quality={100}
                            />
                        ) : (
                            <div className="w-full h-full bg-border flex items-center justify-center text-grey">
                                No Image
                            </div>
                        )}
                    </Link>
                </div>
                <div className="absolute top-0 left-0 bg-primary py-1 px-4 ml-4 mt-4 rounded-full shadow-lg">
                    <span className="text-white font-medium text-xs uppercase tracking-wider">
                        {category}
                    </span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                        <h3>
                            <Link
                                href={`/blog/${slug}`}
                                className="mb-3 inline-block font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary text-xl leading-snug line-clamp-2"
                            >
                                {title}
                            </Link>
                        </h3>
                        <p className="text-grey dark:text-white/60 text-sm mb-4 line-clamp-3">
                            {description}
                        </p>
                    </div>
                    <div className="mt-auto pt-4 border-t border-border dark:border-dark_border flex justify-between items-center text-xs font-semibold text-SereneGray">
                        <span>{format(new Date(createdAt), "dd MMM yyyy")}</span>
                        <Link href={`/blog/${slug}`} className="text-primary hover:underline">Read More</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogCard;