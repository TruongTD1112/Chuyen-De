export const SET_DATA = "set_data"
//action
export const setData = (data) => ({
    type: SET_DATA,
    payload: data
})
const INIT_STATE = {
    userData: {
        birthday: "",
        borrowBooks: [],
        class: "",
        email: "",
        favoriteBooks: [],
        firstName: "",
        lastName: "",
        password: "",
        registerBooks: [],
        status: "",
        __v: 0,
        _id: "",
    }
}
export default function UserDataReducer (state = INIT_STATE, action) {
    switch (action.type) {
        case SET_DATA: {
            return { ...state, userData: action.payload }
        }
        default:
            return state;
    }
}