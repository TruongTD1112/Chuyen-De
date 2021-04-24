import {get, post} from './RestApi'


export const searchBook = (keyword="", year="", category="", author="", page=1)=> {
    get (`/search-book?search=${keyword}&year=${year}&category=${category}&author=${author}&page=${page}`, {})
}
    
export const getBorrowingBooks = (userId, page=1)=> get(`/get-borrowing-book?userId=${userId}&page=${page}`, {})

/**
 * cần thêm những api sau
 * + lấy thông tin cụ thể của 1 quyển sách, tham số: bookId (get)
 * + thêm sách vào mục yêu thích, tham số: bookId, userId (post)
 * + lấy danh sách sách đã yêu thích, tham số : userId, page (get)
 * + đăng ký mượn sách, tham số: userId, bookId (post)
 * + gia hạn sách, tham số: userId, bookId, newExpireTime (post)
 */