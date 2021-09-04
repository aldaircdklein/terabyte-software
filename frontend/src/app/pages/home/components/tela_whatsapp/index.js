import {
    ButtonAction,
    FormRow,
    GrupButton,
    Input,
    Label,
    ShadowBox,
    FormContainer
} from './style';
import {Icons} from '../../../../icons/index';
import {
    Colors,
    Mask
} from '../../../../util/index';
import {useTelaWhatsapp} from './action';

export const TelaWhatsapp = () => {
    const [
        phone,
        PreencherPhone,
        AbrirWhatsapp,
        validation
    ] = useTelaWhatsapp();

    return (
        <>
            <FormContainer>
                <ShadowBox>
                    <h3>{Icons().FaWhatsapp} Enviar mensagem Whatsapp</h3>
                    <hr/>
                    <FormRow>
                        <Label>Telefone:</Label>
                        <Input request={validation} placeholder="(xx)xxxxx-xxxx" onChange={event => PreencherPhone(Mask(event.target.value,'phone'))} value={phone}/>
                    </FormRow>
                    <GrupButton>
                        <ButtonAction color={Colors().white} bgcolor={Colors().primary} onClick={()=>{AbrirWhatsapp()}}>{Icons().FaWhatsapp} Abrir</ButtonAction>
                    </GrupButton>
                </ShadowBox>
            </FormContainer>
        </>
    )
}