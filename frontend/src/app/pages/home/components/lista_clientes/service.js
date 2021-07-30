import {api} from '../../../../services/api';
import {ServeRoutes} from '../../../../routes/server.routes';

export const ListaClientes = async (nome) => {
    const result = await api.get(ServeRoutes(nome).listUsers)
    return result.data;
}

export const ListaClientesTodos = async () => {
    const result = await api.get(ServeRoutes().listUsersAll)
    return result.data;
}