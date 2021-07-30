import {
    FormRow,
    TextArea,
    Input,
    ShadowBox,
    ButtonAction,
    GrupButton,
    List,
    Li,
    Label,
    Table,
    Span,
    Select
} from './style';
import {ModalCompra} from '../../modal_compra/index';
import { format, parseISO } from 'date-fns';
import {ModalImpressao} from '../../modal_impressao/index';
import {ModalConfirmation} from '../../../../../components/index';
import {
    Mask,
    TypeNumber,
    Colors,
    FormatString
} from '../../../../../util/index';
import {useTelaServico} from './action';
import {Icons} from '../../../../../icons/index';

export const TelaServico = ({typeRequest}) => {
    const [
        salvarDados,
        finalizarServico,
        ReenviarWhatsapp,
        selecionarServico,
        resetTelaServico,
        voltage,
        password,
        energySource,
        missingScrew,
        calling,
        broken,
        open,
        observation,
        backup,
        handbag,
        problemDescription,
        diagnostic,
        serviceDescription,
        servicePrice,
        startDate,
        endDate,
        finished,
        validation,
        valueTotal,
        modalConfirmation,
        listServicos,
        listVenda,
        PreencherVoltagem,
        PreencherSenha,
        PreencherFonteEnergia,
        PreencherFaltaParafuso,
        PreencherLigando,
        PreencherQuebrado,
        PreencherAberto,
        PreencherObservacao,
        PreencherBackup,
        PreencherBolsa,
        PreencherProblemDescription,
        PreencherDiagnostic,
        PreencherServiceDescription,
        PreencherServicePrice,
        PreencherStartDate,
        ModificationModalConfirmation,
        ModificationShowModal,
        ModificationShowModal1,
        ModificationShowModal2,
        paid,
        paymentType,
        PreencherPayment,
        servico,
        discount,
        partPayment,
        PreencherDesconto,
        PreencherPartePagamento
    ] = useTelaServico();

    return (
        <>
            <ModalCompra typeRequest={'servico'}/>
            <ModalImpressao />
            <ShadowBox>
                <h3>{Icons().FaWrench} Ordem de serviço</h3>
                <hr/>
                <List className="scroll-style">
                    {
                        typeRequest !== 'cadastrar'?(
                            <Li key={'liservico1'} onClick={()=>{resetTelaServico()}}> + <br /> Adicionar</Li>
                        ):('')
                    }
                    {
                        listServicos.map((element) => (
                            <Li title={element.problemDescription} disabled={element._id === servico._id && typeRequest !== 'cadastrar'} key={element._id} onClick={()=>{selecionarServico(element)}}>
                                {Icons().FaWrench}
                                <div style={{marginLeft:"1vw"}}>
                                    {FormatString(element.problemDescription,20)} 
                                    <br />
                                    {format(parseISO(element.startDate), 'dd/MM/yyyy')}
                                    <br />
                                    <Span payment={element.paid}>-------</Span>
                                </div>
                            </Li>
                        ))
                    }
                </List>
                <hr/>
                    {
                        typeRequest !== 'cadastrar'?(
                            <FormRow style={{marginTop:'2vh'}}>
                                <h3>Pagamento - [<Span payment={paid}>{paid? 'Concluído':'Pendente'}</Span>]</h3>
                            </FormRow>
                        ):('')
                    }
                <FormRow>
                    {
                        finished?(
                            <h3 style={{textAlign:'center'}}>{Icons().FcApproval} Serviço concluído em {format(parseISO(endDate), 'dd/MM/yyyy HH:mm:ss')} {Icons().FcApproval}</h3>
                        ):(
                            <ButtonAction disabled={typeRequest === 'cadastrar'} onClick={()=>{finalizarServico()}} bgcolor={Colors().success} color={Colors().white} style={{marginRight:'5vw'}}>{Icons().FaCheck} Finalizar {Icons().FaWhatsapp}</ButtonAction>
                        )
                    }
                    {
                        typeRequest !== 'cadastrar'?(
                            <>
                                <Select style={{width:'20%'}} onChange={event => PreencherPayment(event.target.value)} value={paymentType}>
                                        <option value='cash'>Dinheiro</option>
                                        <option value='debit'>Débito</option>
                                        <option value='credit'>Crédito avista</option>
                                        <option value='dividedcredit'>Crédito parcelado</option>
                                        <option value='transfer'>Transferência</option>
                                        <option value='pix'>Pix</option>
                                        <option value='check'>Cheque</option>
                                        <option value='onCredit'>Crédito em loja</option>
                                </Select>
                                {
                                    finished?(
                                        <ButtonAction onClick={()=>{ReenviarWhatsapp()}} bgcolor={Colors().success} color={Colors().white} >Reenviar {Icons().FaWhatsapp}</ButtonAction>       
                                    ):<></>
                                }
                            </>
                        ):('')
                    }
                </FormRow>
                <FormRow>
                    <Label>Voltagem:</Label>
                    <Select autoFocus onChange={event => PreencherVoltagem(event.target.value)} value={voltage}>
                        <option value='110V'>110V</option>
                        <option value='220V'>220V</option>
                        <option value='Bivolt'>Bivolt</option>
                    </Select>
                    <Label>Fonte_de_energia:</Label>
                    <Select onChange={event => PreencherFonteEnergia(event.target.value)} value={energySource}>
                        <option value='Sim'>Sim</option>
                        <option value='Não'>Não</option>
                        <option value='Não se aplica'>Não se aplica</option>
                    </Select>
                    <Label>Falta_parafuso:</Label>
                    <Select onChange={event => PreencherFaltaParafuso(event.target.value)} value={missingScrew}>
                        <option value={false}>Não</option>
                        <option value={true}>Sim</option>
                    </Select>
                </FormRow>
                <FormRow>
                    <Label>Ligando:</Label>
                    <Select onChange={event => PreencherLigando(event.target.value)} value={calling}>
                        <option value={true}>Sim</option>
                        <option value={false}>Não</option>
                    </Select>
                    <Label>Quebrado:</Label>
                    <Select onChange={event => PreencherQuebrado(event.target.value)} value={broken}>
                        <option value={false}>Não</option>
                        <option value={true}>Sim</option>
                    </Select>
                    <Label>Aberto:</Label>
                    <Select onChange={event => PreencherAberto(event.target.value)} value={open}>
                        <option value={false}>Não</option>
                        <option value={true}>Sim</option>
                    </Select>
                </FormRow>
                {
                    typeRequest !== 'cadastrar'?(
                        <FormRow>
                            <Label>Entrada:</Label>
                            <Input type="date" onChange={event => PreencherStartDate(event.target.value)} value={startDate}/>
                            <Label>Preço_mão_de_obra:</Label>
                            <Input placeholder="Preço mão de obra" onChange={event => {PreencherServicePrice(Mask(event.target.value,'money')); TypeNumber()}} value={servicePrice}/>
                            <Label>Parte_paga:</Label>
                            <Input placeholder="Parte já paga" onChange={event => {PreencherPartePagamento(Mask(event.target.value,'money')); TypeNumber()}} value={partPayment}/>
                            <Label>Desconto:</Label>
                            <Input placeholder="Desconto" onChange={event => {PreencherDesconto(Mask(event.target.value,'money')); TypeNumber()}} value={discount}/>
                        </FormRow>
                    ):('')
                }
                <FormRow>
                    <Label>Backup:</Label>
                    <Select onChange={event => PreencherBackup(event.target.value)} value={backup}>
                        <option value={true}>Sim</option>
                        <option value={false}>Não</option>
                    </Select>
                    <Label>Bolsa:</Label>
                    <Select onChange={event => PreencherBolsa(event.target.value)} value={handbag}>
                        <option value={false}>Não</option>
                        <option value={true}>Sim</option>
                    </Select>
                    <Label>Senha:</Label>
                    <Input placeholder="Senha" onChange={event => PreencherSenha(event.target.value)} value={password}/>
                </FormRow>
                <FormRow>
                    <Label>Observações:</Label>
                    <TextArea placeholder="Observações" onChange={event => PreencherObservacao(event.target.value)} value={observation}></TextArea>
                </FormRow>
                <FormRow>
                    <Label>Defeito_relatado:</Label>
                    <TextArea request={validation} placeholder="Defeito relatado" onChange={event => PreencherProblemDescription(event.target.value)} value={problemDescription}></TextArea>
                </FormRow>
                <FormRow>
                    <Label>Informação_de_diagnóstico:</Label>
                    <TextArea placeholder="Informação diagnósticada" onChange={event => PreencherDiagnostic(event.target.value)} value={diagnostic}></TextArea>
                </FormRow>
                <FormRow>
                    <Label>Informação_do_serviço:</Label>
                    <TextArea placeholder="Informação do serviço" onChange={event => PreencherServiceDescription(event.target.value)} value={serviceDescription}></TextArea>
                </FormRow>         
                {
                    typeRequest !== 'cadastrar'?(
                        <FormRow style={{marginTop:'5vh'}}>            
                            <ButtonAction onClick={()=>{ModificationShowModal(true)}} color={Colors().white} bgcolor={Colors().primary}>{Icons().FaShoppingCart} Adicionar peça</ButtonAction>
                            <ButtonAction onClick={()=>{ModificationShowModal1(true)}} color={Colors().white} bgcolor={Colors().primary} style={{marginLeft:'2vh'}}>{Icons().FaPrint} Impressões</ButtonAction>
                        </FormRow>
                    ):('')
                }
                <Table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Preço unid.</th>
                            <th>Preço total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listVenda.map((element) => (
                                <tr key={`listProcuctServico${element.product._id? element.product._id:element.product[0]._id}`} style={{color:'black'}}>
                                    <td>{element.product.code? element.product.code:element.product[0].code}</td>
                                    <td title={`Descrição: ${element.product.description? element.product.description:element.product[0].description}`}>{FormatString(element.product.name? element.product.name:element.product[0].name,30)}</td>
                                    <td>x{element.quantity}</td>
                                    <td style={{color:'red'}}>R$ {(parseFloat(element.product.price? element.product.price:element.product[0].price)).toFixed(2)}</td>
                                    <td style={{color:'red'}}>R$ {(parseFloat((element.product.price? element.product.price:element.product[0].price)*element.quantity)).toFixed(2)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <h3>Valor total: R${(parseFloat(valueTotal)).toFixed(2)}</h3>
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
                    <ModalConfirmation handleFunction={()=>{salvarDados('atualizar')}} text={'Atualizar este serviço! Deseja continuar?'}></ModalConfirmation>
                ):('')   
            }
            {
                modalConfirmation === 'excluir'?(
                    <ModalConfirmation handleFunction={()=>{salvarDados('excluir')}} text={'Excluir este serviço! Deseja continuar?'}></ModalConfirmation>
                ):('')   
            }
        </>
    )
}

//disabled={listVenda.length > 0}