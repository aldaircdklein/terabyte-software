import styled from 'styled-components';
import {Colors} from '../../util/index';

export const DivVoltar = styled.div`
    position: absolute;
    display: flex;
    z-index: 1;
    left:140px;
    top: 2vh;
`
export const ButtonVoltar = styled.button`
    display: flex;
    align-items: center;
    border: none;
    background: rgba(999,999,999,0.1);
    padding: 13px;
    margin-right: 5px;
    font-size: 0.7em;
    color: ${Colors().white};
    &:hover{
        background: rgba(999,999,999,0.2);
    }
    &:focus{
        outline: 0px;
        opacity: 0.8;
    }
`
export const ButtonAtual = styled.button`
    display: flex;
    align-items: center;
    border: none;
    background: transparent;
    border-left: solid 1px rgba(999,999,999,0.4);
    padding: 13px;
    margin-right: 5px;
    font-size: 0.7em;
    color: ${Colors().white};
`
export const Span = styled.span`
    margin-right: 5px;
`