import {useVenda} from '../../../contexts/index';
import {
    AtualizarServico,
    AtualizarVenda,
    FilterListVenda
} from './service';
import {
    generationError,
    generationSuccess
} from '../../../../../error/index';
import {
    useAlert,
    useLoarding
} from '../../../../../util/contexts/index';

export const useTableServico = () => {
    const {listVenda, setListVenda} = useVenda();
    const {addAlert} = useAlert();
    const {showLoarding, hiddeLoarding} = useLoarding();

    const generationJSON = (element, tipo) => {
        if(tipo === 'service'){
            return {
                voltage: element.voltage,
                password: element.password,
                energySource: element.energySource,
                missingScrew: element.missingScrew,
                calling: element.calling,
                broken: element.broken,
                open: element.open,
                observation: element.observation,
                problemDescription: element.problemDescription,
                diagnostic: element.diagnostic,
                serviceDescription: element.serviceDescription,
                servicePrice: element.servicePrice,
                finished: element.finished,
                paid: element.paid,
                paymentType: element.paymentType
            }
        }else{
            return {
                items: FilterListVenda(element.items),
                paid: element.paid,
                paymentType: element.paymentType,
                code: element.code,
                observation: element.observation,
                partPayment: element.partPayment,
                discount: element.discount       
            }
        }
    }
    const Salvar = async (element) => {
        try {
            await showLoarding();
            await AtualizarVenda(generationJSON(element,'sold'),element._id);
            if(element.serviceOrder){
                await AtualizarServico(generationJSON(element.serviceOrder,'service'),element.serviceOrder._id);
            }
            addAlert(generationSuccess('009-A'));
        } catch (error) {
            addAlert(generationError('016-B'));
        }finally{
            await hiddeLoarding();
        }
    }

    const SelectServiceSold = (dado) => {
        let newServiceSold = dado.element;
        newServiceSold.paymentType = dado.paymentType;
        if(dado.paymentType === 'onCredit'){
            newServiceSold.paid = false;
        }else{
            newServiceSold.paid = true;
        }
        if(newServiceSold.serviceOrder){
            newServiceSold.serviceOrder.paymentType = dado.paymentType;
            if(dado.paymentType === 'onCredit'){
                newServiceSold.serviceOrder.paid = false;
            }else{
                newServiceSold.serviceOrder.paid = true;
            }
        }
        let newArray = listVenda.map((element) => {
            if(element._id === dado.element._id){
                return newServiceSold;
            }else{
                return element;
            }
        });
        setListVenda(newArray);
    }

    const ModificationDesconto = (dado, valor) => {
        let newServiceSold = dado.element;
        newServiceSold.discount = Number(dado.element.discount) + Number(valor);

        let newArray = listVenda.map((element) => {
            if(element._id === dado.element._id){
                return newServiceSold;
            }else{
                return element;
            }
        });
        setListVenda(newArray);
    }

    const ModificationPartePagamento = (dado, valor) => {
        let newServiceSold = dado.element;
        newServiceSold.partPayment = Number(dado.element.partPayment) + Number(valor);

        let newArray = listVenda.map((element) => {
            if(element._id === dado.element._id){
                return newServiceSold;
            }else{
                return element;
            }
        });
        setListVenda(newArray);
    }

    return [
        SelectServiceSold,
        Salvar,
        ModificationDesconto,
        ModificationPartePagamento
    ]
}