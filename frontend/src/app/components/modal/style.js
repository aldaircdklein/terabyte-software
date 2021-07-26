import styled, {keyframes} from 'styled-components';
import {Colors} from '../../util/index';

const fadeIn = keyframes`
    from {position:absolute; bottom: 0px}
    to {bottom:20vh;}
`
export const ModalBack = styled.div`
    display:${props => props.showModalState ? 'flex' : 'none'};
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: rgba(000,000,000,0.3);
    justify-content: center;
    align-items: center;
`
export const Modal = styled.div`
    display: grid;
    grid-template-rows: 8vh auto 8vh;
    background-color: ${Colors().white};
    border-radius: 5px;
    min-width: ${props => props.sizeX};
    min-height: ${props => props.sizeY};
    animation: 0.3s ${fadeIn} linear;
`
export const MHeader = styled.div`
    display: grid;
    grid-template-columns: auto 5vw;
    padding-left: 2vh;
`
export const MBody = styled.div`
    overflow-y: scroll;
    border-top: outset;
    padding-left: 2vh;
    padding-right: 2vh;
    max-height: 60vh;
`
export const MFooter = styled.div`
    display: flex;
    border-top: outset;
    align-items: center;
    padding-left: 2vh;
    padding-right: 2vh;
`
export const DivClose = styled.div`
    display: flex;
    justify-content: flex-end;
`
export const ButtonClose = styled.button`
    height: 70%;
    width: 70%;
    border: none;
    font-size: 1.2em;
    border-top-right-radius: 5px;
    background-color: transparent;
    &:hover{
        background-color: ${Colors().danger};
        color: ${Colors().white};
    }
`