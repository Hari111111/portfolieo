import axiosHelper from "@/utils/axiosHelper";

export const getQuestions = async (category = '', page = 1, limit = 10, search = '') => {
    const url = `/questions?page=${page}&limit=${limit}${category ? `&category=${category}` : ''}${search ? `&search=${search}` : ''}`;
    const response = await axiosHelper.get(url);
    return response;
};

export const getQuestionById = async (id: string) => {
    const response = await axiosHelper.get(`/questions/${id}`);
    return response;
};
