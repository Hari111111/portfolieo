import axiosHelper from "@/utils/axiosHelper";

const getPortfolioData = async () => {
    const response = await axiosHelper.get('/users/portfolio');
    return response;
}

export { getPortfolioData };