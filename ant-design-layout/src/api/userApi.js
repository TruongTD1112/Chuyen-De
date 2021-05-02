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
            throw err;
        }
    }
}

export default userApi;