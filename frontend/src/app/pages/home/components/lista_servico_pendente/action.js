import {useState,useEffect} from 'react';
import {
    ListaServicoPendente,
    DivideDados
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
import {generationError} from '../../../../error/index';
import {listRoutes} from '../../../../routes/lista.routes';
import { useHistory } from 'react-router-dom';

export const useListServicoPendente = () => {
    const [listPendente, setListPendente] = useState([]);
    const {setCliente,cliente} = useCliente();
    const {setComputer} = useComputer();
    const {setServico, servico} = useServico();
    const {addAlert} = useAlert();
    const {showLoarding, hiddeLoarding} = useLoarding();
    const {setTelaCliente, setTelaComputer, setTelaServico} = useTelasCriar();
    const history = useHistory();

    const separarDados = (dados) => {
        let newDados = DivideDados(dados);
        setCliente(newDados.cliente);
        setComputer(newDados.computador);
        setServico(newDados.servico[0]);
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
                setListPendente(await ListaServicoPendente());
                await hiddeLoarding();
            } catch (error) {
                addAlert(generationError('004-B'));
            }finally{
                await hiddeLoarding();
            }
        }
        init();
    },[])

    return [
        separarDados,
        listPendente
    ]
}