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
        // getListAllBooks: async(data) => {
        //     try{
        //         var response = await axiosClient.get('/getListAllBooks/' + data);
        //         return response;
        //     }catch(err){
        //         throw err;
        //     }
        // },
        getListAllBooksElement: async () => {
            try{
                var response = await axiosClient.get('/getListAllBooksElement');
                return response;
            }
            catch(err){
                throw err;
            }
        },
        // getListAllBooksElement: async(data) => {
        //     try{
        //         var response = await axiosClient.get('/getListAllBooksElement/' + data);
        //         notification.success({message: "Lấy thông tin book_element thành công"});
        //         return response;
        //     }catch(err){
        //         if(err.response){
        //             notification.error({message: err.response.data.message});
        //         }
        //         throw err;
        //     }
        // },
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
    getInfoBook: async(data) => {
        try{
            var response = await axiosClient.post('/getInfoBook/', data);
            return response;
        }catch(err){
            return err;
        }
    },
    rentBook: async(data) => {
        try{
            var response = await axiosClient.post('/rentBook/', data);
            notification.success({ message: "Mượn sách thành công!" });
            return response;
        }catch(err){
            return err;
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
    },
    getBookRent: async () => {
        try{
            var response = await axiosClient.get('/getBookRent');
            return response;
        }
        catch(err){
            throw err;
        }
    },

    getDataRegister: async() => {
        try{
            var response = await axiosClient.get('/getDataRegister');
            return response;
        }catch(err){
            return err;
        }
    },


    handleBookRequest: async(data) => {
        try{
            var response = await axiosClient.post('/handleBookRequest', data);
            return response;
        }catch(err){
            return err;
        }
    },
    
    
    retreiveBook: async(data) => {
        try{
            var response = await axiosClient.post('/retreiveBook', data);
            return response;
        }catch(err){
            return err;
        }
    },



}

export default bookApi;