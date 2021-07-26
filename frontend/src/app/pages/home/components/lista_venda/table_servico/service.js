import {api} from '../../../../../services/api';
import {ServeRoutes} from '../../../../../routes/server.routes';

export const AtualizarServico = async (dados,id) => {
    const result = await api.put(ServeRoutes(id).deleteUpdateService,dados); 
    return result;
}
export const AtualizarVenda = async (dados,id) => {
    const result = await api.put(ServeRoutes(id).updateSold,dados); 
    return result;
}
export const FilterListVenda = (listVenda) => {
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