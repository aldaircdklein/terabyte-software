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
    return result.data;
}

export const OrdenaArray = (array, tipo, crescente) => {
    if(tipo === 'data'){
        array.sort((a,b) => {
            if(a.serviceOrders){
                const dataA = parseInt(format(parseISO(a.serviceOrders[0].createdAt), 'yyyyMMddHH'))
                const dataB = parseInt(format(parseISO(b.serviceOrders[0].createdAt), 'yyyyMMddHH'))
                return crescente === 'menor'? dataB - dataA:dataA - dataB;
            }else{
                const dataA = parseInt(format(parseISO(a.createdAt), 'yyyyMMddHH'))
                const dataB = parseInt(format(parseISO(b.createdAt), 'yyyyMMddHH'))
                return crescente === 'menor'? dataB - dataA:dataA - dataB;
            }
        })
        return array;
    }else if(tipo === 'nome'){
        array.sort((a,b) => {
            if(a.serviceOrders){
                if(a.user.name > b.user.name)
                    return crescente === 'menor'? 1:-1;
                if(a.user.name < b.user.name)
                    return crescente === 'menor'? -1:1;
                return 0;
            }else{
                if(a.name !== ""){
                    if(a.name > b.name)
                        return crescente === 'menor'? 1:-1;
                    if(a.name < b.name)
                        return crescente === 'menor'? -1:1;
                    return 0;
                }
            }
        })
        return array;
    }else{
        array.sort((a,b) => {
            if(a.serviceOrders){
                const dataA = parseFloat(a.serviceOrders[0].servicePrice) + parseFloat(a.serviceOrders[0].sold.total? a.serviceOrders[0].sold.total:0);
                const dataB = parseFloat(b.serviceOrders[0].servicePrice) + parseFloat(b.serviceOrders[0].sold.total? b.serviceOrders[0].sold.total:0);
                return crescente === 'menor'? dataA - dataB:dataB - dataA;
            }else{
                const dataA = a.total
                const dataB = b.total
                return crescente === 'menor'? dataA - dataB:dataB - dataA;
            }
        })
        return array;
    }
}