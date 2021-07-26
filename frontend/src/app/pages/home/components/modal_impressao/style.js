import styled from 'styled-components';
import {Colors} from '../../../../util/index';


export const GrupButton = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    justify-content: center;
    align-items: center;
    height: 100%;
`
export const Button = styled.button`
    background-color: ${Colors().white};
    width: 15vw;
    height: 15vh;
    margin: 1vh;
    border-radius: 5px;
    &:hover{
        background-color: rgba(222,222,222,0.2);
    };
    &:active{
        opacity: 0.5;
    };
    &:focus{
        outline: 0px;
    }
`