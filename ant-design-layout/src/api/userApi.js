import { notification } from 'antd';
import axiosClient from './axiosClient'

const userApi = {
    signUp: async (data) => {
        try {
            var response = await axiosClient.post('/apiUser/createNewUser', data);
            notification.success({message : 'Đăng ký tài khoản thành công.'});
            return response;
        } catch (err) {
            notification.error({message : 'Đăng ký tài khoản thất bại.'});
            
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(err.response.data);
                // console.log(err.response.status);
                // console.log(err.response.headers);
                notification.error({message : err.response.data.message});
            } else if (err.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                // console.log(err.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                // console.log('Error', err.message);
            }
            // console.log(err.config);
            
            throw err;
        }
    }
}

export default userApi;