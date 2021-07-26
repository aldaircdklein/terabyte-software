import styled from 'styled-components';
import {Colors} from '../../../../util/index';

export const FormContainer = styled.div`
    padding-left: 3vw;
    padding-right: 3vw;
`
export const DivPagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2vh;
    margin-bottom: 3vh;
`
export const ButtonPagination = styled.button.attrs(props => ({
    type:'button'
}))`
    width: 20%;
    font-size: 1.0em;
    border: none;
    background-color: ${props => props.activeBtn? Colors().orange2:'transparent'};
    border-radius: 5px;
    padding: 0.7vh;
    color: ${props => props.activeBtn? Colors().white:Colors().orange2};
    opacity: ${props => props.disabled? 0.5:1};
    &:hover{
        background-color: ${Colors().orange2};
        color: ${Colors().white};
    };
    &:active{
        opacity: 0.5;
    };
    &:focus{
        outline: 0px;
        background-color: ${Colors().orange2};
        color: ${Colors().white};
    }
`