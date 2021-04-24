import {get, post} from './RestApi'


export const searchBook = (keyword="", year="", category="", author="", page=1)=> {
    get (`/search-book?search=${keyword}&year=${year}&category=${category}&author=${author}&page=${page}`, {})
}
    
export const getBorrowingBooks = (userId, page=1)=> get(`/get-borrowing-book?userId=${userId}&page=${page}`, {})