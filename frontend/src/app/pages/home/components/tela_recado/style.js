import styled, {keyframes} from 'styled-components';
import {Colors} from '../../../../util/index';

const fadeIn = keyframes`
    0% {opacity: 0;}
    100% {opacity: 1;}
`
export const Container = styled.div`
    padding-left: 3vw;
    padding-right: 3vw;
`
export const DivRow = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
`
export const DivCol = styled.div`

`
export const FormRow = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1vh;
`
export const Label = styled.label`
    color: ${Colors().chocolate};
`
export const List = styled.ul`
    list-style: none;
    overflow-y: scroll;
    max-height: 45vh;
`
export const Li = styled.li.attrs(props => ({}))`
    display: grid;
    grid-template-columns: auto 50%;
    background-color: ${props => props.bgcolor};
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
        background-color: ${Colors().gainsboro};
    }
`
export const Span = styled.span`
    text-align: right;
    font-size: 0.8em;
`
export const TextArea = styled.textarea.attrs(props => ({
    rows:'15'
}))`
    border-radius: 5px;
    font-size: 1.0em;
    border-color: ${props => props.request? Colors().danger:Colors().gainsboro};
    border-style: solid;
    margin: 1vh;
    width: 100%;
    padding: 0.3em;
    resize: none;
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
    margin-right: 5px;
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