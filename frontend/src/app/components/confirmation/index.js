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
import {Colors} from '../../util/index';

export const ModalConfirmation = ({handleFunction,text}) => {
    const {onShowModal2, setOnShowModal2} = useModal();
    const [show, setShow] = useState(false);

    useEffect(()=>{
        setShow(onShowModal2);
    },[onShowModal2])

    return (
        <ModalContainer showModalState={show} sizeX="20vw" sizeY="10vh">
            <ModalHeader showModalState={()=>{setShow(false); setOnShowModal2(false)}}>
                <h3>{Icons().FaExclamationTriangle} Atenção</h3>
            </ModalHeader>
            <ModalBody className="scroll-style">
                <H4>{text}</H4>
            </ModalBody>
            <ModalFooter>
                <ButtonAction bgcolor={Colors().secondary} onClick={()=>{setShow(false); setOnShowModal2(false)}}>{Icons().FaTimes} Cancelar</ButtonAction>
                <ButtonAction onClick={()=>{handleFunction(); setShow(false); setOnShowModal2(false)}} bgcolor={Colors().primary} color={Colors().white} marginLeft="1vh">{Icons().FaCheck} Confirmar</ButtonAction>
            </ModalFooter>
        </ModalContainer>
    )
}