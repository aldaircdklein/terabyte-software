import styled, { keyframes } from 'styled-components';
import {Colors} from '../../../../../util/index';

const fadeIn = keyframes`
    0% {opacity: 0;}
    100% {opacity: 1;}
`
export const ShadowBox = styled.div`
    margin-bottom: 10vh;
    border-bottom: solid;
    padding: 1vw;
    animation: 0.5s ${fadeIn} ease-out;
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
export const ButtonAction = styled.button.attrs(props => ({
    type:'button'
}))`
    width: 20%;
    font-size: 1.0em;
    margin-top: ${props => props.marginTop};
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