import {useState, useEffect} from 'react';
import { format } from 'date-fns';
import socketio from 'socket.io-client';
import {
    useAlert,
    useModal,
    useLoarding,
    useTelasCriar
} from '../../../../util/contexts/index';
import {
    ValidationDados,
    GerarImpressao,
    beepAlerta
} from '../../../../util/index';
import {
    generationError,
    generationSuccess,
    generationWarning
} from '../../../../error/index';
import {
    ListaProdutos,
    AdicionarProdutoLista,
    ModificarQuantidadeProduto,
    RemoverProdutoLista,
    CalcularValorTotal,
    EfetuarVenda,
    UpdateVenda,
    VerificarEstoque,
    buscarCabecalho
} from './service';
import {
    useVenda,
    useServico,
    useVinProduct
} from '../../contexts/index';
import {FolhaNotinha} from '../folha_impressao/index';
const crypto = require("crypto");

export const useModalCompra = () => {
    const {onShowModal, setOnShowModal, setOnShowModal2, setOnShowModalVinProduct} = useModal();
    const [show, setShow] = useState(false);
    const [busca, setBusca] = useState('');
    const [listProduto, setListProduto] = useState([]);
    const [selectProduto, setSelectProduto] = useState({});
    const [qtd, setQtd] = useState(1);
    const [paid, setPaid] = useState(false);
    const [paymentType, setPaymentType] = useState('onCredit');
    const [name, setName] = useState('');
    const [observation, setObservation] = useState('');
    const [discount, setDiscount] = useState(0);
    const [partPayment, setPartPayment] = useState(0);
    const {listVenda, setListVenda, total, setTotal, setIdVenda, idVenda} = useVenda();
    const {servico} = useServico();
    const [validation, setValidation] = useState(false);
    const {addAlert} = useAlert();
    const {showLoarding, hiddeLoarding} = useLoarding();
    const [modalConfirmation, setModalConfirmation] = useState('undefined');
    const {telaServico} = useTelasCriar();
    const {vinItem, setVinItem} = useVinProduct();

    const efetuarBusca = async (dado) => {
        try {
            if(ValidationDados([busca]) || dado){
                await showLoarding();
                const result = await ListaProdutos(dado? dado:busca);
                if(result[0] !== null){
                    setListProduto(result);
                    if(result.length >= 1){
                        setSelectProduto(result[0]._id);
                    }
                }else{
                    addAlert(generationError('006-B'));
                    beepAlerta(false);
                }
            }else{
                setValidation(true);
                addAlert(generationWarning('003-C'));
            }   
        } catch (error) {
            addAlert(generationError('007-B'));
        }finally{
            await hiddeLoarding();
        }
    }

    const generationCodeRandomic = () => {
        return `${format(new Date(), 'ddMMyyyyHHmmss')}${crypto.randomBytes(20).toString('hex')}`;
    }

    const generationJSON = (typeRequest) => {
        let newList = listVenda.map((element) => {
            element.newItem = undefined;
            return {
                product:element.product._id,
                quantity:parseInt(element.quantity)
            }
        });
        return {
            items: newList,
            paid,
            paymentType,
	        name: !paid? name:undefined,
            serviceOrder: typeRequest === 'servico'? servico._id:undefined,
            code: generationCodeRandomic(),
            observation,
            discount,
            partPayment
        }
    }

    const salvarDados = async (tipo) => {
        if(paid || ValidationDados([name]) || tipo === 'servico'){
            await showLoarding();
            try {
                if(telaServico === 'atualizar' && idVenda){
                    const result = await UpdateVenda(generationJSON(tipo), idVenda);
                    setIdVenda(result.data._id);
                    addAlert(generationSuccess('001-A'));
                }else{
                    const result = await EfetuarVenda(generationJSON(tipo));
                    setIdVenda(result.data._id);
                    addAlert(generationSuccess('001-A'));
                    if(tipo !== 'servico'){
                        imprimirNotinha(generationJSON(tipo),result.data._id); 
                    }
                }
                setVinItem(false);
            } catch (error) {
                addAlert(generationError('008-B'));
            }finally{
                await hiddeLoarding();
            }
        }else{
            setValidation(true);
            addAlert(generationWarning('003-C'));
        }
    }

    const imprimirNotinha = async (dados, id) => {
        const cabecalho = await buscarCabecalho()
        const newJson = {
            _id: id,
            code: dados.code,
            observation: dados.observation,
            cabecalho,
            name: dados.name,
            paymentType: dados.paymentType,
            discount:dados.discount,
            listVenda,
            total
        }
        GerarImpressao(FolhaNotinha(newJson, false));
    }

    const addProduto = (typeRequest) => {
        if(VerificarEstoque({listProduto,selectProduto})){
            addAlert(generationWarning('001-C'));
        }
        if(typeRequest === "servico") {
            setVinItem(true);
        }
        setListVenda(AdicionarProdutoLista({listVenda,listProduto,selectProduto,qtd,typeRequest}));
        setQtd(1);
    }

    const resetTela = () => {
        setBusca('');
        setListProduto(Array.from([]));
        setSelectProduto({});
        setQtd(1);
        setPaid(false);
        setPaymentType('onCredit');
        setName('');
        setDiscount(0);
        setPartPayment(0);
        setValidation(false);
    }

    const modificarQuantidade = (quantidade,id,typeRequest) => {
        if(typeRequest === "servico") {
            setVinItem(true);
        }
        setListVenda(ModificarQuantidadeProduto({listVenda,quantidade,id,typeRequest}));
    }

    const removerProduto = (id) => {
        setListVenda(RemoverProdutoLista({listVenda,id}));
    }

    const ModificationShow = (status, typeRequest, force) => {
        if(typeRequest === "servico") {
            if(listVenda.length > 0 && vinItem && !force){
                setModalConfirmation("cancelarVin");
                ModificationModalVinProduct(true);
                addAlert(generationWarning('005-C'));
            } else {
                setShow(status);
            }
        }else {
            setShow(status);
        }
    }

    const ModificationShowModal = (status, typeRequest, force) => {
        if(typeRequest === "servico") {
            if(!(listVenda.length > 0 && vinItem && !force)){
                setOnShowModal(status);
            } 
        }else {
            setOnShowModal(status);
        }
    }

    const ModificationShowModal2 = (status) => {
        setOnShowModal2(status);
    }
    const ModificationModalVinProduct = (status) => {
        setOnShowModalVinProduct(status);
    }
    const ModificationModalConfirmation = (status) => {
        setModalConfirmation(status);
    }
    const PreencherBusca = (dado) => {
        setBusca(dado)
    }
    const PreencherQtd = (dado) => {
        setQtd(dado);
    }
    const SelecionarProduto = (newProduto) => {
        setSelectProduto(newProduto);
    }
    const PreencherPayment = (dado) => {
        setPaymentType(dado);
        setPaid(dado === 'onCredit'? false:true);
    }
    const PreencherName = (dado) => {
        setName(dado);
    }
    const PreencherObservacao = (dado) => {
        setObservation(dado)
    }
    const PreencherDesconto = (dado) => {
        setDiscount(dado);
    }
    const PreencherPartePagamento = (dado) => {
        setPartPayment(dado)
    }

    useEffect(()=>{
        (async ()=>{
            const socket = await socketio('http://localhost:3333');
            socket.on("responseCode", data => {
                efetuarBusca(data);
                beepAlerta(true);
            })
        })()
    },[]);

    useEffect(()=>{
        setTotal(CalcularValorTotal({listVenda}));
    },[listVenda])
        
    useEffect(()=>{
        setShow(onShowModal);
        if(!onShowModal){
            resetTela();
        }
    },[onShowModal])

    return [
        show,
        validation,
        modalConfirmation,
        qtd,
        busca,
        listProduto,
        selectProduto,
        listVenda,
        total,
        paid,
        paymentType,
        observation,
        discount,
        partPayment,
        name,
        vinItem,
        salvarDados,
        efetuarBusca,
        addProduto,
        modificarQuantidade,
        removerProduto,
        ModificationShow,
        ModificationShowModal,
        ModificationShowModal2,
        PreencherBusca,
        ModificationModalConfirmation,
        PreencherQtd,
        SelecionarProduto,
        PreencherPayment,
        PreencherName,
        PreencherObservacao,
        PreencherDesconto,
        PreencherPartePagamento
    ]
}