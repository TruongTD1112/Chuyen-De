export const saveCookie = (name, data) => {

}
export const getCookieByName = (name) => {
    try {
        let cookie = {};
        document.cookie.split(';').forEach((elem) => {
            let [key, val] = elem.split('=');
            cookie[key.trim()] = val;
        })
        return cookie[name];
    } catch (err) {
        return null
    }
}