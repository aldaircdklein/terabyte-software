import {Colors} from '../util/index';

export const ListWarning = () => {
    let color = Colors().warning;

    return [
        {code:'001-C',alert:{msg:`Estoque abaixo do limite!`, color}},
        {code:'002-C',alert:{msg:`Preencha todos os campos!`, color}},
        {code:'003-C',alert:{msg:`Preencha o campo!`, color}},
        {code:'004-C',alert:{msg:`Produtos com mesmo código podem gerar erro ao salvar!`, color}},
        {code:'005-C',alert:{msg:`Produtos não vinculados salve a venda antes!`, color}},
    ]
}