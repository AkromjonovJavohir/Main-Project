import { createContext, useState } from "react";

export const SessionContext = createContext();

const SessionProvider = (props) => {
    const [session, setSession] = useState({ tokin: "", isLogged: true })
    return (
        <SessionContext.Provider value={[session, setSession]}>
            {props.children}
        </SessionContext.Provider>
    )
}

export default SessionProvider