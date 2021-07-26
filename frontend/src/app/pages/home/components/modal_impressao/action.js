import {useState, useEffect} from 'react';
import {
    useCliente,
    useComputer,
    useServico,
    useVenda
} from '../../contexts/index';
import {
    useModal,
    useLoarding
} from '../../../../util/contexts/index';
import {
    buscarCabecalho,
    CalcularValorTotal
} from './service';
import {GerarImpressao} from '../../../../util/index'

export const useModalImpressao = () => {
    const {onShowModal1, setOnShowModal1} = useModal();
    const [show,setShow] = useState(false);
    const {cliente} = useCliente();
    const {computer} = useComputer();
    const {servico} = useServico();
    const {listVenda} = useVenda();
    const [total, setTotal] = useState(0);
    const [cabecalho, setCabecalho] = useState({});
    const {showLoarding, hiddeLoarding} = useLoarding();

    const generationJson = () => {
        return {
            cabecalho,
            cliente,
            computer,
            servico,
            listVenda,
            total
        }
    }

    const enviarConteudo = (conteudo) => {
        GerarImpressao(conteudo, true);
    }

    const ModificationShow = (status) => {
        setShow(status);
    }

    const ModificationShowModal1 = (status) => {
        setOnShowModal1(status)
    }

    useEffect(()=>{
        async function init(){
            try {
                await showLoarding();
                setCabecalho(await buscarCabecalho());
                setTotal(CalcularValorTotal(listVenda));
                setShow(onShowModal1);   
            } catch (error) {
                
            }finally{
                await hiddeLoarding();
            }
        }
        init();
    },[onShowModal1]);

    return [
        generationJson,
        enviarConteudo,
        show,
        ModificationShow,
        ModificationShowModal1
    ]
}