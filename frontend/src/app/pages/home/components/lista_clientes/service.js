import {api} from '../../../../services/api';
import {ServeRoutes} from '../../../../routes/server.routes';

export const ListaClientes = async (nome) => {
    const result = await api.get(ServeRoutes(nome).listUsers)
    return result.data;
}