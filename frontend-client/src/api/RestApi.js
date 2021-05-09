import axios from 'axios'
import {checkOnline} from '../utils/checkInternet'
import {SERVER_URL} from './Constance'

const cancelToken = axios.CancelToken
const source = cancelToken.source()
const baseRequest = async (method, path, payload) => {
    // const isOnline = await checkOnline();
    // if (!isOnline){
    //     return 
    // }
    try{
        const response = axios({
            url: path,
            method,
            baseURL: SERVER_URL,
            data: payload,
            timeout: 5000,
            timeoutErrorMessage: 'Fail',
            xsrfCookieName: 'sess',
            cancelToken: source.token,
            headers: {
                "Content-Type": "application/json"
            }

        })
        return response
    }catch(err){
        if (axios.isCancel(err)){
            console.log("Request Canceled "+ err);
        }
        else{

        }
    }
}

export const get = (path, payload) => baseRequest('get', path, payload)
export const post = (path, payload) => baseRequest('post', path, payload)
