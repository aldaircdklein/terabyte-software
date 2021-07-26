import {useState, useEffect} from 'react';
import socketio from 'socket.io-client';
import {
    useComputer,
    useCliente,
    useServico,
    useVenda
} from '../../../contexts/index';
import {
    CadastrarComputer,
    AtualizarComputer,
    ExcluirComputer,
    AddComputerList,
    ModificarListCliente,
    DataListComputer
} from './service';
import {ValidationDados} from '../../../../../util/index';
import {
    useAlert,
    useModal,
    useTelasCriar,
    useLoarding
} from '../../../../../util/contexts/index';
import {
    generationError,
    generationSuccess,
    generationWarning
} from '../../../../../error/index';
import { useHistory } from 'react-router-dom';
import {listRoutes} from '../../../../../routes/lista.routes';

export const useTelaComputer = () => {
    const [code, setCode] = useState('');
    const [computerModel, setComputerModel] = useState('');
    const {computer, setComputer, listComputers, setListComputers} = useComputer();
    const {cliente, setCliente} = useCliente();
    const {setListServicos, setServico, listServicos} = useServico();
    const {setListVenda} = useVenda();
    const {addAlert} = useAlert();
    const {showLoarding, hiddeLoarding} = useLoarding();
    const {setTelaComputer, setTelaServico} = useTelasCriar();
    const [validation, setValidation] = useState(false);
    const [dataListComp, setDataListComp] = useState({list:[]});
    const [modalConfirmation, setModalConfirmation] = useState('cadatrar');
    const {setOnShowModal2} = useModal();
    const history = useHistory();

    const generationJson = () => {
        return {
            code,
            computerModel,
            userId: cliente._id,
        }
    }

    const salvarDados = async (tipo) => {
        if(tipo === 'cadastrar'){
            try {
                if(ValidationDados([code,computerModel])){
                    await showLoarding();
                    const result = await CadastrarComputer(generationJson());
                    setComputer(result.data);
                    setListComputers(AddComputerList(listComputers,result.data));
                    setDataListComp(await DataListComputer(computerModel,dataListComp));
                    addAlert(generationSuccess('011-A'));
                }else{
                    setValidation(true);
                    addAlert(generationWarning('002-C'));
                }  
            } catch (error) {
                addAlert(generationError('018-B'));
            }finally{
                await hiddeLoarding();
            }
        }else if(tipo === 'atualizar'){
            try {
                if(ValidationDados([code,computerModel])){
                    await showLoarding();
                    const result = await AtualizarComputer(generationJson(),computer._id);
                    result.data.serviceOrders = listServicos;
                    let newCliente = cliente;
                    newCliente.computers = ModificarListCliente(newCliente.computers,computer._id,result.data);
                    setCliente(newCliente);
                    setListComputers(ModificarListCliente(listComputers,computer._id,result.data));
                    setComputer(result.data);
                    addAlert(generationSuccess('012-A'));
                }else{
                    setValidation(true);
                    addAlert(generationWarning('002-C'));
                } 
            } catch (error) {
                addAlert(generationError('019-B'));
            }finally{
                await hiddeLoarding();
            }
        }else if(tipo === 'excluir'){
            try {
                await showLoarding();
                await ExcluirComputer(computer._id);
                let newCliente = cliente;
                newCliente.computers = ModificarListCliente(newCliente.computers,computer._id,null);
                setCliente(newCliente);
                setListComputers(ModificarListCliente(listComputers,computer._id,null));
                resetTelaComputer();
                addAlert(generationSuccess('013-A'));
                history.push(listRoutes().clienteList);
            } catch (error) {
                addAlert(generationError('020-B'));
            }finally{
                await hiddeLoarding();
            }
        }
    }

    const selecionarServico = (element) => {
        setTelaComputer('atualizar');
        setTelaServico('cadastrar');
        setComputer(element);
        setServico({});
        setListVenda([]);
    }

    const resetTelaComputer = () => {
        setCode('');
        setComputerModel('');
        setComputer({});
        setTelaComputer('cadastrar');
        setTelaServico('cadastrar');
        setServico({});
    }
    const PreencherCodigo = (dado) => {
        setCode(dado)
    }
    const PreencherModeloComputador = (dado) => {
        setComputerModel(dado);
    }
    const ModificationModalConfirmation = (status) => {
        setModalConfirmation(status);
    }
    const ModificationShowModal2 = (status) => {
        setOnShowModal2(status);
    }

    useEffect(()=>{
        (async ()=>{
            const socket = await socketio('http://localhost:3333');
            socket.on("responseCode", data => {
                setCode(data);
            })
        })()
    },[]);

    useEffect(()=>{
        try {
            if(computer._id !== undefined){
                setCode(computer.code);
                setComputerModel(computer.computerModel);
                setListServicos(computer.serviceOrders);
            }
        } catch (error) {}
    },[computer]);

    useEffect(()=>{
        async function init(){
            try {
                await showLoarding();
                setDataListComp(await DataListComputer());   
            } catch (error) {

            }finally{
                await hiddeLoarding();
            }
        }
        init();
    },[])

    return [
        salvarDados,
        selecionarServico,
        resetTelaComputer,
        code,
        computerModel,
        validation,
        listComputers,
        dataListComp,
        PreencherCodigo,
        PreencherModeloComputador,
        modalConfirmation,
        ModificationModalConfirmation,
        ModificationShowModal2
    ]

}