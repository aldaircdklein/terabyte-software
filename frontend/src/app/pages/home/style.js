import styled from 'styled-components';
import {Colors} from '../../util/index';

export const Nav = styled.div`
    background-color: ${Colors().base};
    padding-top: 2px;
    padding-bottom: 0px;
    padding-left: 2vh;
    padding-right: 2px;
    border-radius: 15px;
    margin: 5px;
    box-shadow: 3px 3px 3px rgba(0,0,0,0.5);
    display: grid;
    grid-template-columns: auto auto auto;
`
export const NavImage = styled.img`
    width: 90px;
    margin-top: 1vh;
    margin-bottom: 1vh;
`
export const Footer = styled.footer`
    position: absolute;
    right: 2vh;
    bottom: 2vh;
    font-size: 0.6em;
`
export const Container = styled.div`
    padding: 2vh;
    overflow-x: hidden;
    overflow-y: hidden;
    display: grid;
    grid-template-columns: 25% auto;
    grid-template-rows: minmax();
    height: 82vh;
`
export const Section = styled.section`
    overflow-x: hidden;
    border-radius: 5px;
    max-height: 85vh;
`
export const Main = styled.main`
    box-shadow: 0px 0px 10px black;
    border-radius: 5px;
    padding: 1vh;
    max-height: 85vh;
    overflow-y: scroll;
`
export const CardItem = styled.button`
    background-color: ${Colors().white};
    width: 10vw;
    height: 10vh;
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