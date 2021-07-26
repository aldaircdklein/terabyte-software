import {useState, useEffect} from 'react';
import socketio from 'socket.io-client';
import {useProduto} from '../../contexts/index';
import {
    ValidationDados,
    beepAlerta
} from '../../../../util/index';
import {
    CreateProduto,
    AtualizarProduto,
    ExcluirProduto
} from './service';
import {
    useAlert,
    useModal,
    useTelasCriar,
    useLoarding
} from '../../../../util/contexts/index';
import {
    generationError,
    generationSuccess,
    generationWarning
} from '../../../../error/index';
import { useHistory } from 'react-router-dom';
import {listRoutes} from '../../../../routes/lista.routes';

export const useTelaProduto = () => {
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [cost, setCost] = useState(0.0);
    const [price, setPrice] = useState(0.0);
    const [minStock, setMinStock] = useState(1);
    const {addAlert} = useAlert();
    const {showLoarding, hiddeLoarding} = useLoarding();
    const {produto,setProduto} = useProduto();
    const [validation, setValidation] = useState(false);
    const {telaProduto, setTelaProduto} = useTelasCriar();
    const [modalConfirmation, setModalConfirmation] = useState('cadatrar');
    const {setOnShowModal2} = useModal();
    const history = useHistory();

    const generationJson = () => {
        return {
            code,
            name,
            description,
            quantity,
            cost,
            price,
            minStock
        }
    }

    const SalvarDados = async (tipo) => {
        if(tipo === 'cadastrar'){     
            try {
                if(ValidationDados([code,name,description,quantity,cost,price,minStock])){
                    await showLoarding();
                    const result = await CreateProduto(generationJson());
                    setProduto(result.data);
                    addAlert(generationSuccess('002-A'));
                    ResetDados();
                }else{
                    setValidation(true);
                    addAlert(generationWarning('002-C'));
                }   
            } catch (error) {
                addAlert(generationWarning('004-C'));
                setTimeout(()=>{
                    addAlert(generationError('009-B'));
                },1000);
            }finally{
                await hiddeLoarding();
            }
        }else if(tipo === 'atualizar'){
            try {
                if(ValidationDados([code,name,description,quantity,cost,price,minStock])){
                    await showLoarding();
                    const result = await AtualizarProduto(generationJson(),produto._id);
                    setProduto(result.data);
                    addAlert(generationSuccess('003-A'));
                }else{
                    setValidation(true);
                    addAlert(generationWarning('002-C'));
                }      
            } catch (error) {
                addAlert(generationError('010-B'));
            }finally{
                await hiddeLoarding();
            }
        }else if(tipo === 'excluir'){
            try {
                await showLoarding();
                await ExcluirProduto(produto._id);
                setProduto({});
                setTelaProduto('cadastrar');
                addAlert(generationSuccess('004-A'));
                history.push(listRoutes().productList);
            } catch (error) {
                addAlert(generationError('011-B'));
            }finally{
                await hiddeLoarding();
            }
        }
    }
    const PreencherCode = (dado) => {
        setCode(dado.toUpperCase());
    }
    const PreencherNome = (dado) => {
        setName(dado);
    }
    const PreencherDescription = (dado) => {
        setDescription(dado);
    }
    const PreencherQuantity = (dado) => {
        setQuantity(dado);
    }
    const PreencherCost = (dado) => {
        setCost(dado);
    }
    const PreencherPrice = (dado) => {
        setPrice(dado);
    }
    const PreencherMinStock = (dado) => {
        setMinStock(dado);
    }
    const ModificationModalConfirmation = (status) => {
        setModalConfirmation(status);
    }
    const ModificationShowModal2 = (status) => {
        setOnShowModal2(status);
    }
    const ResetDados = () => {
        setCode('');
        setName('');
        setDescription('');
        setQuantity(0);
        setMinStock(1);
        setCost(0.0);
        setPrice(0.0);
    }

    useEffect(()=>{
        (async ()=>{
            const socket = await socketio('http://localhost:3333');
            socket.on("responseCode", data => {
                setCode(data);
                beepAlerta(true);
            })
        })()
    },[]);

    useEffect(()=>{
        try {
            if(produto._id !== undefined){
                setCode(produto.code);
                setName(produto.name);
                setDescription(produto.description);
                setQuantity(produto.quantity);
                setMinStock(parseInt(produto.minStock));
                setCost((parseFloat(produto.cost)).toFixed(2));
                setPrice((parseFloat(produto.price)).toFixed(2));
            }
        } catch (error) {}
    },[produto])

    return [
        SalvarDados,
        code,
        name,
        description,
        quantity,
        cost,
        price,
        validation,
        PreencherCode,
        PreencherNome,
        PreencherDescription,
        PreencherQuantity,
        PreencherCost,
        PreencherPrice,
        PreencherMinStock,
        minStock,
        telaProduto,
        ModificationModalConfirmation,
        modalConfirmation,
        ModificationShowModal2
    ]
}