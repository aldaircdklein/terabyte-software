import React, { createContext, useContext, useState } from "react";

const ServicoContext = createContext({});

export const ServicoProvider = ({ children }) => {
    const [servico, setServico] = useState({});
    const [listServicos, setListServicos] = useState([]);

    return (
        <ServicoContext.Provider
            value={{
                servico,
                setServico,
                listServicos,
                setListServicos
            }}
        >
            {children}
        </ServicoContext.Provider>
    );
};
export function useServico() {
    const context = useContext(ServicoContext);
    return context;
}
