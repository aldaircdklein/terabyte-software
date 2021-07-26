import {
    ModalBack,
    Modal,
    MBody,
    MFooter,
    MHeader,
    ButtonClose,
    DivClose
} from './style';

export const ModalContainer = (props) => {
    return (
        <ModalBack showModalState={props.showModalState}>
            <Modal sizeX={props.sizeX} sizeY={props.sizeY}>
                {props.children}
            </Modal>
        </ModalBack>
    )
}

export const ModalHeader = (props) => {
    return (
        <MHeader>
            <div>{props.children}</div>
            <DivClose>
                <ButtonClose onClick={props.showModalState}>X</ButtonClose>
            </DivClose>
        </MHeader>
    )
}

export const ModalBody = (props) => {
    return (
        <MBody className="scroll-style">
            {props.children}
        </MBody>
    )
}

export const ModalFooter = (props) => {
    return (
        <MFooter>
            {props.children}
        </MFooter>
    )
}