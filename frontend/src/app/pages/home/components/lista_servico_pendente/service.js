import {api} from '../../../../services/api';
import {ServeRoutes} from '../../../../routes/server.routes';

export const ListaServicoPendente = async () => {
    const result = await api.get(ServeRoutes(false).listServiceStatus);
    return result.data;
}
export const DivideDados = (dados) => {
    let cliente = dados.user;
    let servico = dados.serviceOrders;
    let computador = {...dados.computer,serviceOrders:servico};
    cliente.computers = [computador];
    return {cliente,computador,servico}
}