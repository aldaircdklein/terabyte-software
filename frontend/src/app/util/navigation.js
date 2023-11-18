import {removeStore} from './storeNavigation';
export const navigation = (rota) => {
    removeStore(rota);
    return (window.location.pathname = rota);
};