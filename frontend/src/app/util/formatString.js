export const FormatString = (dado,tamanho) => {
    if(dado.length > tamanho){
        return `${dado.slice(0,tamanho)}...`;
    }else{
        return dado;
    }
}