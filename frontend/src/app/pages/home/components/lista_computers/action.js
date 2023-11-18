import {useState, useEffect} from 'react';
import socketio from 'socket.io-client';
import {
    useAlert,
    useTelasCriar,
    useLoarding
} from '../../../../util/contexts/index';
import {
    ValidationDados,
    beepAlerta,
    setStoreNavigation,
    execStoreNavigation,
    setLoadStore
} from '../../../../util/index';
import {
    generationError,
    generationWarning
} from '../../../../error/index';
import {
    useCliente,
    useComputer
} from '../../contexts/index';
import {listRoutes} from '../../../../routes/lista.routes';
import { useHistory } from 'react-router-dom';
import{
    ListaComputers,
    DivideDados
} from './service';

export const useListComputer = () => {
    const {setCliente,cliente} = useCliente();
    const {setComputer, computer} = useComputer();
    const [listComputer, setListComputer] = useState([]);
    const [busca, setBusca] = useState('');
    const {addAlert} = useAlert();
    const {showLoarding, hiddeLoarding} = useLoarding();
    const {setTelaCliente, setTelaComputer, setTelaServico} = useTelasCriar();
    const [validation, setValidation] = useState(false);
    const history = useHistory();
    const [select, setSelect] = useState(false);
    const [buscaStore, setBuscaStore] = useState(true);

    const Buscar = async (dado) => {
        try {
            if(ValidationDados([busca]) || dado){
                await showLoarding();
                const newLista = await ListaComputers(dado? dado:busca);
                if(!execStoreNavigation()){
                    setStoreNavigation({busca: dado? dado:busca}, 'Buscar');
                }
                setListComputer(newLista);
            }else{
                setValidation(true);
                addAlert(generationWarning('003-C'));
            }   
        } catch (error) {
            addAlert(generationError('005-B'));
        }finally{
            await hiddeLoarding();
        }
    }

    const separarDados = (dados) => {
        let newDados = DivideDados(dados);
        setCliente(newDados.cliente);
        setComputer(newDados.computador);
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
        (async ()=>{
            const socket = await socketio('http://localhost:3333');
            socket.on("responseCode", data => {
                Buscar(data);
                beepAlerta(true);
            })
        })()
    },[]);

    useEffect(()=>{
        if(cliente._id !== undefined && select){
            setTelaCliente('atualizar');
            setTelaComputer('atualizar');
            setTelaServico('cadastrar');
            history.push(listRoutes().clienteCreate);
        }
    },[computer, select])

    return [
        busca,
        validation,
        listComputer,
        Buscar,
        separarDados,
        PreencherBusca
    ]
}