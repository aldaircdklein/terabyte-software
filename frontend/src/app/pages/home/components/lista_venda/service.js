import {api} from '../../../../services/api';
import {ServeRoutes} from '../../../../routes/server.routes';
import { format, parseISO } from 'date-fns';

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
    return OrdenaArrayByDate(result.data);
}

const OrdenaArrayByDate = (array) => {
    array.sort((a,b) => {
        if(a.serviceOrders){
            const dataA = Date.parse(format(parseISO(a.serviceOrders[0].createdAt), 'yyyy/MM/dd'))
            const dataB = Date.parse(format(parseISO(b.serviceOrders[0].createdAt), 'yyyy/MM/dd'))
            return dataA - dataB;
        }else{
            const dataA = Date.parse(format(parseISO(a.createdAt), 'yyyy/MM/dd'))
            const dataB = Date.parse(format(parseISO(b.createdAt), 'yyyy/MM/dd'))
            return dataA - dataB;
        }
    })
    return array;
}