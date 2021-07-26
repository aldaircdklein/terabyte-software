import {useState, useEffect} from 'react';
import socketio from 'socket.io-client';
import {
    ListaServicoConcluido,
    DivideDados,
    ListaServicoConcluidoByCode
} from './service'
import {
    useCliente,
    useComputer,
    useServico
} from '../../contexts/index';
import {
    useAlert,
    useTelasCriar,
    useLoarding
} from '../../../../util/contexts/index';
import {
    generationError,
    generationWarning
} from '../../../../error/index';
import {listRoutes} from '../../../../routes/lista.routes';
import { useHistory } from 'react-router-dom';
import {
    ValidationDados,
    beepAlerta
} from '../../../../util/index';


export const useListServicoConcluido = () => {
    const [listConcluido, setListConcluido] = useState([]);
    const {setCliente,cliente} = useCliente();
    const [busca, setBusca] = useState('');
    const {setComputer} = useComputer();
    const {setServico, servico} = useServico();
    const {addAlert} = useAlert();
    const {showLoarding, hiddeLoarding} = useLoarding();
    const [validation, setValidation] = useState(false);
    const {setTelaCliente, setTelaComputer, setTelaServico} = useTelasCriar();
    const history = useHistory();

    const Buscar = async (dado) => {
        try {
            if(ValidationDados([busca]) || dado){
                await showLoarding();
                const newLista = await ListaServicoConcluidoByCode(dado? dado:busca);
                setListConcluido(newLista);
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

    const separarDados = (dados) => {
        let newDados = DivideDados(dados);
        setCliente(newDados.cliente);
        setComputer(newDados.computador);
        setServico(newDados.servico[0]);
    }

    const PreencherBusca = (dados) => {
        setBusca(dados);
    }

    useEffect(()=>{
        if(cliente._id !== undefined){
            setTelaCliente('atualizar');
            setTelaComputer('atualizar');
            setTelaServico('atualizar');
            history.push(listRoutes().clienteCreate);
        }
    },[servico])

    useEffect(()=>{
        async function init(){
            try {
                await showLoarding();
                setListConcluido(await ListaServicoConcluido());
            } catch (error) {
                addAlert(generationError('003-B'))
            }finally{
                await hiddeLoarding();
            }
            const socket = await socketio('http://localhost:3333');
            socket.on("responseCode", data => {
                Buscar(data);
                beepAlerta(true);
            })
        }
        init();
    },[])

    return [
        separarDados,
        Buscar,
        PreencherBusca,
        listConcluido,
        validation,
        busca
    ]
}