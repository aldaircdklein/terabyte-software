import {api} from '../../../../services/api';
import {ServeRoutes} from '../../../../routes/server.routes';

export const ListaComputers = async (code) => {
    const result = await api.get(ServeRoutes(code).listComputer);
    return result.data;
}

export const DivideDados = (dados) => {
    let cliente = dados.user;
    let servico = dados.serviceOrders;
    delete dados.user;
    delete dados.serviceOrders
    let computador = dados;
    computador.serviceOrders = servico;
    cliente.computers = [computador];
    return {cliente,computador,servico}
}