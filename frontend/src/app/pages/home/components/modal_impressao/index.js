import {
    GrupButton,
    Button
} from './style';
import {
    ModalContainer,
    ModalHeader,
    ModalBody,
} from '../../../../components/index';
import {
    FolhaViaCliente,
    FolhaComanda
} from '../folha_impressao/index';
import {useModalImpressao} from './action';
import {Icons} from '../../../../icons/index';

export const ModalImpressao = () => {
    const [
        generationJson,
        enviarConteudo,
        show,
        ModificationShow,
        ModificationShowModal1
    ] = useModalImpressao();

    return (
        <ModalContainer showModalState={show} sizeX="50vw" sizeY="70vh">
            <ModalHeader showModalState={()=>{ModificationShow(false); ModificationShowModal1(false)}}>
                <h3>{Icons().FaPrint} Impressão</h3>
            </ModalHeader>
            <ModalBody className="scroll-style">
                <GrupButton>
                    <Button onClick={() => enviarConteudo(FolhaViaCliente(generationJson()))}>{Icons().FaPrint} Nota serviço</Button>
                    <Button onClick={() => enviarConteudo(FolhaComanda(generationJson()))}>{Icons().FaPrint} Via do cliente</Button>
                </GrupButton>
            </ModalBody>
        </ModalContainer>
    )
}