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

    getInformationOfUser: async(data) => {
        try {
            var response = await axiosClient.get('/apiAdmin/getInformationOfUser/' + data);
            notification.success({message : "Lấy thông tin người dùng thành công."});
            return response;
        } catch (err) {
            notification.error({message : "Lỗi trong quá trình xác nhận thông tin"});

            if (err.response) {
                notification.error({message : err.response.data.message});
            } else if (err.request) {
            } else {
            }

            throw err;
        }
    },

    getInformationOfAdmin: async(data) => {
        try {
            var response = await axiosClient.get('/apiAdmin/getInformationOfAdmin/' + data);
            notification.success({message : "Lấy thông tin quản trị thành công."});
            return response;
        } catch (err) {
            notification.error({message : "Lỗi trong quá trình xác nhận thông tin"});

            if (err.response) {
                notification.error({message : err.response.data.message});
            } else if (err.request) {
            } else {
            }

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
    },

    updateInformation: async (email, data) => {
        try {
            var response = await axiosClient.put('/apiAdmin/updateInformation/' + email.email, data);
            notification.success({message : "Đổi thông tin cá nhân thành công."});
            return response;
        } catch (err) {
            notification.error({message : "Đổi thông tin cá nhân thất bại"});

            if (err.response) {
                notification.error({message : err.response.data.message});
            } else if (err.request) {
            } else {
            }

            throw err;
        }
    },

    changePassword: async (email, data) => {
        try {
            var response = await axiosClient.put('/apiAdmin/changePassword/' + email.email, data);
            notification.success({message : "Đổi mật khẩu thành công."});
            return response;
        } catch (err) {
            notification.error({message : "Đổi mật khẩu thất bại"});

            if (err.response) {
                notification.error({message : err.response.data.message});
            } else if (err.request) {
            } else {
            }

            throw err;
        }
    },

    signUp: async (data) => {
        try {
            var response = await axiosClient.post('/apiAdmin/createNewAdmin', data);
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
    },

    login: async (data) => {
        try {
            var response = await axiosClient.post('/apiAdmin/login', data);
            notification.success({message : 'Đăng nhập tài khoản thành công.'});
            return response;
        } catch (err) {
            notification.error({message : 'Đăng nhập thất bại.'});
            
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