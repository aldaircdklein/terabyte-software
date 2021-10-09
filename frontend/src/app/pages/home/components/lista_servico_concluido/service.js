import {api} from '../../../../services/api';
import {ServeRoutes} from '../../../../routes/server.routes';

export const ListaServicoConcluido = async () => {
    const result = await api.get(ServeRoutes(true).listServiceStatus);
    return result.data;
}
export const ListaServicoConcluidoByCode = async (code) => {
    const result = await api.get(ServeRoutes(code).listServiceByCode);
    return result.data;
}
export const ListaServicoConcluidoByDiagnostico = async (dado) => {
    const result = await api.get(ServeRoutes(dado).listServiceByDiagnostic);
    return result.data;
}
export const ListaServicoConcluidoNaoEntregue = async () => {
    const result = await api.get(ServeRoutes(true).listServiceFinishNotOut);
    return result.data;
}
export const ListaServicoConcluidoNaoExecutado = async () => {
    const result = await api.get(ServeRoutes(true).listServiceFinishCancel);
    return result.data;
}
export const DivideDados = (dados) => {
    let cliente = dados.user;
    let servico = dados.serviceOrders;
    let computador = {...dados.computer,serviceOrders:servico};
    cliente.computers = [computador];
    return {cliente,computador,servico}
}