import styled, {keyframes} from 'styled-components';
import {Colors} from '../../../../util/index';

const fadeIn = keyframes`
    0% {opacity: 0;}
    100% {opacity: 1;}
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
export const Select = styled.select`
    border-radius: 5px;
    font-size: 1.0em;
    border-color: ${Colors().gainsboro};
    border-style: solid;
    margin: 1vh;
    padding: 0.3em;
    &:focus{
        outline: 0px;
        border-color: ${Colors().blue};
    }
`
export const DivList = styled.div`
    max-height: 40vh;
    overflow-y: scroll;
`
export const List = styled.ul`
    list-style: none;
`
export const Li = styled.li`
    display: grid;
    grid-template-columns: auto 12% 25% 8%;
    align-items: center;
    padding: 1vh;
    border-bottom: groove;
    font-size: 0.9em;
    background-color: ${Colors().yellow2};
    border-radius: 5px;
    animation: 0.5s ${fadeIn} ease-out;
`
export const ButtonAction = styled.button.attrs(props => ({
    type:'button'
}))`
    font-size: 0.9em;
    margin-left: ${props => props.marginLeft};
    background-color: ${props => props.bgcolor};
    border: solid;
    border-color: transparent;
    border-radius: 5px;
    padding: 0.7vh;
    color: ${props => props.color};
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
export const TextArea = styled.textarea.attrs(props => ({
    rows:'5'
}))`
    border-radius: 5px;
    font-size: 1.0em;
    border-color: ${props => props.request? Colors().danger:Colors().gainsboro};
    border-style: solid;
    margin: 1vh;
    width: 50%;
    padding: 0.3em;
    resize: none;
    &:focus{
        outline: 0px;
        border-color: ${Colors().blue};
    }
`