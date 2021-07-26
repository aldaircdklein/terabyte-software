import styled from 'styled-components';
import {Colors} from '../../util/index';

export const H4 = styled.h4`
    text-align: center;
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