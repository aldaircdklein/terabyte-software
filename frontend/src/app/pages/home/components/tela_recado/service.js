import {api} from '../../../../services/api';
import {ServeRoutes} from '../../../../routes/server.routes';

export const ListaMessages = async () => {
    const result = await api.get(ServeRoutes().listMessageAll);
    return result.data;
}
export const CadastrarMessage = async (dados) => {
    const result = await api.post(ServeRoutes().createMessage,dados); 
    return result;
}
export const AtualizarMessage = async (dados,id) => {
    const result = await api.put(ServeRoutes(id).deleteUpdateMessage,dados);
    return result;
}
export const ExcluirMessage = async (id) => {
    const result = await api.delete(ServeRoutes(id).deleteUpdateMessage); 
    return result;
}