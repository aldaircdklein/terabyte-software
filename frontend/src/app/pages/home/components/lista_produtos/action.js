import { useState, useEffect } from "react";
import socketio from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import{
    ListaProdutos,
    ListaProdutosTodos
} from './service';
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
    beepAlerta,
    setStoreNavigation,
    execStoreNavigation,
    setLoadStore
} from '../../../../util/index';
import {useProduto} from '../../contexts/index';
import {listRoutes} from '../../../../routes/lista.routes';

export const useActionListProduto = () => {
    const {setProduto,produto} = useProduto();
    const [listProduto, setListProduto] = useState([]);
    const [busca, setBusca] = useState('');
    const {addAlert} = useAlert();
    const {showLoarding, hiddeLoarding} = useLoarding();
    const {setTelaProduto} = useTelasCriar();
    const [validation, setValidation] = useState(false);
    const history = useHistory();
    const [select, setSelect] = useState(false);
    const [buscaStore, setBuscaStore] = useState(true);

    const Buscar = async (dado) => {
        try {
            if(ValidationDados([busca]) || dado){
                await showLoarding();
                const newLista = await ListaProdutos(dado? dado:busca);
                setStoreNavigation({busca: dado? dado:busca}, 'Buscar');
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

    const BuscarTodos = async () => {
        try {
            await showLoarding();
            const newLista = await ListaProdutosTodos();
            setStoreNavigation(null, 'BuscarTodos');
            setListProduto(newLista);   
        } catch (error) {
            addAlert(generationError('002-B'));
        }finally{
            await hiddeLoarding();
        }
    }

    const AddProduto = (newProduto) => {
        setProduto(newProduto);
        setSelect(true);
    }

    const PreencherBusca = (dados) => {
        setBuscaStore(false);
        setBusca(dados.toUpperCase());
    }

    useEffect(() => {
        if(execStoreNavigation() && buscaStore){
            setLoadStore(
                [{variable: 'busca', value:busca, func:setBusca}],
                execStoreNavigation().data,
                () => {
                    eval(
                        execStoreNavigation().execFunction
                    )()
                }
            )
        }
    }, [busca]);

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
        if(produto._id !== undefined && select){
            setTelaProduto('atualizar');
            history.push(listRoutes().productCreate);
        }
    },[produto, select])

    return [
        listProduto,
        validation,
        busca,
        Buscar,
        AddProduto,
        PreencherBusca,
        BuscarTodos
    ]
}