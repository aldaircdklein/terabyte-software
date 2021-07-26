import {api2} from '../../../../services/api';
import {ServeRoutes} from '../../../../routes/server.routes';

export const buscarCabecalho = async () => {
    const result = await api2.get(ServeRoutes().dataLoja);
    return result.data;
}
export const CalcularValorTotal = (listVenda) => {
    let newTotal = 0;
    listVenda.map((element) => {
        if(Array.isArray(element.product))
            newTotal += element.product[0].price * element.quantity
        else
            newTotal += element.product.price * element.quantity
    });
    return newTotal;
}