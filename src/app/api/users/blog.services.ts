import axiosHelper from "@/utils/axiosHelper";

const getBlogs = async () => {
    const response = await axiosHelper.get('/blogs');
    return response;
}

const getBlogBySlug = async (slug: string) => {
    const response = await axiosHelper.get(`/blogs/slug/${slug}`);
    return response;
}

export { getBlogs, getBlogBySlug };
