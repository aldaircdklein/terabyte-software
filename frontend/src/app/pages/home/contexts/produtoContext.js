import React, { createContext, useContext, useState } from "react";

const ProdutoContext = createContext({});

export const ProdutoProvider = ({ children }) => {
    const [produto, setProduto] = useState({});

    return (
        <ProdutoContext.Provider
            value={{
                produto,
                setProduto
            }}
        >
            {children}
        </ProdutoContext.Provider>
    );
};
export function useProduto() {
    const context = useContext(ProdutoContext);
    return context;
}
