import {combineReducers} from 'redux'
import menuReducer from './MenuReducer'
import bookManagementMenuReducer from './BookManagementMenuReducer'

const rootReducer = combineReducers({
    headerMenu: menuReducer,
    bookManagementReducer: bookManagementMenuReducer
})

export default rootReducer