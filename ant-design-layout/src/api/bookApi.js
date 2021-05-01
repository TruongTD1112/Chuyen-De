import axios from "axios";
const axiosClient = require('./axiosClient');

const bookApi = {
    getListAllBooks = {
        getListAllBooks: async () => {
            try{
                response = await axiosClient.get('/getListAllBooks');
                return response;
            }
            catch(err){
                throw err;
            }
        }
    },
    getListAllBooksElement = {
        getListAllBooks: async () => {
            try{
                response = await axiosClient.get('/getListAllBooksElement');
                return response;
            }
            catch(err){
                throw err;
            }
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
}

module.exports = bookApi;