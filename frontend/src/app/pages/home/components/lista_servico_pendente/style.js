import styled, {keyframes} from 'styled-components';
import {Colors} from '../../../../util/index';

const fadeIn = keyframes`
    0% {opacity: 0;}
    100% {opacity: 1;}
`
export const NavBusca = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border-bottom: outset;
`
export const List = styled.ul`
    list-style: none;
    overflow-y: scroll;
    max-height: 60vh;
`
export const Li = styled.li`
    display: grid;
    grid-template-columns: auto 20%;
    background-color: ${Colors().yellow1};
    padding: 2vh;
    border: outset;
    border-radius: 10px;
    font-size: 1.1em;
    user-select: none;
    animation: 0.5s ${fadeIn} ease-out;
    &:active{
        opacity: 0.5;
    }
    &:hover{
        background-color: ${Colors().yellow2};
    }
`
export const Span = styled.span`
    text-align: right;
    padding-right: 2vw;
`