import {Colors} from '../util/index';

export const ListSuccess = () => {
    let color = Colors().success;

    return [
        {code:'001-A',alert:{msg:`Venda feita com sucesso!`, color}},
        {code:'002-A',alert:{msg:`Produto cadastrado com sucesso!`,color}},
        {code:'003-A',alert:{msg:`Produto atualizado com sucesso!`,color}},
        {code:'004-A',alert:{msg:`Produto excluido com sucesso!`,color}},
        {code:'005-A',alert:{msg:`Cliente cadastrado com sucesso!`,color}},
        {code:'006-A',alert:{msg:`Cliente atualizado com sucesso!`,color}},
        {code:'007-A',alert:{msg:`Cliente excluído com sucesso!`,color}},
        {code:'008-A',alert:{msg:`Serviço vinculado com sucesso!`,color}},
        {code:'009-A',alert:{msg:`Serviço atualizado com sucesso!`,color}},
        {code:'010-A',alert:{msg:`Serviço excluido com sucesso!`,color}},
        {code:'011-A',alert:{msg:`Aparelho vinculado com sucesso!`,color}},
        {code:'012-A',alert:{msg:`Aparelho atualizado com sucesso!`,color}},
        {code:'013-A',alert:{msg:`Aparelho excluido com sucesso!`,color}},
        {code:'014-A',alert:{msg:`Serviço finalizado com sucesso!`,color}},
        {code:'015-A',alert:{msg:`Configurações salvas com sucesso!`,color}},
    ]
}