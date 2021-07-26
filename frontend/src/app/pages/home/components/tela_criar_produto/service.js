import {api} from '../../../../services/api';
import {ServeRoutes} from '../../../../routes/server.routes';

export const CreateProduto = async (dados) => {
    const result = await api.post(ServeRoutes().createProduct,dados); 
    return result;
}
export const AtualizarProduto = async (dados,id) => {
    const result = await api.put(ServeRoutes(id).deleteUpdateProduct,dados); 
    return result;
}
export const ExcluirProduto = async (id) => {
    const result = await api.delete(ServeRoutes(id).deleteUpdateProduct); 
    return result;
}
