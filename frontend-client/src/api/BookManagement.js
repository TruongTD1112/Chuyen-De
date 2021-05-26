import {get, post} from './RestApi'


export const searchBook = (title="", genre="", author="", page=1, code="")=> 
    get (`/searchBook?code=${code}&title=${title}&genre=${genre}&author=${author}&page=${page}`, {})

    
export const getBorrowingBooks = (userId, page=1)=> get(`/borrowingBooks?userId=${userId}&page=${page}`, {})

/**
 * cần thêm những api sau
 * + lấy thông tin cụ thể của 1 quyển sách, tham số: bookId (get)
 * + thêm sách vào mục yêu thích, tham số: bookId, userId (post)
 * + lấy danh sách sách đã yêu thích, tham số : userId, page (get)
 * + đăng ký mượn sách, tham số: userId, bookId (post)
 * + gia hạn sách, tham số: userId, bookId, newExpireTime (post)
 */
export const getBookInfo = (bookId) => get(`/getBookInfor?bookId=${bookId}`)
export const addBookToFavorite = (userId, bookId) => post('/addFavoriteBook', {
    userId: userId,
    bookId: bookId
})
export const getFavoriteBook = (userId, page) => get(`/getFavoriteBooks?userId=${userId}&page=${page}`)
export const registerBorrow = (userId,  code) => post('/registerToBorrowBook', {
    userId: userId,
    code: code
})
export const unregisterBorrow = (userId, code, bookElementId) => post('/unregisterToBorrowBook', {
    userId: userId,
    code: code,
    bookElementId: bookElementId
})
export const extendBook = (userId, bookElementId, newExpireTime) => post ('/extendBook', {
    userId: userId,
    bookElementId: bookElementId,
    newExpireTime: newExpireTime
})

export const getRegisteredBooks = (userId) => get (`/getAllRegisteredBookId?userId=${userId}`)
export const getListBooksInfor = (listBookId) => get (`/getListBookInfor?codes=${JSON.stringify(listBookId)}`)