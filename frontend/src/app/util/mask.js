export const  Mask = (dado, tipo) => {
    switch (tipo) {
        case 'phone':
            return PHONE(dado);
        case 'cpf':
            return CPF(dado);
        case 'money':
            return MONEY(dado);
        default:
            break;
    }

}
const PHONE = (dado) => {
    dado = dado.replace('(', '');
    dado = dado.replace(')', '');
    dado = dado.replace('-', '');
    if(dado.length > 9){
        let phone = []
        phone.push(dado.substring(0, 2));
        phone.push(dado.substring(2, dado.length - 4));
        phone.push(dado.substring(dado.length - 4, dado.length));
        return `(${phone[0]})${phone[1]}-${phone[2]}`
    }
    return dado;
}
const CPF = (dado) => {
    dado = dado.replace('.', '');
    dado = dado.replace('.', '');
    dado = dado.replace('-', '');
    if(dado.length > 10){
        let CPF = []
        CPF.push(dado.substring(0, 3));
        CPF.push(dado.substring(3, 6));
        CPF.push(dado.substring(6, 9));
        CPF.push(dado.substring(9, dado.length));
        return `${CPF[0]}.${CPF[1]}.${CPF[2]}-${CPF[3]}`
    }
    return dado;
}
const MONEY = (dado) => {
    let money = [];
    dado = dado.replace('.', '');
    dado = dado.replace(',', '');

    if(dado.substr(0, 1) === '0'){
        dado = dado.substr(1);
    }

    if (dado > 99999) {
        money.push(dado.substring(0, dado.length - 5));
        money.push(dado.substring(dado.length - 5, dado.length - 2));
        money.push(dado.substring(dado.length - 2, dado.length));

        return `${money[0]}${money[1]}.${money[2]}`
    } else if (dado > 99 && dado < 100000) {
        money.push(dado.substring(0, dado.length - 2));
        money.push(dado.substring(dado.length - 2, dado.length));

        return `${money[0]}.${money[1]}`
    } else if (dado > 0) {

        return `${(dado/100).toFixed(2)}`
    } else {
        return '0.00'
    }
}