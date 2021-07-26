import {
    api,
    api2
} from '../../../../services/api';
import {ServeRoutes} from '../../../../routes/server.routes';

export const ListaProdutos = async (busca) => {
    const result = await api.get(ServeRoutes(busca).listProducts)
    return result.data;
}
export const EfetuarVenda = async (dados) => {
    const result = await api.post(ServeRoutes().createSold,dados)
    return result;
}
export const UpdateVenda = async (dados,id) => {
    const result = await api.put(ServeRoutes(id).updateSold,dados)
    return result;
}
export const AdicionarProdutoLista = (dados) => {
    let newListaVenda = dados.listVenda;
    const jaExiste = newListaVenda.filter((element) => {return element.product._id === dados.selectProduto})
    if(jaExiste.length === 0){
        let newProduto = dados.listProduto.find((element) => element._id === dados.selectProduto);
        newListaVenda.unshift(
            {
                product: newProduto,
                quantity: dados.qtd
            }
        )
    }
    return Array.from(newListaVenda);
}
export const ModificarQuantidadeProduto = (dados) => {
    let newListVenda = dados.listVenda;
    for(const iterator of newListVenda){
        if(iterator.product._id === dados.id){
            iterator.quantity = dados.quantidade;
        }
    }
    return Array.from(newListVenda);
}
export const RemoverProdutoLista = (dados) => {
    const newListVenda = dados.listVenda.filter((element) => {
        return element.product._id !== dados.id
    });
    return Array.from(newListVenda);
}
export const CalcularValorTotal = (dados) => {
    let valorTotal = 0;
    for(const iterator of dados.listVenda){
        valorTotal+=(iterator.product.price*iterator.quantity)
    }
    return valorTotal;
}
export const VerificarEstoque = (dados) => {
    let newListaProduto = dados.listProduto;
    const produto = newListaProduto.find((element) => element._id === dados.selectProduto);
    return produto.quantity < produto.minStock;
}
export const buscarCabecalho = async () => {
    const result = await api2.get(ServeRoutes().dataLoja);
    return result.data;
}