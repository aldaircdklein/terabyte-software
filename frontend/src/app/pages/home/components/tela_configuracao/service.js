import {api2} from '../../../../services/api';
import {ServeRoutes} from '../../../../routes/server.routes';

export const SalvarDados = async (dados) => {
    const result = await api2.post(ServeRoutes().dataLoja,dados);
    return result;
}

export const CarregarDados = async () => {
    const result = await api2.get(ServeRoutes().dataLoja);
    return result.data;
}