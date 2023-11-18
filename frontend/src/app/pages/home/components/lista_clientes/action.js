import { useState, useEffect } from "react";
import {
    useAlert,
    useTelasCriar,
    useLoarding
} from '../../../../util/contexts/index';
import {
    ValidationDados,
    setStoreNavigation,
    execStoreNavigation,
    setLoadStore
} from '../../../../util/index';
import {
    useCliente
} from '../../contexts/index';
import {listRoutes} from '../../../../routes/lista.routes';
import {
    generationError,
    generationWarning
} from '../../../../error/index';
import { useHistory } from 'react-router-dom';
import{
    ListaClientes,
    ListaClientesTodos
} from './service';

export const useListClientes = () => {
    const {setCliente,cliente} = useCliente();
    const [listCliente, setListCliente] = useState([]);
    const [busca, setBusca] = useState('');
    const {addAlert} = useAlert();
    const {showLoarding, hiddeLoarding} = useLoarding();
    const {setTelaCliente, setTelaComputer, setTelaServico} = useTelasCriar();
    const [validation, setValidation] = useState(false);
    const history = useHistory();
    const [select, setSelect] = useState(false);
    const [buscaStore, setBuscaStore] = useState(true);

    const Buscar = async () => {
        try {
            if(ValidationDados([busca])){
                await showLoarding();
                const newLista = await ListaClientes(busca);
                if(!execStoreNavigation()){
                    setStoreNavigation({busca}, 'Buscar');
                }
                setListCliente(newLista);
            }else{
                setValidation(true);
                addAlert(generationWarning('003-C'));
            }
        } catch (error) {
            addAlert(generationError('001-B'));
        }finally{
            await hiddeLoarding();
        }
    }

    const BuscarTodos = async () => {
        try {
            await showLoarding();
            const newLista = await ListaClientesTodos();
            setStoreNavigation(null, 'BuscarTodos');
            setListCliente(newLista);
        } catch (error) {
            addAlert(generationError('001-B'));
        }finally{
            await hiddeLoarding();
        }
    }

    const AddCliente = (newCliente) => {
        setCliente(newCliente);
        setSelect(true);
    }

    const PreencherBusca = (dados) => {
        setBuscaStore(false);
        setBusca(dados);
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
        if(cliente._id !== undefined && select){
            setTelaCliente('atualizar');
            setTelaComputer('cadastrar');
            setTelaServico('cadastrar');
            history.push(listRoutes().clienteCreate);
        }
    },[cliente, select])

    return [
        busca,
        listCliente,
        validation,
        Buscar,
        AddCliente,
        PreencherBusca,
        BuscarTodos
    ]
}