import { format, parseISO } from 'date-fns';
const QRCode = require('qrcode')

export const FolhaComanda = (dados) => {
    let qrcode = '';
    QRCode.toDataURL(dados.servico.code, function (err, url) {
        qrcode = url;
    })
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
                        font-size: 0.9em;
                    }
                    h4{
                        font-size: 1.2em;
                        margin-top: 10px;
                        margin-bottom: 10px;
                    }
                    .title{
                        display: grid;
                        grid-template-columns: auto auto auto;
                    }
                    .Content{
                        border: solid;
                        padding: 15px;
                        border-radius: 15px;
                    }
                    img{
                        width:100%;
                        background-color: #FFF;
                    }
                    .qrcode{
                        width: 100px;
                    }
                </style>
            </head>
        <body id="bodyImpressao">
            <div class="Row">
                <div class="Col">
                    <div class="Content">
                        <h4 style="text-align:center;">${dados.cabecalho.nome? dados.cabecalho.nome:'Indefinido'}</h4>
                        <img src="${qrcode}" class="qrcode" />
                        <img src="/./assets/logoprint2.jpg" class="qrcode" />
                        <hr>
                        <div class="meta">
                            <span>Cliente: ${dados.cliente.name}</span>
                            <br/>
                            <span>Data: ${format(new Date(), 'dd/MM/yyyy')}</span>
                            <span>Telefone: ${dados.cliente.phone}</span>
                            <hr>
                        </div>
                        <p><strong>*Voltagem:</strong> ${dados.servico.voltage}  <strong>*Backup:</strong> ${dados.servico.backup? 'Sim':'Não'}</p>
                        <p><strong>*Senha:</strong> ${dados.servico.password}</p>
                        <p><strong>*Problema:</strong> ${dados.servico.problemDescription}</p>
                        <p><strong>*Bolsa:</strong> ${dados.servico.handbag? 'Sim':'Não'}</p>
                        <p><strong>*Carregador:</strong> ${dados.servico.energySource}  <strong>*Quebrado:</strong> ${dados.servico.broken? 'Sim':'Não'}</p>
                        <p><strong>*Aberto:</strong> ${dados.servico.open? 'Sim':'Não'}  <strong>*Parafuso Faltante:</strong> ${dados.servico.missingScrew? 'Sim':'Não'}</p>
                        <p><strong>*Obsevação:</strong> ${dados.servico.observation}</p>
                    </div>
                </div>
                
                <div class="Col">
                    <div class="Content">
                        <h4 style="text-align:center;">${dados.cabecalho.nome? dados.cabecalho.nome:'Indefinido'}</h4>
                        <img src="${qrcode}" class="qrcode" />
                        <img src="/./assets/logoprint2.jpg" class="qrcode" />
                        <hr>
                        <div class="meta">
                            <span>Cliente: ${dados.cliente.name}</span>
                            <br/>
                            <span>Data: ${format(new Date(), 'dd/MM/yyyy')}</span>
                            <span>Telefone: ${dados.cliente.phone}</span>
                            <hr>
                        </div>
                        <p><strong>*Voltagem:</strong> ${dados.servico.voltage}  <strong>*Backup:</strong> ${dados.servico.backup? 'Sim':'Não'}</p>
                        <p><strong>*Senha:</strong> ${dados.servico.password}</p>
                        <p><strong>*Problema:</strong> ${dados.servico.problemDescription}</p>
                        <p><strong>*Bolsa:</strong> ${dados.servico.handbag? 'Sim':'Não'}</p>
                        <p><strong>*Carregador:</strong> ${dados.servico.energySource? 'Sim':'Não'}  <strong>*Quebrado:</strong> ${dados.servico.broken? 'Sim':'Não'}</p>
                        <p><strong>*Aberto:</strong> ${dados.servico.open? 'Sim':'Não'}  <strong>*Parafuso Faltante:</strong> ${dados.servico.missingScrew? 'Sim':'Não'}</p>
                        <p><strong>*Obsevação:</strong> ${dados.servico.observation}</p>
                    </div>
                </div>
            </div>
        </body>
    </html>`

    return codigoHTML;
}