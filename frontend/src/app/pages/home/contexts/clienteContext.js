import React, { createContext, useContext, useState } from "react";

const ClienteContext = createContext({});

export const ClienteProvider = ({ children }) => {
    const [cliente, setCliente] = useState({});

    return (
        <ClienteContext.Provider
            value={{
                cliente,
                setCliente
            }}
        >
            {children}
        </ClienteContext.Provider>
    );
};
export function useCliente() {
    const context = useContext(ClienteContext);
    return context;
}
