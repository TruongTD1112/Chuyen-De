export const ADJOURN = '/adjourn-book'
export const BORROWING = '/borrowing'
export const REGISTER_BORROW = '/register-borrow'

//action
export const selectAdjourn = ()=> ({type: ADJOURN})
export const selectBorrowing =  ()=>({type: BORROWING})
export const selectRegisterBorrow = ()=> ({type: REGISTER_BORROW})

const INIT_STATE = {
    itemSelected: BORROWING
}

export default function selectBookManagerMenuItemReducer (state = INIT_STATE, action){
    switch (action.type){
        case BORROWING: 
            return {...state, itemSelected: BORROWING}
        
        case REGISTER_BORROW: 
            return {...state, itemSelected: REGISTER_BORROW}

        case ADJOURN: 
            return {...state, itemSelected: ADJOURN}
        
        default:
            return state
    }
}