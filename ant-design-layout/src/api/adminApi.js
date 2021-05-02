import axiosClient from './axiosClient'

const adminApi = {
    getListAllUsers: async () => {
        try {
            var response = await axiosClient.get('/apiAdmin/getListAllUsers');
            return response;
        } catch (err) {
            throw err;
        }
    }
}

export default adminApi;