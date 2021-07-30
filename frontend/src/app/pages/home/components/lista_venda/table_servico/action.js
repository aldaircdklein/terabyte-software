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
                paymentType: element.paymentType,
                partPayment: element.partPayment,
                discount: element.discount
            }
        }else{
            return {
                items: FilterListVenda(element.items),
                paid: element.paid,
                paymentType: element.paymentType            
            }
        }
    }

    const Salvar = async (element) => {
        try {
            await showLoarding();
            AtualizarServico(generationJSON(element, 'service'),element._id);
            if(element.sold._id){
                await AtualizarVenda(generationJSON(element.sold,'sold'),element.sold._id);
            }
            addAlert(generationSuccess('009-A'));
        } catch (error) {
            addAlert(generationError('016-B'));
        }finally{
            await hiddeLoarding();
        }
    }

    const SelectService = (dado) => {
        let newRegistro = dado.element;
        let newService = dado.element2;

        newService.paymentType = dado.paymentType;
        if(dado.paymentType === 'onCredit'){
            newService.paid = false;
        }else{
            newService.paid = true;
        }

        if(newService.sold._id){
            newService.sold.paymentType = dado.paymentType;
            if(dado.paymentType === 'onCredit'){
                newService.sold.paid = false;
            }else{
                newService.sold.paid = true;
            }   
        }

        let newArrayVenda = newRegistro.serviceOrders.map((element) => {
            if(element._id === dado.element2._id){
                return newService;
            }else{
                return element;
            }
        });

        newRegistro.serviceOrders = newArrayVenda;

        let newArray = listVenda.map((element) => {
            if(element.computer._id === dado.element.computer._id){
                return newRegistro;
            }else{
                return element;
            }
        });
        setListVenda(newArray);
    }

    const ModificationDesconto = (dado, valor) => {
        let newRegistro = dado.element;
        let newService = dado.element2;

        newService.discount = Number(valor);

        let newArrayVenda = newRegistro.serviceOrders.map((element) => {
            if(element._id === dado.element2._id){
                return newService;
            }else{
                return element;
            }
        });

        newRegistro.serviceOrders = newArrayVenda;

        let newArray = listVenda.map((element) => {
            if(element.vehicle._id === dado.element.vehicle._id){
                return newRegistro;
            }else{
                return element;
            }
        });
        setListVenda(newArray);
    }

    const ModificationPartePagamento = (dado, valor) => {
        let newRegistro = dado.element;
        let newService = dado.element2;

        console.log(dado)

        newService.partPayment = valor;

        let newArrayVenda = newRegistro.serviceOrders.map((element) => {
            if(element._id === dado.element2._id){
                return newService;
            }else{
                return element;
            }
        });

        newRegistro.serviceOrders = newArrayVenda;

        let newArray = listVenda.map((element) => {
            if(element.computer._id === dado.element.computer._id){
                return newRegistro;
            }else{
                return element;
            }
        });
        setListVenda(newArray);
    }

    return [
        SelectService,
        Salvar,
        ModificationDesconto,
        ModificationPartePagamento
    ]
}