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
export const Input = styled.input`
    border-radius: 5px;
    font-size: 1.0em;
    border-color: ${props => props.request? Colors().danger:Colors().gainsboro};
    border-style: solid;
    margin-left: 2vh;
    width: 30%;
    padding: 0.3em;
    &:focus{
        outline: 0px;
        border-color: ${Colors().blue};
    }
`
export const ButtonBuscar = styled.button`
    background-color: transparent;
    border-color: ${Colors().info};
    border-radius: 5px;
    border-style: double;
    font-size: 1.0em;
    padding-top: 0.3em;
    padding-bottom: 0.3em;
    padding-left: 2vw;
    padding-right: 2vw;
    color: ${Colors().info};
    &:active{
        opacity: 0.5;
    }
    &:hover{
        background-color: ${Colors().info};
        color: ${Colors().white};
    }
    &:focus{
        outline: 0px;
    }
`
export const List = styled.ul`
    list-style: none;
    overflow-y: scroll;
    max-height: 60vh;
`
export const Li = styled.li`
    display: grid;
    grid-template-columns: auto 20%;
    background-color: ${Colors().green1};
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
        background-color: ${Colors().green2};
    }
`
export const Span = styled.span`
    text-align: right;
    padding-right: 2vw;
`