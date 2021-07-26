import {api} from '../../../../services/api';
import {ServeRoutes} from '../../../../routes/server.routes';

export const ListaVendas = async (dados) => {
    let result = {data:[]};
    if(dados.tipo === 'true'){
        result = await api.get(ServeRoutes(`startDate=${dados.dateStart}&endDate=${dados.dateEnd}`).listServiceOrderUnpaid);
    }else{
        result = await api.get(ServeRoutes(`startDate=${dados.dateStart}&endDate=${dados.dateEnd}${dados.name !== ''? '&name='+dados.name:''}${'&paid='+dados.paid}`).listSold);
    }
    return result.data;
}