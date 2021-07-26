import React, { createContext, useContext, useState } from "react";

const ComputerContext = createContext({});

export const ComputerProvider = ({ children }) => {
    const [computer, setComputer] = useState({});
    const [listComputers, setListComputers] = useState([]);

    return (
        <ComputerContext.Provider
            value={{
                computer,
                setComputer,
                listComputers,
                setListComputers
            }}
        >
            {children}
        </ComputerContext.Provider>
    );
};
export function useComputer() {
    const context = useContext(ComputerContext);
    return context;
}
