import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext({});

export const ModalProvider = ({ children }) => {
    const [onShowModal, setOnShowModal] = useState(false);
    const [onShowModal1, setOnShowModal1] = useState(false);
    const [onShowModal2, setOnShowModal2] = useState(false);
    const [onShowModal3, setOnShowModal3] = useState(false);
    const [onShowModal4, setOnShowModal4] = useState(false);

    return (
        <ModalContext.Provider
            value={{
                onShowModal,
                setOnShowModal,
                onShowModal1,
                setOnShowModal1,
                onShowModal2,
                setOnShowModal2,
                onShowModal3,
                setOnShowModal3,
                onShowModal4,
                setOnShowModal4,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
export function useModal() {
    const context = useContext(ModalContext);
    return context;
}
