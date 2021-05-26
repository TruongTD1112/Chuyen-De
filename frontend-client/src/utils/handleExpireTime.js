export const handleExpireTime = (time) => {
    if (time == null){
        return{
            time: null,
        leftDays: null
        }
    }
    let now = new Date()
    let t = new Date(time)
    
    let leftDaysInMiliSecond = t - now
    t = t.toLocaleDateString()
    let leftDays = leftDaysInMiliSecond / (1000*60*60*24)
    return {
        time: t,
        leftDays: Math.floor(leftDays)
    }
}