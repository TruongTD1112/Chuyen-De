import axiosClient from './axiosClient'
import { notification } from "antd";

const bookApi = {
        getListAllBooks: async () => {
            try{
                var response = await axiosClient.get('/getListAllBooks');
                return response;
            }
            catch(err){
                throw err;
            }
        },
        getListAllBooksElement: async () => {
            try{
                var response = await axiosClient.get('/getListAllBooksElement');
                return response;
            }
            catch(err){
                throw err;
            }
        },
    importBook: async (data) => {
        try {
          const response = await axiosClient.post(`importBook`, data);
          notification.success({ message: "Nhập sách vào thành công!" });
          return response;
        } catch (error) {
          throw error;
        }
    },
    exportBook: async(data) => {
        try {
            const response = await axiosClient.post(`exportBook`, data);
            notification.success({ message: "Xuất sách ra thành công!" });
            return response;
          } catch (error) {
            throw error;
          }
      },
    
    getByListID: async(data) => {
        try {
            const response = await axiosClient.post('/getByListID', data);
            return response;
        }
        catch(error) {
            throw error;
        }
    }

}

export default bookApi;