import {combineReducers} from 'redux'
import menuReducer from './MenuReducer'
import bookManagementMenuReducer from './BookManagementMenuReducer'
import UserDataReducer from './UserDataReducer'
import RegisteredBookReducer from './RegisteredBookReducer'
const rootReducer = combineReducers({
    headerMenu: menuReducer,
    bookManagementReducer: bookManagementMenuReducer,
    userDataReducer: UserDataReducer,
    registeredBooksReducer: RegisteredBookReducer
})

export default rootReducer