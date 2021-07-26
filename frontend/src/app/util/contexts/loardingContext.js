import React, { createContext, useContext, useState } from "react";

const LoardingContext = createContext({});

export const LoardingProvider = ({ children }) => {
    const [loardingShow, setLoardingShow] = useState(false);

    const showLoarding = () => {
        setLoardingShow(true);
    }

    const hiddeLoarding = () => {
        setTimeout(()=>{setLoardingShow(false);},500)
    }

    return (
        <LoardingContext.Provider
            value={{
                loardingShow,
                showLoarding,
                hiddeLoarding
            }}
        >
            {children}
        </LoardingContext.Provider>
    );
};
export function useLoarding() {
    const context = useContext(LoardingContext);
    return context;
}
