import { format } from 'date-fns';
const QRCode = require('qrcode')

export const FolhaEstoque = (dados) => {

    console.log(dados)
    let codigoHTML = `<!doctype html>
        <html lang="pt-br">

            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <title>Impressao</title>
                <style>
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
                    table{
                        width:100%
                    }
                    td, th{
                        text-align: left;
                        font-size: 1.0em;
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
            <div>
                <h4 style="text-align:center">RELATÓRIO ESTOQUE</h4>
                <table>
                    <theader>
                        <tr>
                            <th>Código</th>
                            <th>Peças</th>
                            <th>quantidade</th>
                            <th>Preço custo.</th>
                            <th>Preço venda</th>
                        </tr>
                    </theader>
                    <tbody>`
                    try {
                        for(const iterator of dados){
                            let qrcode = '';
                            QRCode.toDataURL(iterator.code, function (err, url) {
                                qrcode = url;
                            })
                            codigoHTML+=`<tr>
                                <td><img src="${qrcode}" class="qrcode" /></td>
                                <td>${iterator.name}</td>
                                <td>x${iterator.quantity}</td>
                                <td>R$ ${(parseFloat(iterator.cost)).toFixed(2)}</td>
                                <td>R$ ${(parseFloat(iterator.price)).toFixed(2)}</td>
                            </tr>`
                        }   
                    } catch (error) {
                        codigoHTML+=`<td>Problemas ao gerar lista de produtos!</td>`
                    }
                    codigoHTML+=`</tbody>
                </table>                
            </div>
        </body>
    </html>`

    return codigoHTML;
}