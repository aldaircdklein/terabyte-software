import {
    FormRow,
    Input,
    ButtonAction,
    GrupButton,
    ShadowBox,
    Label
} from './style';
import {
    Mask,
    Colors
} from '../../../../../util/index';
import {Icons} from '../../../../../icons/index';
import {useTelaCliente} from './action';
import {ModalConfirmation} from '../../../../../components/index';

export const TelaCliente = ({typeRequest}) => {
    const [
        salvarDados,
        name,
        phone,
        email,
        cpf,
        validation,
        modalConfirmation,
        EnviarMensagemCliente,
        PreencherName,
        PreencherPhone,
        PreencherEmail,
        PreencherCpf,
        ModificationModalConfirmation,
        ModificationShowModal2
    ] = useTelaCliente();

    return (
        <>
            <ShadowBox>
                <h3>{Icons().FaUserAlt} Dados do cliente</h3>
                <hr/>
                <FormRow>
                    <Label>Nome:</Label>
                    <Input request={validation} placeholder="Nome" onChange={event => PreencherName(event.target.value)} value={name}/>
                </FormRow>
                <FormRow>
                    <Label>Telefone:</Label>
                    <Input request={validation} placeholder="Telefone" onChange={event => PreencherPhone(Mask(event.target.value,'phone'))} value={phone}/>
                    <Label>CPF:</Label>
                    <Input placeholder="CPF" onChange={event => PreencherCpf(Mask(event.target.value,'cpf'))} value={cpf}/>
                    <Label>Email:</Label>
                    <Input placeholder="E-mail" onChange={event => PreencherEmail(event.target.value)} value={email}/>
                </FormRow>
                <GrupButton>
                    {
                        typeRequest === 'cadastrar'?(
                            <ButtonAction onClick={()=>{salvarDados('cadastrar')}} color={Colors().white} bgcolor={Colors().primary} marginTop="8vh">{Icons().FaSave} Criar</ButtonAction>
                        ):(
                            <>
                                <ButtonAction onClick={()=>{ModificationModalConfirmation('atualizar'); ModificationShowModal2(true) }} color={Colors().white} bgcolor={Colors().primary} marginTop="8vh">{Icons().FaEdit} Modificar</ButtonAction>
                                <ButtonAction onClick={()=>{ModificationModalConfirmation('excluir'); ModificationShowModal2(true)}} style={{marginLeft:'2vh'}} color={Colors().white} bgcolor={Colors().danger} marginTop="8vh">{Icons().FaTrashAlt} Excluir</ButtonAction>
                                <ButtonAction onClick={()=>{ EnviarMensagemCliente() }} style={{marginLeft:'2vh'}} color={Colors().white} bgcolor={Colors().success} marginTop="8vh">{Icons().FaWhatsapp} Whatsapp</ButtonAction>
                            </>
                        )
                    }
                </GrupButton>
            </ShadowBox>
            {
                modalConfirmation === 'atualizar'?(
                    <ModalConfirmation handleFunction={()=>{salvarDados('atualizar')}} text={'Atualizar este cliente! Deseja continuar?'}></ModalConfirmation>
                ):('')   
            }
            {
                modalConfirmation === 'excluir'?(
                    <ModalConfirmation handleFunction={()=>{salvarDados('excluir')}} text={'Excluir este cliente! Deseja continuar?'}></ModalConfirmation>
                ):('')   
            }
        </>
    )
}