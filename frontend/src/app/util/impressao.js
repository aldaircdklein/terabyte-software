export const GerarImpressao = (conteudo, autoClose) => {

    let tela_impressao = window.open('about:blank', '_blank', 'nodeIntegration=yes');

    tela_impressao.document.write(conteudo);
    setTimeout(() => {
        tela_impressao.window.print();
        if(autoClose){
            setTimeout(() => {
                tela_impressao.window.close();
            }, 5000);
        }
    }, 1000);
}