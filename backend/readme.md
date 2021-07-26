Cliente{
Nome,
Telefone,
email,
CPF,
RG,
Endereço,
listaDeVeiculos
}

- Busca por nome cliente -> veiculo -> ordem
- create update delete(cascade)

Veiculo{
Placa,
Fabricante,
Modelo,
Ano,
Portas,
Combustivel,
Direção,
Ar,
Cor,
ListaDeOrdens
}

- create update delete(cascate)
- autosugestao de fabricante e modelo

Ordem{
Quantidade em tanque,
KM,
Data de entrada,
Defeito relatado,
Informação diagnosticada,
Informação do serviço,
ListaDePeça,
Finalizado,
Data de finalização,
Mensagem pré definidas(ver melhor opção),
mão de obra,
servicePrice,
}

- create update delete

Produto{
Código(não é de barra),
Descrição,
Aplicação(descriação de aplicação),
Quantidade(Estoque unidade),
Preço de custo,
Preço de venda
total
}

- Busca por código, busca por nome
- crete update delete(cascate)

[X] - Forma de pagamento service order, ao criar fica fiado por padrão
{
payment: [fiado, dinheiro, cartão crédito, cartão débito, pix, transferência],
payed:boolean
}

[x] - Venda adiciona fiado e formas de pagamento
{
Nome?: string
payment: [fiado, dinheiro, cartão crédito, cartão débito, pix, transferência],
payed:boolean
}
[x] - adicionar update na venda
[x] - Listar venda por nome e período, as que não estão pagas
[ ] - listagem de serviços fiados por período
[x] - adicionar mínimo estoque para o produto
