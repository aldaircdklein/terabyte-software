import {api} from '../../../../services/api';
import {ServeRoutes} from '../../../../routes/server.routes';

export const ListaClientes = async (nome) => {
    const result = await api.get(ServeRoutes(nome).listUsers)
    return ordenarLista(result.data);
}

export const ListaClientesTodos = async () => {
    const result = await api.get(ServeRoutes().listUsersAll)
    return ordenarLista(result.data);
}

const ordenarLista = (array) => {
    array.sort((a,b) => {
        return (a.name).toLowerCase() < (b.name).toLowerCase() ? -1 : (a.name).toLowerCase() > (b.name).toLowerCase() ? 1 : 0;
    });
    return array;
}