export const ADD__TO_REGISTERED = "add_register"
export const REMOVE_FROM_REGISTERED = "remove_register"
export const SET = 'set_registered'
//action
export const addToRegistered = (payload) => {
    // let setBooks = new Set(INIT_STATE.registeredBooks);
    // let updatedSet = setBooks.add(payload);
    return {type: ADD__TO_REGISTERED, payload: payload}
}

export const setRegisteredBooks = (payload) => ({
    type: SET,
    payload: payload
})

const INIT_STATE = {
    registeredBooks: []
}

export default function RegisteredBookReducer (state = INIT_STATE, action) {
    switch (action.type) {
        case ADD__TO_REGISTERED: {
            return { ...state, registeredBooks: [...state.registeredBooks, action.payload] }
        }
        case REMOVE_FROM_REGISTERED: {
            return { ...state, registeredBooks: action.payload }
        }
        case SET: {
            return { ...state, registeredBooks: action.payload }
        }
        default:
            return state;
    }
}