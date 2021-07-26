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
    margin-right: 2vh;
    width: 20%;
    padding: 0.3em;
    &:focus{
        outline: 0px;
        border-color: ${Colors().blue};
    }
`
export const Select = styled.select`
    border-radius: 5px;
    font-size: 1.0em;
    border-color: ${Colors().gainsboro};
    border-style: solid;
    padding: 0.3em;
    background-color: ${Colors().white};
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
export const ButtonAction = styled.button.attrs(props => ({
    type:'button'
}))`
    font-size: 1.0em;
    background-color: ${props => props.bgcolor};
    border: solid;
    border-color: transparent;
    border-radius: 5px;
    padding: 0.7vh;
    color: ${props => props.color};
    opacity: ${props => props.disabled? 0.5:1};
    &:hover{
        border-color: ${Colors().white};
    };
    &:active{
        opacity: 0.5;
    };
    &:focus{
        outline: 0px;
    }
`
export const Table = styled.table`
    width: 100%;
    margin-top: 5vh;
    box-shadow: 0px 0px 15px black;
    border-radius: 5px;
    padding: 1vh;
    animation: 0.5s ${fadeIn} ease-out;
`
export const Td = styled.td`
    border: 1px solid black; 
    background-color: ${Colors().gainsboro};
    padding: 1vh;
`
export const Th = styled.th`
    border:1px solid black;
    background-color: ${props => props.bgtitle? Colors().secondary:Colors().green2};
    padding: 1vh;
    border-radius: 5px;
`
export const Span = styled.span`
    color: ${Colors().danger};
`
export const Span2 = styled.span`
    color: ${Colors().white};
    background-color: ${props => props.payment? Colors().info:Colors().danger};
    border-radius: 5px;
    padding-left: 0.5vw;
    padding-right: 0.5vw;
`