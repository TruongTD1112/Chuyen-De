export const HOME = '/client/home'
export const GUIDE = '/client/guide'
export const BOOK_MANAGEMENT = '/client/book-management'

//action
export const selectHome = ()=> ({type: HOME})
export const selectBookManagement =  ()=>({type: BOOK_MANAGEMENT})
export const selectGuide = ()=> ({type: GUIDE})

const INIT_STATE = {
    itemSelected: HOME
}

export default function selectMenuItemReducer (state = INIT_STATE, action){
    switch (action.type){
        case HOME: 
            return {...state, itemSelected: HOME}
        
        case BOOK_MANAGEMENT: 
            return {...state, itemSelected: BOOK_MANAGEMENT}

        case GUIDE: 
            return {...state, itemSelected: GUIDE}
        
        default:
            return state
    }
}