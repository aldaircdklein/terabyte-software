import {
    Container,
    DivCol,
    TextArea,
    List,
    Li,
    ButtonAction,
    Label,
    FormRow,
    DivRow,
    Span
} from './style';
import {Icons} from '../../../../icons/index';
import {
    Colors,
    FormatString
} from '../../../../util/index';
import { format, parseISO } from 'date-fns';
import {useTelaWhatsapp} from './action';

export const TelaRecado = () => {
    const [
        recado,
        listRecado,
        validation,
        SalvarDados,
        PreencherMessage,
        ModificarStatus,
        SelecionarMessage,
        LiberarNovo
    ] = useTelaWhatsapp();

    return (
        <>
            <Container>
                <h3>{Icons().FaEdit} Recados</h3>
                <hr/>
                <DivRow>
                    <DivCol>
                        <FormRow>
                            <Label>Recado:</Label>
                            <TextArea request={validation} onChange={event => PreencherMessage(event.target.value)} value={recado.message}></TextArea>
                        </FormRow>
                        <DivCol>
                            {
                                recado._id?(
                                    <>
                                        <ButtonAction onClick={()=> {LiberarNovo()}} bgcolor={Colors().white} color={Colors().black}>{Icons().FaPlus} Novo</ButtonAction>
                                        <ButtonAction onClick={()=> {SalvarDados('atualizar')}} bgcolor={Colors().primary} color={Colors().white}>{Icons().FaEdit} Atualizar</ButtonAction>
                                        <ButtonAction onClick={()=> {SalvarDados('excluir')}} bgcolor={Colors().danger} color={Colors().white}>{Icons().FaTrashAlt} Excluir</ButtonAction>
                                        <ButtonAction onClick={()=> {ModificarStatus(!recado.status)}} bgcolor={!recado.status? Colors().orange2:Colors().black} color={Colors().white}>{Icons().FcApproval} {!recado.status? 'Executado':'Não Executado'}</ButtonAction>
                                    </>
                                ):(<ButtonAction onClick={()=> {SalvarDados('cadastrar')}} bgcolor={Colors().primary} color={Colors().white}>{Icons().FaCheck} Adicionar</ButtonAction>)
                            }
                        </DivCol>    
                    </DivCol>
                    <DivCol>
                        <List className="scroll-style">
                        {
                            listRecado.map((element) => (
                                <Li key={element._id} onClick={()=> {SelecionarMessage(element)}} bgcolor={element.status? Colors().green2:Colors().secondary}>
                                    {FormatString(element.message, 20)}
                                    <Span>
                                        Criada: {format(parseISO(element.createdAt), 'dd/MM/yyyy')}
                                    </Span>
                                </Li>
                            ))
                        }
                        {
                            listRecado.length > 0?(
                                <></>
                            ):(<h4 style={{textAlign:'center'}}>Nenhum recado!</h4>)
                        }
                        </List>
                    </DivCol>
                </DivRow>
            </Container>
        </>
    )
}

//