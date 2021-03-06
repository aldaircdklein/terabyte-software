import {api} from '../../../../services/api';
import {ServeRoutes} from '../../../../routes/server.routes';

export const ListaProdutos = async (busca) => {
    const result = await api.get(ServeRoutes(busca).listProducts)
    return result.data;
}