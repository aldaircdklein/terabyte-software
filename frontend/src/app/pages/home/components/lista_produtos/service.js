import {api} from '../../../../services/api';
import {ServeRoutes} from '../../../../routes/server.routes';

export const ListaProdutos = async (busca) => {
    const result = await api.get(ServeRoutes(busca).listProducts)
    return ordenarLista(result.data);
}

export const ListaProdutosTodos = async () => {
    const result = await api.get(ServeRoutes().listProductsAll)
    return ordenarLista(result.data);
}

const ordenarLista = (array) => {
    array.sort((a,b) => {
        return (a.name).toLowerCase() < (b.name).toLowerCase() ? -1 : (a.name).toLowerCase() > (b.name).toLowerCase() ? 1 : 0;
    });
    return array;
}