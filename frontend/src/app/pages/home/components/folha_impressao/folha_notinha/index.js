import { format } from 'date-fns';
const QRCode = require('qrcode')

export const FolhaNotinha = (dados) => {
    let qrcode = '';
    QRCode.toDataURL(dados.code, function (err, url) {
        qrcode = url;
    })

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
                    .qrcode{
                        width: 80px;
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
                <h4 style="text-align:left">ID venda: ${dados._id? dados._id:'Indefinido'}</h4>    
                <h4 style="text-align:center">NOTA VENDA</h4>
                <h4 style="text-align:right">Emissão:${format(new Date(), 'dd/MM/yyyy HH:mm:ss')}</h4>
            </div>

            <div class="Row">
                <div class="Col">
                    <p>Nome do cliente:</p>
                    <p>${dados.name? dados.name:'Indefinido'}</p>
                    <hr/>
                </div>
            </div>
            <div>
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
                                <td>${iterator.product.code? iterator.product.code:iterator.product[0].code} - ${iterator.product.name? iterator.product.name:iterator.product[0].name}</td>
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
                <h5 style="text-align:center">SubTotal:R$ ${(parseFloat(dados.total)).toFixed(2)} - Desconto:R$ ${(parseFloat(dados.discount)).toFixed(2)}</h5>
                <div class="title">
                    <h4 style="text-align:center">Valor total:R$ ${(parseFloat(dados.total) - parseFloat(dados.discount)).toFixed(2)}</h4>
                    <h5 style="text-align:center">Forma de pagamento: `
                        switch (dados.paymentType) {
                            case "cash":
                                codigoHTML+=`Dinheiro`
                                break;
                            case "debit":
                                codigoHTML+=`Débito`
                                break;
                            case "credit":
                                codigoHTML+=`Crédito avista`
                                break;
                            case "dividedcredit":
                                codigoHTML+=`Crédito parcelado`
                                break;
                            case "transfer":
                                codigoHTML+=`Transferência`
                                break;
                            case "pix":
                                codigoHTML+=`Pix`
                                break;
                            case "check":
                                codigoHTML+=`Cheque`
                                break;
                            case "onCredit":
                                codigoHTML+=`Crédito em loja`
                                break;
                            default:
                                codigoHTML+=`Indefinido`
                                break;
                        }
                    codigoHTML+=`</h5>
                </div>
                <div class="Row">
                    <div class="Col">
                        <p>Observação:</p>
                        <p>${dados.observation? dados.observation:'Indefinido'}</p>
                        <hr/>
                    </div>
                </div>
                <img src="${qrcode}" class="qrcode" />
            </div>
        </body>
    </html>`

    return codigoHTML;
}