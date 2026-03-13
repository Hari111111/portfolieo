import axiosHelper from "@/utils/axiosHelper";

const getProjects = async () => {
    const response = await axiosHelper.get('/projects');
    return response;
}

export { getProjects };
