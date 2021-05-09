import {get, post} from './RestApi'

export const login = (email, password) => post('/apiUser/login', {
    email: email, password: password
})

export const singup = (password, fullName, email, birthday, classs) => post ('/apiUser/createNewUser', {
    email: email,
    password: password,
    confirmPassword: password,
    firstName: fullName,
    lastName: "as",
    birthday: birthday,
    class: classs
})