import axiosClient from './axiosClient'
import { notification } from 'antd'; 

const adminApi = {
    getListAllUsers: async () => {
        try {
            var response = await axiosClient.get('/apiAdmin/getListAllUsers');
            return response;
        } catch (err) {
            throw err;
        }
    },

    getListAllLockedUsers: async () => {
        try {
            var response = await axiosClient.get('/apiAdmin/getListAllLockedUsers');
            return response;
        } catch (err) {
            throw err;
        }
    },

    lockUser: async (data) => {
        try {
            var response = await axiosClient.put('/apiAdmin/lockUserByEmail/' + data);
            notification.success({message : "Khóa người dùng thành công."});
            return response;
        } catch (err) {
            notification.error({message : "Khóa người dùng thất bại."});

            if (err.response) {
                notification.error({message : err.response.data.message});
            } else if (err.request) {
            } else {
            }

            throw err;
        }
    },

    unlockUser: async (data) => {
        try {
            var response = await axiosClient.put('/apiAdmin/unlockUserByEmail/' + data);
            notification.success({message : "Mở khóa người dùng thành công."});
            return response;
        } catch (err) {
            notification.error({message : "Mở khóa người dùng thất bại."});

            if (err.response) {
                notification.error({message : err.response.data.message});
            } else if (err.request) {
            } else {
            }

            throw err;
        }
    }
}

export default adminApi;