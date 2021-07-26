import React, { createContext, useContext, useState } from "react";

const TelasCriarContext = createContext({});

export const TelasCriarProvider = ({ children }) => {
    const [telaCliente, setTelaCliente] = useState('cadastrar');
    const [telaComputer, setTelaComputer] = useState('cadastrar');
    const [telaServico, setTelaServico] = useState('cadastrar');
    const [telaProduto, setTelaProduto] = useState('cadastrar');

    return (
        <TelasCriarContext.Provider
            value={{
                telaCliente,
                setTelaCliente,
                telaComputer,
                setTelaComputer,
                telaServico,
                setTelaServico,
                telaProduto,
                setTelaProduto
            }}
        >
            {children}
        </TelasCriarContext.Provider>
    );
};
export function useTelasCriar() {
    const context = useContext(TelasCriarContext);
    return context;
}
