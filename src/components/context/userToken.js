import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [userToken, setUserToken] = useState(null);

    return (
        <UserContext.Provider value={{ userToken, setUserToken }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
