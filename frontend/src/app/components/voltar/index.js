import { useEffect, useState } from 'react';
import {
    DivVoltar,
    ButtonVoltar,
    ButtonAtual,
    Span
} from './style';
import { useHistory } from "react-router-dom";
import {Icons} from '../../icons/index';
import {ListaMenu} from '../../pages/home/action';

export const NavigationVoltar = () => {
    const history = useHistory();
    const [breadcump, setBreadcump] = useState([]);

    const setHistory = () => {
        const newHistory = ListaMenu().filter(element => element.action === window.location.pathname);
        if(localStorage.getItem('breadcump')){
            const allHistory = JSON.parse(localStorage.getItem('breadcump'));
            const concatHistory = allHistory.concat(newHistory);
            localStorage.setItem('breadcump', JSON.stringify(concatHistory));
        } else {
            localStorage.setItem('breadcump', JSON.stringify(newHistory));
        }
    }

    const loadHistory = () => {
        if(localStorage.getItem('breadcump')){
            const allHistory = JSON.parse(localStorage.getItem('breadcump'));
            setBreadcump(allHistory);
        }
    }

    const before = () => {
        history.goBack();
        const allHistory = JSON.parse(localStorage.getItem('breadcump'));
        localStorage.setItem('breadcump', JSON.stringify(allHistory.splice(0, allHistory.length-2)));
        setBreadcump(allHistory.splice(0, allHistory.length-2));
    }

    useEffect(()=> {
        setHistory();
        loadHistory();
    },[])

    return (
        <DivVoltar>
            {breadcump.length > 1? (
                <ButtonVoltar key={`<${breadcump[breadcump.length-2].name}`} onClick={() => {before()}}>
                    <Span>{Icons().FaReply}</Span> {(breadcump[breadcump.length-2].name).toUpperCase()}
                </ButtonVoltar>
            ):<></>}
            {breadcump.length > 0? (
                <ButtonAtual key={`<${breadcump[breadcump.length-1].name}`}>
                    <Span>{Icons().FaBookmark}</Span> {(breadcump[breadcump.length-1].name).toUpperCase()}
                </ButtonAtual>
            ):<></>}
        </DivVoltar>
    )
}