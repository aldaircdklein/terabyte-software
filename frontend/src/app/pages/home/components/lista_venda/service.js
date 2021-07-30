import {api} from '../../../../services/api';
import {ServeRoutes} from '../../../../routes/server.routes';
import { format } from 'date-fns';

export const ListaVendas = async (dados) => {
    let result = {data:[]};
    if(dados.tipo === 'true'){
        if(dados.dateStart && dados.dateEnd){
            result = await api.get(ServeRoutes(`startDate=${dados.dateStart}&endDate=${dados.dateEnd}${'&paid='+dados.paid}`).listServiceOrderUnpaid);
        }else{
            let data = new Date();
            data.setDate(data.getDate() + 2);
            result = await api.get(ServeRoutes(`startDate=2019-01-01&endDate=${format(data, 'yyyy-MM-dd')}${'&paid='+dados.paid}`).listServiceOrderUnpaid);
        }
    }else{
        if(dados.dateStart && dados.dateEnd){
            result = await api.get(ServeRoutes(`startDate=${dados.dateStart}&endDate=${dados.dateEnd}${dados.name !== ''? '&name='+dados.name:''}${'&paid='+dados.paid}`).listSold);
        }else{
            let data = new Date();
            data.setDate(data.getDate() + 2);
            result = await api.get(ServeRoutes(`startDate=2019-01-01&endDate=${format(data, 'yyyy-MM-dd')}${dados.name !== ''? '&name='+dados.name:''}${'&paid='+dados.paid}`).listSold);
        }
    }
    return result.data;
}