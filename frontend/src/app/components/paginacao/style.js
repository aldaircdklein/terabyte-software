import styled from 'styled-components';
import {Colors} from '../../util/index';

export const PaginacaoList = styled.ul`
    display: inline-flex;
    list-style: none;
    overflow-x: scroll;
    padding: 0px;
    max-width: 10vw;
    margin-left: 5vw;
    margin-top: 0px;
    margin-bottom: 0px;
`
export const Option = styled.button`
    padding-left: 1vw;
    padding-right: 1vw;
    border: groove;
    border-radius: 30px;
    &:hover{
        background-color: ${Colors().warning};
    }
    &:focus{
        outline: 0px;
        background-color: ${Colors().warning};
    }
`