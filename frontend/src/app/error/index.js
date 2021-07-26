import {ListError} from './list.error';
import {ListSuccess} from './list.success';
import {ListWarning} from './list.warning';

export const generationError = (code) => {
    let selecionado = ListError().filter((element) => {return element.code === code});
    return selecionado[0].alert;
}
export const generationSuccess = (code) => {
    let selecionado = ListSuccess().filter((element) => {return element.code === code})
    return selecionado[0].alert;
}
export const generationWarning = (code) => {
    let selecionado = ListWarning().filter((element) => {return element.code === code})
    return selecionado[0].alert;
}