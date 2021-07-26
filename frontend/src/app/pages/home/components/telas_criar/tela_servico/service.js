import {api,api2} from '../../../../../services/api';
import {ServeRoutes} from '../../../../../routes/server.routes';

export const EnviarMensagemAutomatica = async (dados) => {

    const result = await api2.get(ServeRoutes().dataLoja);
    let newText = result.data.msgAuto;
    
    for(let item in dados.cliente){
        if(newText.includes(`@${item}`)){
            newText = newText.replaceAll(`@${item}`, dados.cliente[item]? dados.cliente[item]:'')
        }
    }
    for(let item in dados.computer){
        if(newText.includes(`@${item}`)){
            newText = newText.replaceAll(`@${item}`, dados.computer[item]? dados.computer[item]:'')
        }
    }
    for(let item in dados.servico){
        if(newText.includes(`@${item}`)){
            newText = newText.replaceAll(`@${item}`, dados.servico[item]? dados.servico[item]:'')
        }
    }

    if(dados.cliente['phone']){
        let telefone = dados.cliente['phone'];
        telefone = telefone.replace(/[^0-9]/g, '')
    
        setTimeout(()=>{
            window.open(`https://api.whatsapp.com/send?phone=55${telefone}&text=${encodeURIComponent(newText)}`, "Mensagem automatica", "height=480,width=720");
        },2000)
    }
}
export const FinalizarServico = async (id) => {
    let result = await api.patch(ServeRoutes(id).deleteUpdateService);
    return result;
}
export const CadastrarServico = async (dados) => {
    const result = await api.post(ServeRoutes().createService,dados); 
    return result;
}
export const AtualizarServico = async (dados,id) => {
    const result = await api.put(ServeRoutes(id).deleteUpdateService,dados);
    return result;
}
export const ExcluirServico = async (id) => {
    const result = await api.delete(ServeRoutes(id).deleteUpdateService); 
    return result;
}
export const AddServicoList = (list,servico) => {
    let newListServico = list;
    newListServico.push(servico);
    return Array.from(newListServico);
}
export const ModificarListCliente = (list, id, newElement) => {
    let newList = list.filter((element) => {return element._id !== id});
    if(newElement !== null){
        newList.push(newElement);
    }
    return newList;
}
export const CalculaTotalVenda = (listVenda) => {
    let newValue = 0;
    listVenda.map((element) => {
        if(Array.isArray(element.product))
            newValue += element.product[0].price * element.quantity
        else
            newValue += element.product.price * element.quantity
    })
    return newValue;
}
const FilterListVenda = (listVenda) => {
    let newList = listVenda.map((element) => {
        if(Array.isArray(element.product))
            return {
                product:element.product[0]._id,
                quantity:parseInt(element.quantity)
            }
        else
            return {
                product:element.product._id,
                quantity:parseInt(element.quantity)
            }
    });
    return newList;
}
export const ModificarStatusVenda = async (listVenda,dados) => {
    const json = {
        items:FilterListVenda(listVenda),
        paid:dados.paid,
        paymentType: dados.paymentType
    }
    await api.put(ServeRoutes(dados._id).updateSold,json);
}