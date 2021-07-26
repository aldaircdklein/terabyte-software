import styled from 'styled-components';
import {Colors} from '../../util/index';

export const Container = styled.div`
    z-index: 15;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(000,000,000,0.8);
    display: ${props => props.showOn? 'flex':'none'};
    justify-content: center;
    align-items: center;
`
export const H3 = styled.h3`
    color: ${Colors().white};
    text-align: center;
`