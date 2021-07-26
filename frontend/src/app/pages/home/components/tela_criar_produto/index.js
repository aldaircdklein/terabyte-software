import {
    ButtonAction,
    FormRow,
    GrupButton,
    Input,
    Label,
    ShadowBox,
    TextArea,
    FormContainer
} from './style';
import {
    Mask,
    TypeNumber,
    Colors
} from '../../../../util/index';
import {Icons} from '../../../../icons/index';
import {useTelaProduto} from './action'
import {ModalConfirmation} from '../../../../components/index';

export const TelaProduto = () => {
    const [
        SalvarDados,
        code,
        name,
        description,
        quantity,
        cost,
        price,
        validation,
        PreencherCode,
        PreencherNome,
        PreencherDescription,
        PreencherQuantity,
        PreencherCost,
        PreencherPrice,
        PreencherMinStock,
        minStock,
        telaProduto,
        ModificationModalConfirmation,
        modalConfirmation,
        ModificationShowModal2
    ] = useTelaProduto();

    return (
        <>
            <FormContainer>
                <ShadowBox>
                    <h3>{Icons().FaBoxOpen} Dados do produto</h3>
                    <hr/>
                    <FormRow>
                        <Label>Código:</Label>
                        <Input request={validation} placeholder="Código" onChange={event => PreencherCode(event.target.value)} value={code}/>
                        <Label>Mínimo_estoque:</Label>
                        <Input request={validation} placeholder="Ao atingir está quantidade será alertado" onChange={event => PreencherMinStock(event.target.value)} value={minStock}/>
                    </FormRow>
                    <FormRow>
                        <Label>Nome:</Label>
                        <Input request={validation} placeholder="Nome do produto" onChange={event => PreencherNome(event.target.value)} value={name}/>
                    </FormRow>
                    <FormRow>
                        <Label>Descrição:</Label>
                        <TextArea request={validation} placeholder="Descrição" onChange={event => PreencherDescription(event.target.value)} value={description}></TextArea>
                    </FormRow>
                    <FormRow>
                        <Label>Quantidade:</Label>
                        <Input request={validation} type="number" placeholder="Quantidade" onChange={event => PreencherQuantity(event.target.value)} value={quantity}/>
                        <Label>Preço_custo:</Label>
                        <Input request={validation} placeholder="Preço custo" onChange={event => {PreencherCost(Mask(event.target.value,'money')); TypeNumber()}} value={cost}/>
                        <Label>Preço_venda:</Label>
                        <Input request={validation} placeholder="Preço venda" onChange={event => {PreencherPrice(Mask(event.target.value,'money')); TypeNumber()}} value={price}/>
                    </FormRow>
                    <GrupButton>
                        {
                            telaProduto === 'cadastrar'?(
                                <ButtonAction onClick={()=>{SalvarDados('cadastrar')}} color={Colors().white} bgcolor={Colors().primary}>{Icons().FaSave} Criar</ButtonAction>
                            ):(
                                <>
                                    <ButtonAction onClick={()=>{ModificationModalConfirmation('atualizar'); ModificationShowModal2(true)}} color={Colors().white} bgcolor={Colors().primary}>{Icons().FaEdit} Modificar</ButtonAction>
                                    <ButtonAction onClick={()=>{ModificationModalConfirmation('excluir'); ModificationShowModal2(true)}} color={Colors().white} bgcolor={Colors().danger}>{Icons().FaTrashAlt} Excluir</ButtonAction>
                                </>
                            )
                        }
                    </GrupButton>
                </ShadowBox>
            </FormContainer>
            {
                modalConfirmation === 'atualizar'?(
                    <ModalConfirmation handleFunction={()=>{SalvarDados('atualizar')}} text={'Atualizar este produto! Deseja continuar?'}></ModalConfirmation>
                ):('')   
            }
            {
                modalConfirmation === 'excluir'?(
                    <ModalConfirmation handleFunction={()=>{SalvarDados('excluir')}} text={'Excluir este produto! Deseja continuar?'}></ModalConfirmation>
                ):('')   
            }
        </>
    )
}