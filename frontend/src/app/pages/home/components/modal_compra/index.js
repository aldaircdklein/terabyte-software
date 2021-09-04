import {
    Input,
    Select,
    DivList,
    List,
    Li,
    ButtonAction,
    TextArea
} from './style';
import {
    ModalContainer,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalConfirmation
} from '../../../../components/index';
import {Icons} from '../../../../icons/index';
import {useModalCompra} from './action';
import {
    Colors,
    FormatString,
    Mask,
    TypeNumber
} from '../../../../util/index';

export const ModalCompra = ({typeRequest}) => {
    const [
        salvarDados,
        efetuarBusca,
        addProduto,
        modificarQuantidade,
        removerProduto,
        show,
        ModificationShow,
        ModificationShowModal,
        ModificationShowModal2,
        PreencherBusca,
        validation,
        modalConfirmation,
        ModificationModalConfirmation,
        PreencherQtd,
        qtd,
        busca,
        listProduto,
        SelecionarProduto,
        selectProduto,
        listVenda,
        total,
        paid,
        paymentType,
        observation,
        discount,
        partPayment,
        PreencherPayment,
        PreencherName,
        PreencherObservacao,
        PreencherDesconto,
        PreencherPartePagamento,
        name
    ] = useModalCompra();

    return (
        <>
            <ModalContainer showModalState={show} sizeX="70vw" sizeY="80vh">
                <ModalHeader showModalState={()=>{ModificationShow(false); ModificationShowModal(false)}}>
                    <h3>{Icons().FaShoppingCart} Venda de peças</h3>
                </ModalHeader>
                <ModalBody className="scroll-style">
                    <Input request={validation} width="50%" onChange={event => PreencherBusca(event.target.value)} value={busca} placeholder="Digite o código do produto ou o nome"/>
                    <ButtonAction onClick={()=>{efetuarBusca()}} bgcolor={Colors().info} color={Colors().white}>{Icons().FaSearch} Buscar</ButtonAction>
                    <br/>
                    <Select onChange={event => SelecionarProduto(event.target.value)} value={selectProduto}>
                        {
                            listProduto.map((element) => (
                                <option key={`${element._id}liproduct`} title={`Nome: ${element.name} / Descrição: ${element.description}`} value={element._id}>Cod: {FormatString(element.code,5)} - {FormatString(element.name,20)} - R${(parseFloat(element.price)).toFixed(2)}</option>
                            ))
                        }
                    </Select>
                    <Input width="10%" onChange={event => PreencherQtd(event.target.value)} value={qtd} placeholder="Quantidade" />
                    <ButtonAction onClick={()=>{addProduto()}} bgcolor={Colors().success} color={Colors().white}>{Icons().FaPlus} Adicionar</ButtonAction>
                    <DivList>
                        <List className="scroll-style">
                            {
                                listVenda.map((element) => (
                                    <Li key={`${element.product._id}liVenda`} title={`Nome: ${element.product.name} / Descrição: ${element.product.description}`}>
                                        Código: {element.product.code} - {FormatString(element.product.name,50)}
                                        <Input placeholder={element.quantity} onBlur={event => modificarQuantidade(event.target.value,element.product._id)}/>
                                        Uni. R$ {(parseFloat(element.product.price)).toFixed(2)} - Total R$ {(parseFloat(element.product.price*element.quantity)).toFixed(2)}
                                        <ButtonAction onClick={()=>{removerProduto(element.product._id)}} bgcolor={Colors().danger} color={Colors().white}>{Icons().FaTrashAlt} Exluir</ButtonAction>
                                    </Li>        
                                ))
                            }
                        </List>
                        {
                            typeRequest === 'servico'?(
                                <h2>Preço total: R$ {(parseFloat(total)).toFixed(2)}</h2>    
                            ):(
                                <>
                                    <TextArea placeholder="Observações" onChange={event => PreencherObservacao(event.target.value)} value={observation}></TextArea>
                                    <p>Desconto:
                                        <Input placeholder={"Desconto"} onChange={event => {PreencherDesconto(Mask(event.target.value,'money')); TypeNumber()}} value={discount}/>
                                    </p>
                                    <p>Parte_paga:
                                        <Input placeholder={"parte já paga"} onChange={event => {PreencherPartePagamento(Mask(event.target.value,'money')); TypeNumber()}} value={partPayment}/>
                                    </p>
                                    <h4>SubTotal: R$ {(parseFloat(total)).toFixed(2)} - Desconto: R$ {(parseFloat(discount)).toFixed(2)} - Parte paga: R$ {(parseFloat(partPayment)).toFixed(2)}</h4>
                                    <h2>Preço total: R$ {(parseFloat(total) - parseFloat(discount) - parseFloat(partPayment)).toFixed(2)}</h2>
                                </>
                            )
                        }
                    </DivList>
                </ModalBody>
                <ModalFooter>
                    <ButtonAction bgcolor={Colors().secondary} onClick={()=>{ModificationShow(false); ModificationShowModal(false)}}>{Icons().FaTimes} Cancelar</ButtonAction>
                    {
                        typeRequest === 'servico'?(
                            <ButtonAction disabled={listVenda.length < 1} onClick={()=>{ModificationModalConfirmation('cadastrar'); ModificationShowModal2(true)}} bgcolor={Colors().primary} color={Colors().white} marginLeft="1vh">{Icons().FaSave} Vincular peças</ButtonAction>
                        ):(
                            <>
                                <Select style={{marginLeft:'10vw'}} onChange={event => PreencherPayment(event.target.value)} value={paymentType}>
                                    <option value='cash'>Dinheiro</option>
                                    <option value='debit'>Débito</option>
                                    <option value='credit'>Crédito avista</option>
                                    <option value='dividedcredit'>Crédito parcelado</option>
                                    <option value='transfer'>Transferência</option>
                                    <option value='pix'>Pix</option>
                                    <option value='check'>Cheque</option>
                                    <option value='onCredit'>Não pago</option>
                                </Select>
                                {
                                    !paid?(
                                        <Input request={validation} placeholder={"Nome do comprador"} onChange={event => PreencherName(event.target.value)} value={name}/>
                                    ):('')
                                }
                            <ButtonAction disabled={listVenda.length < 1} onClick={()=>{ModificationModalConfirmation('cadastrar'); ModificationShowModal2(true)}} bgcolor={Colors().primary} color={Colors().white} marginLeft="1vh">{Icons().FaSave} Efetuar venda</ButtonAction>
                            </>
                        )
                    }
                </ModalFooter>
            </ModalContainer>
            {
                modalConfirmation === 'cadastrar'?(
                    <ModalConfirmation handleFunction={()=>{salvarDados(typeRequest)}} text={'Efetuar venda! Deseja continuar?'}></ModalConfirmation>
                ):('')   
            }
        </>
    )
}