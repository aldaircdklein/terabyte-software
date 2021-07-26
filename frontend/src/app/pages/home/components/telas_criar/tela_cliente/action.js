import {useState, useEffect} from 'react';
import {ValidationDados} from '../../../../../util/index';
import {
    useCliente,
    useComputer,
} from '../../../contexts/index';
import {
    CadastrarCliente,
    AtualizarCliente,
    ExcluirCliente
} from './service';
import {
    useAlert,
    useModal,
    useLoarding,
    useBloqueioMenu
} from '../../../../../util/contexts/index';
import {
    generationError,
    generationSuccess,
    generationWarning
} from '../../../../../error/index';
import { useHistory } from 'react-router-dom';
import {listRoutes} from '../../../../../routes/lista.routes';

export const useTelaCliente = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('22');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const {addAlert} = useAlert();
    const {showLoarding, hiddeLoarding} = useLoarding();
    const {cliente, setCliente} = useCliente();
    const [validation, setValidation] = useState(false);
    const {setListComputers} = useComputer();
    const [modalConfirmation, setModalConfirmation] = useState('cadatrar');
    const {setOnShowModal2} = useModal();
    const history = useHistory();
    const {setBloqueioMenu} = useBloqueioMenu();

    const generationJson = () => {
        return {
            name,
            phone,
            email,
            cpf
        }
    }

    const salvarDados = async (tipo) => {
        if(tipo === 'cadastrar'){
            try {
                if(ValidationDados([name,phone])){
                    await showLoarding();
                    const result = await CadastrarCliente(generationJson());
                    setBloqueioMenu(true);
                    setCliente(result.data);
                    addAlert(generationSuccess('005-A'));
                }else{
                    setValidation(true);
                    addAlert(generationWarning('002-C'));
                }  
            } catch (error) {
                addAlert(generationError('012-B'));
            }finally{
                await hiddeLoarding();
            }
        }else if(tipo === 'atualizar'){
            try {
                if(ValidationDados([name,phone])){
                    await showLoarding();
                    const result = await AtualizarCliente(generationJson(),cliente._id);
                    result.data.computers = cliente.computers;
                    setCliente(result.data);
                    addAlert(generationSuccess('006-A'));
                }else{
                    setValidation(true);
                    addAlert(generationWarning('002-C'));
                }  
            } catch (error) {
                addAlert(generationError('013-B'));
            }finally{
                await hiddeLoarding();
            }
        }else if(tipo === 'excluir'){
            try {
                await showLoarding();
                await ExcluirCliente(cliente._id);
                setCliente({});
                history.push(listRoutes().clienteList);
                addAlert(generationSuccess('007-A'));
            } catch (error) {
                addAlert(generationError('014-B'));
            }finally{
                await hiddeLoarding();
            }
        }
    }
    const EnviarMensagemCliente = () => {
        let telefone = cliente.phone.replace(/[^0-9]/g, '')
        window.open(`https://api.whatsapp.com/send?phone=55${telefone}`, "Mensagem automatica", "height=480,width=720");
    }
    const PreencherName = (dado) => {
        setName(dado);
    }
    const PreencherPhone = (dado) => {
        setPhone(dado);
    }
    const PreencherEmail = (dado) => {
        setEmail(dado);
    }
    const PreencherCpf = (dado) => {
        setCpf(dado);
    }
    const ModificationModalConfirmation = (status) => {
        setModalConfirmation(status);
    }
    const ModificationShowModal2 = (status) => {
        setOnShowModal2(status);
    }

    useEffect(()=>{
        try {
            if(cliente._id !== undefined){
                setName(cliente.name);
                setPhone(cliente.phone);
                setEmail(cliente.email);
                setCpf(cliente.cpf);
                setListComputers(cliente.computers);
            }
        } catch (error) {}
    },[cliente])

    return [
        salvarDados,
        name,
        phone,
        email,
        cpf,
        validation,
        modalConfirmation,
        EnviarMensagemCliente,
        PreencherName,
        PreencherPhone,
        PreencherEmail,
        PreencherCpf,
        ModificationModalConfirmation,
        ModificationShowModal2
    ]
}