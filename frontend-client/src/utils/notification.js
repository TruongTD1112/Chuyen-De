import {notification} from 'antd'

export const openSuccessNotification = (title, content) => {
    notification.success({
        message: title, 
        description: <p>{content}</p>,
        duration: 1,
        placement:'bottomLeft'
    })
}

export const openErrorNotificaton = (title, content) => {
    notification.error({
        message: title, 
        description: <p>{content}</p>,
        duration: 1,
        placement:'bottomLeft'
    })
}

export const openWarningNotification = (title, content) => {
    notification.warning({
        message: title, 
        description: <p>{content}</p>,
        duration: 1,
        placement:'bottomLeft'
    })
}