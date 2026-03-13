import axiosHelper from "@/utils/axiosHelper";

const getServices = async () => {
    const response = await axiosHelper.get('/services');
    return response;
}

export { getServices };
