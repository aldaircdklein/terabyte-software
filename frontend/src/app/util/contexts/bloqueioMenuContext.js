import React, { createContext, useContext, useState } from "react";

const BloqueioMenuContext = createContext({});

export const BloqueioMenuProvider = ({ children }) => {
    const [bloqueioMenu, setBloqueioMenu] = useState(false);

    return (
        <BloqueioMenuContext.Provider
            value={{
                bloqueioMenu,
                setBloqueioMenu
            }}
        >
            {children}
        </BloqueioMenuContext.Provider>
    );
};
export function useBloqueioMenu() {
    const context = useContext(BloqueioMenuContext);
    return context;
}
