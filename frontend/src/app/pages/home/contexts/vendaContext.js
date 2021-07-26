import React, { createContext, useContext, useState } from "react";

const VendaContext = createContext({});

export const VendaProvider = ({ children }) => {
    const [idVenda, setIdVenda] = useState('');
    const [listVenda, setListVenda] = useState([]);
    const [total, setTotal] = useState(0);

    return (
        <VendaContext.Provider
            value={{
                idVenda, 
                setIdVenda,
                listVenda,
                setListVenda,
                total,
                setTotal
            }}
        >
            {children}
        </VendaContext.Provider>
    );
};
export function useVenda() {
    const context = useContext(VendaContext);
    return context;
}
