import styled, {keyframes} from 'styled-components';
import {Colors} from '../../util/index';

const fadeIn = keyframes`
    from {opacity: 0.1}
    to {opacity: 1}
`
export const DivAlert = styled.div`
    position: absolute;
    z-index: 20;
    right: 1vw;
    top: 1vh;
`
export const AlertContainer = styled.div`
    background-color: ${Colors().white};
    min-width: 8vw;
    max-width: 15vw;
    margin-bottom: 1vh;
    box-shadow: 2px 2px 5px black;
    border-radius: 5px;
    border: groove;
    border-color: ${props => props.borderColor};
    animation: 0.3s ${fadeIn} linear;
`
export const AlertHeader = styled.div`
    display: grid;
    grid-template-columns: 15% auto 20%;
    background-color: ${props => props.headColor};
    padding: 0.5vw;
    color: ${Colors().white};
`
export const AlertBody = styled.div`
    padding: 1vw;
    border-radius: 5px;
`
export const ButtonClose = styled.button`
    right: 0;
    background-color: transparent;
    color: ${Colors().white};
    border: none;
    &:hover{
        color: ${Colors().blue};
    }
    &:focus{
        outline: 0px;
    }
`