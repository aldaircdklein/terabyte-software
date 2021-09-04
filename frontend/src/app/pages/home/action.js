import {listRoutes} from '../../routes/lista.routes';
import {Icons} from '../../icons/index';

export const ListaMenu = () => {
    return [
        {
            name:'Criar cliente',
            action:listRoutes().clienteCreate,
            icon:Icons().FaUserAlt
        },
        {
            name:'Buscar cliente',
            action:listRoutes().clienteList,
            icon:Icons().FaSearch
        },
        {
            name:'Venda produto',
            action:listRoutes().vendaProduct,
            icon:Icons().FaShoppingCart
        },
        {
            name:'Buscar computador',
            action:listRoutes().computadorList,
            icon:Icons().FaSearch
        },
        {
            name:'Serviço pendente',
            action:listRoutes().servicePendentList,
            icon:Icons().FaClock
        },
        {
            name:'Buscar serviço',
            action:listRoutes().serviceConcluidoList,
            icon:Icons().FaCheck
        },
        {
            name:'Adicionar produto',
            action:listRoutes().productCreate,
            icon:Icons().FaBoxOpen
        },
        {
            name:'Buscar produto',
            action:listRoutes().productList,
            icon:Icons().FaSearch
        },
        {
            name:'Informações gerais',
            action:listRoutes().vendaList,
            icon:Icons().FaFileInvoiceDollar
        },
        {
            name:'Configurações',
            action:listRoutes().configuracao,
            icon:Icons().FaCog
        },
        {
            name:'Recados',
            action:listRoutes().configuracao,
            icon:Icons().FaEdit
        },
        {
            name:'Whatsapp',
            action:listRoutes().extrawhatsapp,
            icon:Icons().FaWhatsapp
        },
    ]
}