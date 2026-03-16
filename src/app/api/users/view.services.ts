import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const recordPageView = async (pagePath: string) => {
    try {
        const response = await axios.post(`${API_URL}/views/record`, { pagePath });
        return response.data;
    } catch (error) {
        console.error('Error recording page view:', error);
        return null;
    }
};

export const getPageViewCount = async (pagePath: string) => {
    try {
        const response = await axios.get(`${API_URL}/views/count`, {
            params: { pagePath }
        });
        return response.data.count;
    } catch (error) {
        console.error('Error getting page view count:', error);
        return 0;
    }
};
