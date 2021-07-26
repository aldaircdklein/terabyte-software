import React, { createContext, useContext, useState } from "react";

const AlertContext = createContext({});

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState([]);

    const addAlert = (message) => {
        let newAlert = alert;
        newAlert.push(message);
        setAlert(Array.from(newAlert));
    }
    const removeAlert = (id) => {
        let newAlerts = alert;
        if(id){
            newAlerts = newAlerts.filter((element) => {return element.msg !== id});
            setAlert(Array.from(newAlerts));
        }else{
            if(newAlerts.length > 0){
                newAlerts.shift();
                setAlert(Array.from(newAlerts));
            }
        }
    }

    return (
        <AlertContext.Provider
            value={{
                alert,
                addAlert,
                removeAlert
            }}
        >
            {children}
        </AlertContext.Provider>
    );
};
export function useAlert() {
    const context = useContext(AlertContext);
    return context;
}
