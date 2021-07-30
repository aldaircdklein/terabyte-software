import { useState, useEffect } from "react";
import {
    useAlert,
    useTelasCriar,
    useLoarding
} from '../../../../util/contexts/index';
import {ValidationDados} from '../../../../util/index';
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

    const Buscar = async () => {
        try {
            if(ValidationDados([busca])){
                await showLoarding();
                const newLista = await ListaClientes(busca);
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
            setListCliente(newLista);
        } catch (error) {
            addAlert(generationError('001-B'));
        }finally{
            await hiddeLoarding();
        }
    }

    const AddCliente = (newCliente) => {
        setCliente(newCliente);
    }

    const PreencherBusca = (dados) => {
        setBusca(dados);
    }

    useEffect(()=>{
        if(cliente._id !== undefined){
            setTelaCliente('atualizar');
            setTelaComputer('cadastrar');
            setTelaServico('cadastrar');
            history.push(listRoutes().clienteCreate);
        }
    },[cliente])

    return [
        Buscar,
        listCliente,
        AddCliente,
        validation,
        PreencherBusca,
        BuscarTodos
    ]
}