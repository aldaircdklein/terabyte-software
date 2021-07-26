import {useState, useEffect} from 'react';
import {
    useModal,
    useAlert,
    useTelasCriar,
    useLoarding,
    useBloqueioMenu
} from '../../../../../util/contexts/index';
import {
    generationError,
    generationSuccess,
    generationWarning
} from '../../../../../error/index';
import {
    useServico,
    useComputer,
    useCliente,
    useVenda
} from '../../../contexts/index';
import {
    CadastrarServico,
    AtualizarServico,
    ExcluirServico,
    AddServicoList,
    ModificarListCliente,
    EnviarMensagemAutomatica,
    FinalizarServico,
    CalculaTotalVenda,
    ModificarStatusVenda
} from './service';
import {ValidationDados} from '../../../../../util/index';
import { format, parseISO } from 'date-fns';
import { useHistory } from 'react-router-dom';
import {listRoutes} from '../../../../../routes/lista.routes';
const crypto = require("crypto");

export const useTelaServico = () => {
    const [code, setCode] = useState('');
    const [voltage, setVoltage] = useState('110V');
    const [password, setPassword] = useState('');
    const [energySource, setEnergySource] = useState('Não se aplica');
    const [missingScrew, setMissingScrew] = useState(false);
    const [calling, setCalling] = useState(true);
    const [broken, setBroken] = useState(false);
    const [open, setOpen] = useState(false);
    const [observation, setObservation] = useState('Nenhuma');
    const [backup, setBackup] = useState(true);
    const [handbag, setHandbag] = useState(false);
    const [problemDescription, setProblemDescription] = useState('');
    const [diagnostic, setDiagnostic] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [servicePrice, setServicePrice] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate,setEndDate] = useState('');
    const [finished, setFinished] = useState(false);
    const [paid, setPaid] = useState(false);
    const [paymentType, setPaymentType] = useState('onCredit');
    const [discount, setDiscount] = useState(0);
    const [partPayment, setPartPayment] = useState(0);
    const {setOnShowModal, setOnShowModal1, setOnShowModal2} = useModal();
    const {servico, setServico, listServicos, setListServicos} = useServico();
    const {computer} = useComputer();
    const {cliente} = useCliente();
    const [valueTotal, setValueTotal] = useState(0);
    const {addAlert} = useAlert();
    const {showLoarding, hiddeLoarding} = useLoarding();
    const [validation, setValidation] = useState(false);
    const {setTelaServico} = useTelasCriar();
    const {listVenda, setListVenda, idVenda, setIdVenda} = useVenda();
    const [modalConfirmation, setModalConfirmation] = useState('cadatrar');
    const history = useHistory();
    const {setBloqueioMenu} = useBloqueioMenu();

    const generationCodeRandomic = () => {
        return `${format(new Date(), 'ddMMyyyyHHmmss')}${crypto.randomBytes(15).toString('hex')}`;
    }

    const generationJson = (typeRequest) => {
        return {
            code: typeRequest === 'cadastrar'? generationCodeRandomic():code,
            voltage,
            password,
            energySource,
            missingScrew,
            calling,
            broken,
            open,
            observation,
            backup,
            handbag,
            problemDescription,
            diagnostic,
            serviceDescription,
            servicePrice,
            discount,
            partPayment,
            startDate: typeRequest === 'cadastrar'? undefined:startDate,
            finished: typeRequest === 'cadastrar'? undefined:finished,
            paid: typeRequest === 'cadastrar'? undefined:paid,
	        paymentType: typeRequest === 'cadastrar'? undefined:paymentType,
            computerId: computer._id,
        }
    }

    const salvarDados = async (tipo) => {
        if(tipo === 'cadastrar'){
            try {
                if(ValidationDados([problemDescription])){
                    await showLoarding();
                    const result = await CadastrarServico(generationJson(tipo));
                    setBloqueioMenu(false);
                    setServico(result.data);
                    setListServicos(AddServicoList(listServicos,result.data));
                    addAlert(generationSuccess('008-A'));
                }else{
                    setValidation(true);
                    addAlert(generationWarning('002-C'));
                }
            } catch (error) {
                addAlert(generationError('015-B'));
            }finally{
                await hiddeLoarding();
            }
        }else if(tipo === 'atualizar'){
            try {
                if(ValidationDados([problemDescription])){
                    await showLoarding();
                    const result = await AtualizarServico(generationJson(tipo),servico._id);
                    let newCliente = cliente;
                    let posicaoComputer = cliente.computers.findIndex((element) => {return element._id === computer._id});          
                    newCliente.computers[posicaoComputer].serviceOrders = ModificarListCliente(newCliente.computers[posicaoComputer].serviceOrders,servico._id,result.data);
                    setListServicos(ModificarListCliente(listServicos,servico._id,result.data))
                    setServico(result.data);
                    if(idVenda !== ''){
                        await ModificarStatusVenda(listVenda,{paid:result.data.paid,paymentType:result.data.paymentType,_id:idVenda});
                    }
                    addAlert(generationSuccess('009-A'));
                }else{
                    setValidation(true);
                    addAlert(generationWarning('002-C'));
                }
            } catch (error) {
                addAlert(generationError('016-B'));
            }finally{
                await hiddeLoarding();
            }
        }else if(tipo === 'excluir'){
            try {
                await showLoarding();
                await ExcluirServico(servico._id);
                let newCliente = cliente;
                let posicaoComputer = cliente.computers.findIndex((element) => {return element._id === computer._id});          
                newCliente.computers[posicaoComputer].serviceOrders = ModificarListCliente(newCliente.computers[posicaoComputer].serviceOrders,servico._id,null);
                setListServicos(ModificarListCliente(listServicos,servico._id,null))
                resetTelaServico();
                addAlert(generationSuccess('010-A'));
                history.push(listRoutes().clienteList);
            } catch (error) {
                addAlert(generationError('017-B'));
            }finally{
                await hiddeLoarding();
            }
        }
    }

    const ReenviarWhatsapp = () => {
        const dados = {
            cliente,
            computer,
            servico
        }
        EnviarMensagemAutomatica(dados);
    }
    const finalizarServico = async () => {
        try {
            
            await showLoarding();
            ReenviarWhatsapp();
            const result = await FinalizarServico(servico._id);
            let newCliente = cliente;
            let posicaoComputer = cliente.computers.findIndex((element) => {return element._id === computer._id});          
            newCliente.computers[posicaoComputer].serviceOrders = ModificarListCliente(newCliente.computers[posicaoComputer].serviceOrders,servico._id,result.data);
            setListServicos(ModificarListCliente(listServicos,servico._id,result.data))
            setServico(result.data);
            addAlert(generationSuccess('014-A'));
        } catch (error) {
            addAlert(generationError('021-B'));
        }finally{
            await hiddeLoarding();
        }
    }

    const selecionarServico = (element) => {
        setTelaServico('atualizar');
        setServico(element);
        setListVenda([]);
    }

    const resetTelaServico = () => {
        setCode('')
        setVoltage('110V');
        setPassword('');
        setEnergySource('Não se aplica');
        setMissingScrew(false);
        setCalling(true);
        setBroken(false);
        setOpen(false);
        setObservation('Nenhuma');
        setBackup(true);
        setHandbag(false);
        setProblemDescription('');
        setDiagnostic('');
        setServiceDescription('');
        setServicePrice(0);
        setFinished(false);
        setServico({});
        setTelaServico('cadastrar');
        setListVenda([]);
    }
    const PreencherVoltagem = (dado) => {
        setVoltage(dado);
    }
    const PreencherSenha = (dado) => {
        setPassword(dado);
    }
    const PreencherFonteEnergia = (dado) => {
        setEnergySource(dado);
    }
    const PreencherFaltaParafuso = (dado) => {
        setMissingScrew(dado);
    }
    const PreencherLigando = (dado) => {
        setCalling(dado);
    }
    const PreencherQuebrado = (dado) => {
        setBroken(dado);
    }
    const PreencherAberto = (dado) => {
        setOpen(dado);
    }
    const PreencherObservacao = (dado) => {
        setObservation(dado);
    }
    const PreencherBackup = (dado) => {
        setBackup(dado);
    }
    const PreencherBolsa = (dado) => {
        setHandbag(dado);
    }
    const PreencherProblemDescription = (dado) => {
        setProblemDescription(dado);
    }
    const PreencherDiagnostic = (dado) => {
        setDiagnostic(dado);
    }
    const PreencherServiceDescription = (dado) => {
        setServiceDescription(dado);
    }
    const PreencherServicePrice = (dado) => {
        setServicePrice(dado);
    }
    const PreencherStartDate = (dado) => {
        setStartDate(dado);
    }
    const ModificationModalConfirmation = (status) => {
        setModalConfirmation(status);
    }
    const ModificationShowModal = (status) => {
        setOnShowModal(status);
    }
    const ModificationShowModal1 = (status) => {
        setOnShowModal1(status);
    }
    const ModificationShowModal2 = (status) => {
        setOnShowModal2(status);
    }
    const PreencherPayment = (dado) => {
        setPaymentType(dado);
        setPaid(dado === 'onCredit'? false:true);
    }
    const PreencherDesconto = (dado) => {
        setDiscount(dado);
    }
    const PreencherPartePagamento = (dado) => {
        setPartPayment(dado);
    }

    useEffect(()=>{
        try {
            if(servico._id !== undefined){
                    if(servico.endDate){setEndDate(servico.endDate)}
                    setServicePrice((parseFloat(servico.servicePrice)).toFixed(2));
                    setCode(servico.code);
                    setVoltage(servico.voltage);
                    setPassword(servico.password);
                    setEnergySource(servico.energySource);
                    setMissingScrew(servico.missingScrew);
                    setCalling(servico.calling);
                    setBroken(servico.broken);
                    setOpen(servico.open);
                    setObservation(servico.observation);
                    setBackup(servico.backup);
                    setHandbag(servico.handbag);
                    setProblemDescription(servico.problemDescription);
                    setDiagnostic(servico.diagnostic);
                    setServiceDescription(servico.serviceDescription);
                    setStartDate(format(parseISO(servico.startDate), 'yyyy-MM-dd'));
                    setFinished(servico.finished);
                    setPaid(servico.paid);
                    setPaymentType(servico.paymentType);
                    setDiscount((parseFloat(servico.discount)).toFixed(2));
                    setPartPayment((parseFloat(servico.partPayment)).toFixed(2));
                    if(servico.sold.items){
                        setValueTotal(parseFloat(servico.servicePrice? servico.servicePrice:0) + parseFloat(servico.sold.total))
                        const newArray = (servico.sold.items).map(element => {
                            return Array.isArray(element.product)? {product:element.product[0],quantity:element.quantity}:element
                        })
                        setListVenda(newArray);
                        setIdVenda(servico.sold._id);
                    }else{
                        setValueTotal(parseFloat(servico.servicePrice? servico.servicePrice:0) + parseFloat(CalculaTotalVenda(listVenda)))
                    }
            }
        } catch (error) {}
    },[servico]);

    useEffect(()=>{
        setValueTotal(parseFloat(servico.servicePrice? servico.servicePrice:0) + parseFloat(CalculaTotalVenda(listVenda)))
    },[listVenda])

    useEffect(()=>{
        setValueTotal(parseFloat(servicePrice) + parseFloat(CalculaTotalVenda(listVenda)))
    },[servicePrice])

    return [
        salvarDados,
        finalizarServico,
        ReenviarWhatsapp,
        selecionarServico,
        resetTelaServico,
        voltage,
        password,
        energySource,
        missingScrew,
        calling,
        broken,
        open,
        observation,
        backup,
        handbag,
        problemDescription,
        diagnostic,
        serviceDescription,
        servicePrice,
        startDate,
        endDate,
        finished,
        validation,
        valueTotal,
        modalConfirmation,
        listServicos,
        listVenda,
        PreencherVoltagem,
        PreencherSenha,
        PreencherFonteEnergia,
        PreencherFaltaParafuso,
        PreencherLigando,
        PreencherQuebrado,
        PreencherAberto,
        PreencherObservacao,
        PreencherBackup,
        PreencherBolsa,
        PreencherProblemDescription,
        PreencherDiagnostic,
        PreencherServiceDescription,
        PreencherServicePrice,
        PreencherStartDate,
        ModificationModalConfirmation,
        ModificationShowModal,
        ModificationShowModal1,
        ModificationShowModal2,
        paid,
        paymentType,
        PreencherPayment,
        servico,
        discount,
        partPayment,
        PreencherDesconto,
        PreencherPartePagamento
    ]
}