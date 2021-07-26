import { format } from 'date-fns';
const QRCode = require('qrcode');
const crypto = require("crypto");

export const FolhaEtiqueta = () => {
    let qrcode = [];
    
    for (let index = 0; index < 140; index++) {
        const newId = `${format(new Date(), 'ddMMyyyyHHmmss')}${crypto.randomBytes(10).toString('hex')}`;
        QRCode.toDataURL(newId, function (err, url) {
            qrcode.push(url);
        })
    }

    let codigoHTML = `<!doctype html>
        <html lang="pt-br">

            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <title>Impressao</title>
                <style>
                    .qrcode{
                        width: 70px;
                    }
                </style>
            </head>
        <body>`
        qrcode.map((element) => {
            codigoHTML+=`<img src="${element}" class="qrcode" />`
        })
        codigoHTML+=`</body>
    </html>`

    return codigoHTML;
}