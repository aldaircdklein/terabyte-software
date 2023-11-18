import React, { createContext, useContext, useState } from "react";

const VinProductContext = createContext({});

export const VinProductProvider = ({ children }) => {
    const [vinItem, setVinItem] = useState(false);

    return (
        <VinProductContext.Provider
            value={{
                vinItem,
                setVinItem
            }}
        >
            {children}
        </VinProductContext.Provider>
    );
};
export function useVinProduct() {
    const context = useContext(VinProductContext);
    return context;
}
