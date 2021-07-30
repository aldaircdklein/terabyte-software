import { format, parseISO } from 'date-fns';

export const FolhaViaCliente = (dados) => {

    let codigoHTML = `<!doctype html>
        <html lang="pt-br">

            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <title>Impressao</title>
                <style>
                    .navBar{
                        display: grid;
                        grid-template-columns: 10% auto auto 10%;
                        text-align: center;
                        font-size: 0.6em;
                    }
                    .Row{
                        display: flex;
                        width: 100%;
                    }
                    .Col{
                        width: 100%;
                        margin-left: 1vh;
                    }
                    p{
                        margin: 0px;
                        font-size: 0.8em;
                    }
                    h4{
                        margin: 5px;
                        font-size: 1em;
                    }
                    .title{
                        display: grid;
                        grid-template-columns: auto auto auto;
                    }
                    table{
                        width:100%
                    }
                    td, th{
                        text-align: left;
                        font-size: 0.8em;
                    }
                    img{
                        width:100%;
                        background-color: #FFF;
                    }            
                </style>
            </head>
        <body id="bodyImpressao">
            <div class="navBar">
                <img src="/./assets/logoprint2.jpg" />
                <div>
                    <strong>${dados.cabecalho.nome? dados.cabecalho.nome:'Indefinido'}</strong>
                    <br />
                    ${dados.cabecalho.subtitulo? dados.cabecalho.subtitulo:'Indefinido'}
                    <br />
                    ${dados.cabecalho.endereco? dados.cabecalho.endereco:'Indefinido'}
                </div>
                <div>
                    ${dados.cabecalho.telefones? dados.cabecalho.telefones:'Indefinido'}
                    <br />
                    ${dados.cabecalho.email? dados.cabecalho.email:'Indefinido'}
                    <br />
                    CNPJ/CPF: ${dados.cabecalho.cnpjcpf? dados.cabecalho.cnpjcpf:'Indefinido'}
                </div>
                <img src="/./assets/logoprint2.jpg" />
            </div>
            <div class="title">
                <h4 style="text-align:left">ID OS: ${dados.servico._id? dados.servico._id:'Indefinido'}</h4>    
                <h4 style="text-align:center">VIA CLIENTE</h4>
                <h4 style="text-align:right">Emissão:${format(new Date(), 'dd/MM/yyyy HH:mm:ss')}</h4>
            </div>
            <div class="Row">
                <div class="Col">
                    <p>Nome do cliente:</p>
                    <p>${dados.cliente.name? dados.cliente.name:'Indefinido'}</p>
                    <hr/>
                </div>
                <div class="Col">
                    <p>Data entrada:</p>
                    <p>${dados.servico.startDate? format(parseISO(dados.servico.startDate), 'dd/MM/yyyy'):'Indefinido'}</p>
                    <hr/>
                </div>
            </div>
            <div class="Row">
                <div class="Col">
                    <p>Telefone:</p>
                    <p>${dados.cliente.phone? dados.cliente.phone:'Indefinido'}</p>
                    <hr/>
                </div>
                <div class="Col">
                    <p>Email:</p>
                    <p>${dados.cliente.email? dados.cliente.email:'Indefinido'}</p>
                    <hr/>
                </div>
                <div class="Col">
                    <p>CPF:</p>
                    <p>${dados.cliente.cpf? dados.cliente.cpf:'Indefinido'}</p>
                    <hr/>
                </div>
            </div>
            <div class="Row">
                <div class="Col">
                    <p>Modelo computador:</p>
                    <p>${dados.computer.computerModel? dados.computer.computerModel:'Indefinido'}</p>
                    <hr/>
                </div>
            </div>
            <div class="Row">
                <div class="Col">
                    <p>Voltagem:</p>
                    <p>${dados.servico.voltage? dados.servico.voltage:'Indefinido'}</p>
                    <hr/>
                </div>
                <div class="Col">
                    <p>Carregador:</p>
                    <p>${dados.servico.energySource? dados.servico.energySource:'Indefinido'}</p>
                    <hr/>
                </div>
                <div class="Col">
                    <p>Faltando parafuso:</p>
                    <p>${dados.servico.missingScrew? 'Sim':'Não'}</p>
                    <hr/>
                </div>
                <div class="Col">
                    <p>Ligando:</p>
                    <p>${dados.servico.calling? 'Sim':'Não'}</p>
                    <hr/>
                </div>
                <div class="Col">
                    <p>Quebrado:</p>
                    <p>${dados.servico.broken? 'Sim':'Não'}</p>
                    <hr/>
                </div>
                <div class="Col">
                    <p>Aberto:</p>
                    <p>${dados.servico.open? 'Sim':'Não'}</p>
                    <hr/>
                </div>
            </div>
            <div class="Row">
                <div class="Col">
                    <p>Observação:</p>
                    <p>${dados.servico.observation? dados.servico.observation:'Indefinido'}</p>
                    <hr/>
                </div>
            </div>
            <div class="Row">
                <div class="Col">
                    <p>Backup:</p>
                    <p>${dados.servico.backup? 'Sim':'Não'}</p>
                    <hr/>
                </div>
                <div class="Col">
                    <p>Bolsa:</p>
                    <p>${dados.servico.handbag? 'Sim':'Não'}</p>
                    <hr/>
                </div>
            </div>
            <h4 style="text-align:center">INFORMAÇÕES DE DIAGNÓSTICOS</h4>
            <div class="Row">
                <div class="Col">
                    <p>Diagnóstico:</p>
                    <p>${dados.servico.diagnostic? dados.servico.diagnostic:'Indefinido'}</p>
                    <hr/>
                </div>
            </div>    
            <h4 style="text-align:center">INFORMAÇÕES DE SERVIÇOS</h4>
            <div class="Row">
                <div class="Col">
                    <p>Serviço:</p>
                    <p>${dados.servico.serviceDescription? dados.servico.serviceDescription:'Indefinido'}</p>
                    <hr/>
                </div>
                <div class="Col">
                    <p>Total:</p>
                    <p>R$${dados.servico.servicePrice? (parseFloat(dados.servico.servicePrice)).toFixed(2):'Indefinido'}</p>
                    <hr/>
                </div>
            </div>
            <div id="tabelaProdutosImpressao">
                <h4 style="text-align:center">INFORMAÇÕES PEÇAS</h4>
                <table>
                    <theader>
                        <tr>
                            <th>Peças</th>
                            <th>Qtd.</th>
                            <th>Valor unid.</th>
                            <th>Valor total</th>
                        </tr>
                    </theader>
                    <tbody>`
                    try {
                        for(const iterator of dados.listVenda){
                            codigoHTML+=`<tr>
                                <td>${iterator.product.code? iterator.product.code:iterator.product[0].code} - ${iterator.product.description? iterator.product.description:iterator.product[0].description}</td>
                                <td>x${iterator.quantity}</td>
                                <td>R$ ${(parseFloat(iterator.product.price? iterator.product.price:iterator.product[0].price)).toFixed(2)}</td>
                                <td>R$ ${(parseFloat((iterator.product.price? iterator.product.price:iterator.product[0].price)*iterator.quantity)).toFixed(2)}</td>
                            </tr>`
                        }   
                    } catch (error) {
                        codigoHTML+=`<td>Problemas ao gerar lista de produtos!</td>`
                    }
                    codigoHTML+=`</tbody>
                </table>
                <div class="title">
                    <h5 style="text-align:center">Mão de obra:R$ ${dados.servico.servicePrice? (parseFloat(dados.servico.servicePrice)).toFixed(2):'Indefinido'}</h5>    
                    <h5 style="text-align:center">Peças:R$ ${dados.total? (parseFloat(dados.total)).toFixed(2):'Indefinido'}</h5>
                    <h5 style="text-align:center">Desconto:R$ ${dados.servico.discount? (parseFloat(dados.servico.discount)).toFixed(2):'0.00'}</h5>
                    <h4 style="text-align:center">Valor total:R$ ${((dados.total? parseFloat(dados.total):0) + (dados.servico.servicePrice? parseFloat(dados.servico.servicePrice):0) - (dados.servico.discount? parseFloat(dados.servico.discount):0)).toFixed(2)}</h4>
                </div>
            </div>
            <script>
                let alturaAtual = document.getElementById('bodyImpressao').offsetHeight;
                if(alturaAtual > 3400){document.getElementById('tabelaProdutosImpressao').setAttribute('style','page-break-before: always; margin-top: 20px')}
            </script>
        </body>
    </html>`

    return codigoHTML;
}