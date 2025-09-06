import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
console.log('API_URL:', API_URL);
// import { userData } from './profileData';

export const register = async (userData) => {
    try {
        console.log('Sending register request:', userData);

        const response = await axios.post(`${API_URL}/api/User/Register`, {
            useR_FIRST_NAME: userData.firstName,
            useR_LAST_NAME: userData.lastName,
            useR_EMAIL: userData.email,
            useR_PHONE: userData.phone,
            useR_PASSWORD: userData.password,
            useR_GENDER: userData.gender,
            useR_BIRTHDATE: userData.birthDate
        });

        console.log('Register API Response:', response);

        return {
            success: true,
            data: response.data,
            message: "Đăng ký thành công"
        };
    } catch (error) {
        console.error('Register API Error:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Lỗi đăng ký'
        };
    }
};
export const login = async (useR_EMAIL, useR_PASSWORD) => {
    try {
        const response = await axios.post(`${API_URL}/api/User/Login`, {
            useR_EMAIL    : useR_EMAIL,
            useR_PASSWORD : useR_PASSWORD
        });
        localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: error.message || 'Lỗi đăng nhập' };
    }
};

export const VerifyOTP = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/api/User/AuthAccount`, {
            email: data.email,
            otp: data.otp
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: error.message || 'Lỗi xác thực OTP' };
    }
};

export const SendOtpEmail = async (email, userName) => {
    try {
        const response = await axios.post(`${API_URL}/api/AuthAccount/SendOtpToEmail`, {
            email: email,
            useR_NAME: userName
        });
        console.log('Response:', response);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: error.message || 'Lỗi gửi OTP' };
    }
};

export const GetInformation = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/User/Information`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'ngrok-skip-browser-warning': 'true',
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: error.message || 'Lỗi lấy thông tin' };
    }
};

export const createAddress = async (token, data) =>
    {
        try{
            const response = await axios.post(`${API_URL}/api/Address/Create`,{
                housE_NUMBER: data.housE_NUMBER,
                street: data.street,
                city: data.city,
                postal_CODE: data.postaL_CODE,
                country: data.country,
                typE_ADDRESS: data.typE_ADDRESS
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data;

        }
        catch(error){
            throw error.response?.data || { message: error.message || 'Lỗi tạo địa chỉ' };
        }
}
export const GetAddress = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/Address/GetById`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: error.message || 'Lỗi lấy địa chỉ' };
    }
};

export const UpdateInformation = async ( userData)=>{
    try{
        const response = await axios.put(`${API_URL}/api/User/Update`, {
            useR_ID: userData.id,
            useR_FIRST_NAME: userData.firstName,
            useR_LAST_NAME: userData.lastName,
            useR_EMAIL: userData.email,
            useR_GENDER: userData.gender,
            useR_PHONE: userData.phone
        });
        return response.data;
    }
    catch (error) {
        throw error.response?.data || { message: error.message || 'Lỗi cập nhật thông tin' };
    }
}

export const updateAddress = async (token, addressData) => {
    try {
        const response = await axios.put(`${API_URL}/api/Address/Update`, {
            id: addressData.id,
            housE_NUMBER: addressData.housE_NUMBER,
            street: addressData.street,
            city: addressData.city,
            postal_CODE: addressData.postaL_CODE,
            country: addressData.country,
            typE_ADDRESS: addressData.typE_ADDRESS
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.data?.result?.MESSAGE) {
            throw new Error(response.data.result.MESSAGE);
        }
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: error.message || 'Lỗi cập nhật địa chỉ' };
    }
}

