import {Colors} from '../util/index';

export const ListError = () => {
    let color = Colors().danger;
    return [
        {code:'001-B',alert:{msg:`Não foi possível carregar a lista de clientes!`,color}},
        {code:'002-B',alert:{msg:`Não foi possível carregar a lista de produtos!`,color}},
        {code:'003-B',alert:{msg:`Problemas ao carregar lista de concluidos!`,color}},
        {code:'004-B',alert:{msg:`Problemas ao carregar lista de pendentes!`,color}},
        {code:'005-B',alert:{msg:`Não foi possível carregar a lista de aparelhos!`,color}},
        {code:'006-B',alert:{msg:`Nenhum produto encontrado!`,color}},
        {code:'007-B',alert:{msg:`Nenhum produto encontrado!`,color}},
        {code:'008-B',alert:{msg:`Não foi possível efetuar a venda!`,color}},
        {code:'009-B',alert:{msg:`Problema ao salvar produto!`,color}},
        {code:'010-B',alert:{msg:`Problema ao atualizar produto!`,color}},
        {code:'011-B',alert:{msg:`Problema ao excluir produto!`,color}},
        {code:'012-B',alert:{msg:`Não foi possivel cadastrar o cliente!`,color}},
        {code:'013-B',alert:{msg:`Não foi possivel atualizar o cliente!`,color}},
        {code:'014-B',alert:{msg:`Não foi possivel excluir o cliente!`,color}},
        {code:'015-B',alert:{msg:`Problema ao vincular serviço!`,color}},
        {code:'016-B',alert:{msg:`Problema ao atualizar serviço!`,color}},
        {code:'017-B',alert:{msg:`Problema ao excluir o serviço!`,color}},
        {code:'018-B',alert:{msg:`Problema ao vincular aparelho!`,color}},
        {code:'019-B',alert:{msg:`Problema ao atualizar aparelho!`,color}},
        {code:'020-B',alert:{msg:`Problema ao excluir aparelho!`,color}},
        {code:'021-B',alert:{msg:`Problema ao finalizar e enviar mensagem!`,color}},
        {code:'022-B',alert:{msg:`Problema ao salvar configurações!`,color}},
        {code:'023-B',alert:{msg:`Problemas ao carregar lista de vendas!`,color}},
        {code:'024-B',alert:{msg:`Problemas ao carregar lista de recados!`,color}},
    ]
}