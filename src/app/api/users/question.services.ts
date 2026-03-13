import axiosHelper from "@/utils/axiosHelper";

export const getQuestions = async (category = '') => {
    const url = category ? `/questions?category=${category}` : '/questions';
    const response = await axiosHelper.get(url);
    return response;
};

export const getQuestionById = async (id: string) => {
    const response = await axiosHelper.get(`/questions/${id}`);
    return response;
};
