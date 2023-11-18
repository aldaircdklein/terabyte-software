import {useState, useEffect} from 'react';
import socketio from 'socket.io-client';
import {
    ListaServicoConcluido,
    DivideDados,
    ListaServicoConcluidoByCode,
    ListaServicoConcluidoByDiagnostico,
    ListaServicoConcluidoNaoEntregue,
    ListaServicoConcluidoNaoExecutado
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
    beepAlerta,
    setStoreNavigation,
    execStoreNavigation,
    setLoadStore
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
    const [select, setSelect] = useState(false);
    const [buscaStore, setBuscaStore] = useState(true);

    const Buscar = async (dado) => {
        try {
            if(ValidationDados([busca]) || dado){
                await showLoarding();
                const newLista = await ListaServicoConcluidoByCode(dado? dado:busca);
                if(!execStoreNavigation()){
                    setStoreNavigation({busca: dado? dado:busca}, 'Buscar');
                }
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

    const BuscarDignostico = async () => {
        try {
            if(ValidationDados([busca])){
                await showLoarding();
                const newLista = await ListaServicoConcluidoByDiagnostico(busca);
                if(!execStoreNavigation()){
                    setStoreNavigation({busca}, 'BuscarDignostico');
                }
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
    const BuscarConcluidoNaoEntregue = async () => {
        try {
            await showLoarding();
            const newLista = await ListaServicoConcluidoNaoEntregue();
            setStoreNavigation(null, 'BuscarConcluidoNaoEntregue');
            setListConcluido(newLista);   
        } catch (error) {
            addAlert(generationError('002-B'));
        }finally{
            await hiddeLoarding();
        }
    }

    const BuscarConcluidoNaoExecutado = async () => {
        try {
            await showLoarding();
            const newLista = await ListaServicoConcluidoNaoExecutado();
            setStoreNavigation(null, 'BuscarConcluidoNaoExecutado');
            setListConcluido(newLista);   
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
            setTelaComputer('atualizar');
            setTelaServico('atualizar');
            history.push(listRoutes().clienteCreate);
        }
    },[servico, select])

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
        listConcluido,
        validation,
        busca,
        separarDados,
        Buscar,
        PreencherBusca,
        BuscarDignostico,
        BuscarConcluidoNaoEntregue,
        BuscarConcluidoNaoExecutado
    ]
}