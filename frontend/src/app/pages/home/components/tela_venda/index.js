import {useEffect} from 'react';
import {
    ModalCompra
} from '../modal_compra/index';
import {
    useModal
} from '../../../../util/contexts/index';

export const TelaVenda = () => {
    const {setOnShowModal} = useModal();

    useEffect(() => {
        setOnShowModal(true);
    },[])

    return (
        <ModalCompra typeRequest={'avulso'}></ModalCompra>
    )
}