import axios from 'axios'

export const checkOnline = async ()=> {
    try{
        const online = await axios.get('https://google.com')
        return online.status >= 200 && online.status < 300; 
    }catch (err){
        return false
    }
}
