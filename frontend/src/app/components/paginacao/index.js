import { useEffect, useState } from 'react';
import {
    PaginacaoList,
    Option
} from './style';

export const Paginacao = (props) => {
    const [paginaAtual, setPaginaAtual] = useState(1);

    const next = () => {
        if(paginaAtual < props.size){
            setPaginaAtual(paginaAtual+1);
        }
    }

    const before = () => {
        if(paginaAtual > 1){
            setPaginaAtual(paginaAtual-1);
        }
    }

    return (
        <PaginacaoList className="scroll-style">
            <Option key="<" onClick={before}>{'<'}</Option>
            <Option key={paginaAtual}>{paginaAtual}</Option>
            <Option key=">" onClick={next}>{'>'}</Option>
        </PaginacaoList>
    )
}