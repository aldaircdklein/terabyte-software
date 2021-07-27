import styled, {keyframes} from 'styled-components';
import {Colors} from '../../../../../util/index';

const fadeIn = keyframes`
    0% {opacity: 0;}
    100% {opacity: 1;}
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
    opacity: ${props => props.block? 0.3:1};
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
export const Input = styled.input`
    width: ${props => props.width};
    border-radius: 5px;
    font-size: 0.9em;
    border-color: ${props => props.request? Colors().danger:Colors().gainsboro};
    border-style: solid;
    margin: 1vh;
    padding: 0.3em;
    &:focus{
        outline: 0px;
        border-color: ${Colors().blue};
    }
`
export const Bloqueador = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`