import {get, post} from './RestApi'

export const login = (username, password) => post('/client/login', {
    username: username, password: password
})

export const singup = (username, password, fullName, email) => post ('/client/signup', {
    username: username,
    password: password,
    fullName: fullName, 
    email: email
})