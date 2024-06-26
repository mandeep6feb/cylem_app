import { getToken } from "@app/utils/mmkvStorage";

export const commonService = async (method: string, endpoint: string, data?: any, razorpay_sign?: string) => {
    try {
        const url = `${process.env.BASE_URL}${endpoint}`;

        const headers: HeadersInit_ = {
            'Content-Type': 'application/json',
            'Authorization': `${getToken("token")}`,
            'x-razorpay-signature': `${razorpay_sign}`
        };

        const options: RequestInit = {
            method,
            headers,
        };

        if (method !== 'GET') {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);
        const responseData = await response.json();
        return responseData;
    } catch (err) {
        throw err;
    }
};
