import {
    ButtonAction,
    FormRow,
    GrupButton,
    Input,
    Label,
    ShadowBox,
    TextArea,
    FormContainer,
    Span
} from './style';
import {Icons} from '../../../../icons/index';
import {
    Colors,
    GerarImpressao
} from '../../../../util/index';
import {useTelaConfiguracao} from './action';
import {ModalConfirmation} from '../../../../components/index';
import {FolhaEtiqueta} from '../folha_impressao/index';

export const TelaConfiguracao = () => {
    const [
        prepararDados,
        msgAuto,
        nome,
        subtitulo,
        telefones,
        email,
        cnpjcpf,
        endereco,
        validation,
        PreencherMsgAuto,
        PreencherNome,
        PreencherSubtitulo,
        PreencherTelefones,
        PreencherEmail,
        PreencherCnpjCpf,
        PreencherEndereco,
        modalConfirmation,
        ModificationModalConfirmation,
        ModificationShowModal2
    ] = useTelaConfiguracao();

    return (
        <>
            <FormContainer>
                <ShadowBox>
                    <h3>{Icons().FaCog} Configurações</h3>
                    <hr/>
                    <p>Labs mensagem: <Span>@name(nome)</Span>, <Span>@phone(telefone)</Span>, <Span>@email(email)</Span>,
                        <Span>@cpf(CPF)</Span>, <Span>@computerModel(modelo)</Span>, <Span>@problemDescription(problema descrito)</Span>
                    </p>
                    <FormRow>
                        <Label>Mensagem_automática:</Label>
                        <TextArea request={validation} placeholder="Mensagem automática" onChange={event => PreencherMsgAuto(event.target.value)} value={msgAuto}></TextArea>
                    </FormRow>
                    <FormRow>
                        <Label>Nome_loja:</Label>
                        <Input request={validation} placeholder="Nome" onChange={event => PreencherNome(event.target.value)} value={nome}/>
                        <Label>Subtítulo:</Label>
                        <Input request={validation} placeholder="Subtitulo" onChange={event => PreencherSubtitulo(event.target.value)} value={subtitulo}/>
                        <Label>Telefones_loja:</Label>
                        <Input request={validation} placeholder="Telefones" onChange={event => PreencherTelefones(event.target.value)} value={telefones}/>
                    </FormRow>
                    <FormRow>
                        <Label>Email_loja:</Label>
                        <Input request={validation} placeholder="Email" onChange={event => PreencherEmail(event.target.value)} value={email}/>
                        <Label>CNPJ/CPF_loja:</Label>
                        <Input request={validation} placeholder="CNPJ/CPF" onChange={event => PreencherCnpjCpf(event.target.value)} value={cnpjcpf}/>
                    </FormRow>
                    <FormRow>
                        <Label>Endereço_loja:</Label>
                        <TextArea request={validation} placeholder="Endereço" onChange={event => PreencherEndereco(event.target.value)} value={endereco}></TextArea>
                    </FormRow>
                    <GrupButton>
                        <ButtonAction color={Colors().white} bgcolor={Colors().primary} onClick={()=>{ModificationModalConfirmation('cadastrar'); ModificationShowModal2(true)}}>{Icons().FaSave} Salvar</ButtonAction>
                        <ButtonAction color={Colors().white} bgcolor={Colors().success} onClick={()=>{GerarImpressao(FolhaEtiqueta())}}>{Icons().FaPrint} Etiqueta</ButtonAction>
                    </GrupButton>
                </ShadowBox>
            </FormContainer>
            {
                modalConfirmation === 'cadastrar'?(
                    <ModalConfirmation handleFunction={()=>{prepararDados()}} text={'Salvar configurações! Deseja continuar?'}></ModalConfirmation>
                ):('')   
            }
        </>
    )
}