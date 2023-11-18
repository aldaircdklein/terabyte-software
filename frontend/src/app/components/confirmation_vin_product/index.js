import {useState, useEffect} from 'react'
import {
    H4,
    ButtonAction
} from './style';
import {
    ModalContainer,
    ModalHeader,
    ModalBody,
    ModalFooter
} from '../index';
import {
    useModal
} from '../../util/contexts/index';
import {Icons} from '../../icons/index';
import {
    Colors,
    NextInput
} from '../../util/index';

export const ModalConfirmationVinProduct = ({handleFunction,text}) => {
    const {onShowModalVinProduct,setOnShowModalVinProduct,} = useModal();
    const [show, setShow] = useState(false);

    useEffect(()=>{
        setShow(onShowModalVinProduct);
    },[onShowModalVinProduct])

    return (
        <ModalContainer showModalState={show} sizeX="20vw" sizeY="10vh">
            <ModalHeader showModalState={()=>{setShow(false); setOnShowModalVinProduct(false)}}>
                <h3>{Icons().FaExclamationTriangle} Atenção</h3>
            </ModalHeader>
            <ModalBody className="scroll-style">
                <H4>{text}</H4>
            </ModalBody>
            <ModalFooter>
                <ButtonAction bgcolor={Colors().secondary} onClick={()=>{setShow(false); setOnShowModalVinProduct(false)}}>{Icons().FaTimes} Cancelar</ButtonAction>
                <ButtonAction onClick={()=>{handleFunction(); setShow(false); setOnShowModalVinProduct(false)}} bgcolor={Colors().primary} color={Colors().white} marginLeft="1vh">{Icons().FaCheck} Confirmar</ButtonAction>
            </ModalFooter>
        </ModalContainer>
    )
}