import { createContext, useState } from "react";

export const NotificationContext = createContext();

const NotificationProvider = (props) => {
    const [notificationCount, setNotificationCount] = useState(10)
    return (
        <NotificationContext.Provider value={[notificationCount, setNotificationCount]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationProvider 