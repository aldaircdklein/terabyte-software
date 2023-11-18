import React, { createContext, useContext, useState } from "react";

const ListProdutoContext = createContext({});

export const ListProdutoProvider = ({ children }) => {
    const [listProduto, setListProduto] = useState([]);

    return (
        <ListProdutoContext.Provider
            value={{
                listProduto,
                setListProduto
            }}
        >
            {children}
        </ListProdutoContext.Provider>
    );
};
export function useListProduto() {
    const context = useContext(ListProdutoContext);
    return context;
}
