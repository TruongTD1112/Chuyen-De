import {combineReducers} from 'redux'
import menuReducer from './MenuReducer'

const rootReducer = combineReducers({
    headerMenu: menuReducer
})

export default rootReducer