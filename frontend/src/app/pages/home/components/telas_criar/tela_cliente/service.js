import {api} from '../../../../../services/api';
import {ServeRoutes} from '../../../../../routes/server.routes';

export const CadastrarCliente = async (dados) => {
    const result = await api.post(ServeRoutes().createUser,dados); 
    return result;
}
export const AtualizarCliente = async (dados,id) => {
    const result = await api.put(ServeRoutes(id).deleteUpdateUser,dados); 
    return result;
}
export const ExcluirCliente = async (id) => {
    const result = await api.delete(ServeRoutes(id).deleteUpdateUser);
    return result;
}