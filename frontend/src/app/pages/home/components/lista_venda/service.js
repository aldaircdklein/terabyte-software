import {api} from '../../../../services/api';
import {ServeRoutes} from '../../../../routes/server.routes';
import { format, parseISO } from 'date-fns';

export const ListaVendas = async (dados) => {
    let result = {data:[]};
    if(dados.tipo === 'true'){
        if(dados.dateStart && dados.dateEnd){
            result = await api.get(ServeRoutes(`startDate=${dados.dateStart}&endDate=${dados.dateEnd}`).listServiceOrderUnpaid);
        }else{
            result = await api.get(ServeRoutes(`startDate=2019-01-01&endDate=${format(new Date(), 'yyyy-MM-dd')}`).listServiceOrderUnpaid);
        }
    }else{
        if(dados.dateStart && dados.dateEnd){
            result = await api.get(ServeRoutes(`startDate=${dados.dateStart}&endDate=${dados.dateEnd}${dados.name !== ''? '&name='+dados.name:''}${'&paid='+dados.paid}`).listSold);
        }else{
            result = await api.get(ServeRoutes(`startDate=2019-01-01&endDate=${format(new Date(), 'yyyy-MM-dd')}${dados.name !== ''? '&name='+dados.name:''}${'&paid='+dados.paid}`).listSold);
        }
    }
    return result.data;
}