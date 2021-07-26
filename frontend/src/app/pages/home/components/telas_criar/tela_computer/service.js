import {api,api2} from '../../../../../services/api';
import {ServeRoutes} from '../../../../../routes/server.routes';

export const CadastrarComputer = async (dados) => {
    const result = await api.post(ServeRoutes().createComputer,dados); 
    return result;
}
export const AtualizarComputer = async (dados,id) => {
    const result = await api.put(ServeRoutes(id).deleteUpdateComputer,dados); 
    return result;
}
export const ExcluirComputer = async (id) => {
    const result = await api.delete(ServeRoutes(id).deleteUpdateComputer); 
    return result;
}
export const AddComputerList = (list,computer) => {
    let newListComputer = list;
    newListComputer.push(computer);
    return Array.from(newListComputer);
}
export const ModificarListCliente = (list, id, newElement) => {
    let newList = list.filter((element) => {return element._id !== id});
    if(newElement !== null){
        newList.push(newElement);
    }
    return newList;
}
export const DataListComputer = async (set,dados) => {
    if(set){
        let newList = dados.list.filter((element) => {return element !== set});
        newList.push(set);
        await api2.put(ServeRoutes().dataListComputerModel,{list:newList});
    }
    const result = await api2.get(ServeRoutes().dataListComputerModel);
    return result.data;
}