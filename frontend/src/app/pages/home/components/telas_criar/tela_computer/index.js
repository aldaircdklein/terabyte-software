import {
    Input,
    FormRow,
    ShadowBox,
    ButtonAction,
    GrupButton,
    List,
    Li,
    Label
} from './style';
import {
    Colors,
    FormatString
} from '../../../../../util/index';
import {Icons} from '../../../../../icons/index';
import {useTelaComputer} from './action';
import {ModalConfirmation} from '../../../../../components/index';

export const TelaComputador = ({typeRequest}) => {
    const [
        salvarDados,
        selecionarServico,
        resetTelaComputer,
        code,
        computerModel,
        validation,
        listComputers,
        dataListComp,
        PreencherCodigo,
        PreencherModeloComputador,
        modalConfirmation,
        ModificationModalConfirmation,
        ModificationShowModal2
    ] = useTelaComputer();

    return (
        <>
            <ShadowBox>
                <h3>{Icons().FaDesktop} Dados do Aparelho</h3>
                <hr/>
                <List className="scroll-style">
                    {
                        typeRequest !== 'cadastrar'?(
                            <Li key={'licomputer1'} onClick={()=>{resetTelaComputer()}}> + <br /> Adicionar</Li>
                        ):('')
                    }
                    {
                        listComputers.map((element) => (
                            <Li key={element._id} onClick={()=>{selecionarServico(element)}}>{Icons().FaDesktop}<div style={{marginLeft:"1vw"}}>{FormatString(element.computerModel,20)} <br /> {FormatString(element.code,20)}</div></Li>
                        ))
                    }
                </List>
                <hr/>
                <FormRow>
                    <Label>Código:</Label>
                    <Input autoFocus request={validation} placeholder="Código" onChange={event => PreencherCodigo(event.target.value)} value={code}/>
                    <Label>Modelo_do_aparelho:</Label>
                    <Input request={validation} placeholder="Modelo do aparelho" list="listModeloComputer" onChange={event => PreencherModeloComputador(event.target.value)} value={computerModel}/>
                    <datalist id="listModeloComputer">
                        {
                            dataListComp.list.map((element) => (
                                <option value={element}/>
                            ))
                        }
                    </datalist>
                </FormRow>
                <GrupButton>
                    {
                        typeRequest === 'cadastrar'?(
                            <ButtonAction onClick={()=>{salvarDados('cadastrar')}} color={Colors().white} bgcolor={Colors().primary} marginTop="8vh">{Icons().FaSave} Criar</ButtonAction>
                        ):(
                            <>
                                <ButtonAction onClick={()=>{ModificationModalConfirmation('atualizar'); ModificationShowModal2(true)}} color={Colors().white} bgcolor={Colors().primary} marginTop="8vh">{Icons().FaEdit} Modificar</ButtonAction>
                                <ButtonAction onClick={()=>{ModificationModalConfirmation('excluir'); ModificationShowModal2(true)}} style={{marginLeft:'2vh'}} color={Colors().white} bgcolor={Colors().danger} marginTop="8vh">{Icons().FaTrashAlt} Excluir</ButtonAction>
                            </>
                        )
                    }
                </GrupButton>
            </ShadowBox>
            {
                modalConfirmation === 'atualizar'?(
                    <ModalConfirmation handleFunction={()=>{salvarDados('atualizar')}} text={'Atualizar este veiculo! Deseja continuar?'}></ModalConfirmation>
                ):('')   
            }
            {
                modalConfirmation === 'excluir'?(
                    <ModalConfirmation handleFunction={()=>{salvarDados('excluir')}} text={'Excluir este veiculo! Deseja continuar?'}></ModalConfirmation>
                ):('')   
            }
        </>
    )
}