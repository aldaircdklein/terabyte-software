import { useState, useEffect } from "react";
import socketio from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import{ListaProdutos} from './service';
import {
    useAlert,
    useTelasCriar,
    useLoarding
} from '../../../../util/contexts/index';
import {
    generationError,
    generationWarning
} from '../../../../error/index';
import {
    ValidationDados,
    beepAlerta
} from '../../../../util/index';
import {useProduto} from '../../contexts/index';
import {listRoutes} from '../../../../routes/lista.routes';

export const useListProduto = () => {
    const {setProduto,produto} = useProduto();
    const [listProduto, setListProduto] = useState([]);
    const [busca, setBusca] = useState('');
    const {addAlert} = useAlert();
    const {showLoarding, hiddeLoarding} = useLoarding();
    const {setTelaProduto} = useTelasCriar();
    const [validation, setValidation] = useState(false);
    const history = useHistory();

    const Buscar = async (dado) => {
        try {
            if(ValidationDados([busca]) || dado){
                await showLoarding();
                const newLista = await ListaProdutos(dado? dado:busca);
                setListProduto(newLista);
            }else{
                setValidation(true);
                addAlert(generationWarning('003-C'));
            }   
        } catch (error) {
            addAlert(generationError('002-B'));
        }finally{
            await hiddeLoarding();
        }
    }

    const AddProduto = (newProduto) => {
        setProduto(newProduto);
    }

    const PreencherBusca = (dados) => {
        setBusca(dados.toUpperCase());
    }

    useEffect(()=>{
        (async ()=>{
            const socket = await socketio('http://localhost:3333');
            socket.on("responseCode", data => {
                Buscar(data);
                beepAlerta(true);
            })
        })()
    },[]);

    useEffect(()=>{
        if(produto._id !== undefined){
            setTelaProduto('atualizar');
            history.push(listRoutes().productCreate);
        }
    },[produto])

    return [
        Buscar,
        listProduto,
        validation,
        AddProduto,
        PreencherBusca
    ]
}