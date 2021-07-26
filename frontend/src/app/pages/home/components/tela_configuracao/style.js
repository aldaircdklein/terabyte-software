import styled, {keyframes} from 'styled-components';
import {Colors} from '../../../../util/index';

const fadeIn = keyframes`
    0% {opacity: 0;}
    100% {opacity: 1;}
`
export const ShadowBox = styled.div`
    padding: 1vw;
    border-bottom: solid;
    animation: 0.5s ${fadeIn} ease-out;
`
export const FormContainer = styled.div`
    padding-left: 3vw;
    padding-right: 3vw;
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
export const Input = styled.input`
    border-radius: 5px;
    font-size: 0.9em;
    border-color: ${props => props.request? Colors().danger:Colors().gainsboro};
    border-style: solid;
    margin: 1vh;
    width: 100%;
    padding: 0.3em;
    &:focus{
        outline: 0px;
        border-color: ${Colors().blue};
    }
`
export const GrupButton = styled.div`
    display: inline;
`
export const Span = styled.span`
    background-color: ${Colors().orange1};
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 15px;
`
export const ButtonAction = styled.button.attrs(props => ({
    type:'button'
}))`
    width: 20%;
    font-size: 1.0em;
    margin-left: 2vh;
    margin-top: 8vh;
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
    width: 100%;
    padding: 0.3em;
    resize: none;
    &:focus{
        outline: 0px;
        border-color: ${Colors().blue};
    }
`