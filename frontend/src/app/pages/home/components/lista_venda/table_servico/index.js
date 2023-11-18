import {
    ButtonAction,
    Table,
    Td,
    Th,
    Span,
    Span2,
    Select,
    Input
} from './style';
import {
    Colors,
    FormatString,
    Mask
} from '../../../../../util/index';
import {useTableServico} from './action';
import { format, parseISO } from 'date-fns';
import {Icons} from '../../../../../icons/index';

export const TableServico = ({listVenda}) => {
    const [
        SelectService,
        Salvar,
        ModificationDesconto,
        ModificationPartePagamento
    ] = useTableServico();

    return (
        <>
        {
            listVenda.map((element) => (
                <Table key={element.computer._id}>
                    <tbody>
                        <tr>
                            <Th bgtitle={true} colSpan="5">{Icons().FaFileInvoiceDollar} Venda - {format(parseISO(element.serviceOrders[0].createdAt), 'dd/MM/yyyy HH:mm:ss')}</Th>
                        </tr>
                        <tr>
                            <Th colSpan="5">Cliente</Th>
                        </tr>
                        <tr>
                            <Td colSpan="3" title={`Nome: ${element.user.name}`}>Nome: {FormatString(element.user.name,35)}</Td>
                            <Td>Telefone: {element.user.phone}</Td>
                            <Td>CPF: {element.user.cpf}</Td>
                        </tr>
                        <tr>
                            <Th colSpan="5">Aparelho</Th>
                        </tr>
                        <tr>
                            <Td title={`Código: ${element.computer.code}`}>Código: {FormatString(element.computer.code,15)}</Td>
                            <Td colSpan="4" title={`Modelo: ${element.computer.computerModel}`}>Modelo: {FormatString(element.computer.computerModel,20)}</Td>
                        </tr>
                        {
                            element.serviceOrders.map((element2) => (
                                <>
                                    <tr>
                                        <Th colSpan="5">Ordem de serviço - [<Span2 payment={element2.paymentType !== 'cancel'}>{element2.paymentType === 'cancel'? 'Serviço cancelado':'Serviço concluído'}</Span2>]</Th>
                                    </tr>
                                    <tr>
                                        <Td colSpan="3" title={`Problema relatado: ${element2.problemDescription}`}>Problema relatado: {FormatString(element2.problemDescription,30)}</Td>
                                        <Td>Data início: {format(parseISO(element2.startDate), 'dd/MM/yyyy HH:mm:ss')}</Td>
                                        <Td><strong>Mão de obra: R$ <Span>{(parseFloat(element2.servicePrice)).toFixed(2)}</Span></strong></Td>
                                    </tr>
                                    <tr>
                                        <Th>Código</Th>
                                        <Th>Descrição</Th>
                                        <Th>Quantidade</Th>
                                        <Th>Preço uni.</Th>
                                        <Th>Preço total</Th>
                                    </tr>
                                    {
                                        Object.keys(element2.sold).length > 0? (
                                            element2.sold.items.map((element3) => (
                                                element3.product.length > 0?(
                                                    <tr>
                                                        <Td>{element3.product[0].code}</Td>
                                                        <Td title={element3.product[0].name}>{FormatString(element3.product[0].name,50)}</Td>
                                                        <Td>{element3.quantity}</Td>
                                                        <Td><strong>R$ <Span>{(parseFloat(element3.product[0].price)).toFixed(2)}</Span></strong></Td>
                                                        <Td><strong>R$ <Span>{(parseFloat(element3.product[0].price)*parseFloat(element3.quantity)).toFixed(2)}</Span></strong></Td>
                                                    </tr>
                                                ):<></>
                                            ))
                                        ):<></>
                                    }
                                    <tr>
                                        <Td colSpan="1"><strong>Total produtos: R$ <Span>{(parseFloat(element2.sold.total? element2.sold.total:0)).toFixed(2)}</Span></strong></Td>
                                        <Td colSpan="1"><strong>Total mão de obra: R$ <Span>{(parseFloat(element2.servicePrice)).toFixed(2)}</Span></strong></Td>
                                        <Td colSpan="1"><strong>Desconto: R$ <Span>{(parseFloat(element2.discount? element2.discount:0)).toFixed(2)}</Span></strong></Td>
                                        <Td colSpan="1"><strong>Parte paga: R$ <Span>{(parseFloat(element2.partPayment? element2.partPayment:0)).toFixed(2)}</Span></strong></Td>
                                        <Td colSpan="1"><strong>Total: R$ <Span>{(parseFloat(element2.sold.total? element2.sold.total:0) + parseFloat(element2.servicePrice) - parseFloat(element2.discount? element2.discount:0) - parseFloat(element2.partPayment? element2.partPayment:0)).toFixed(2)}</Span></strong></Td>
                                    </tr>
                                    <tr>
                                        <Td colSpan="2"><strong>Pagamento - [<Span2 payment={element2.paid}>{element2.paid? 'Concluído':'Pendente'}</Span2>]</strong></Td>
                                        <Td colSpan="3"><strong>Pagamento - [<Span2 payment={element2.paid}>{element2.paid? 'Concluído':'Pendente'}</Span2>]</strong></Td>
                                    </tr>
                                    <tr>
                                        <Td colSpan="3">
                                            <p>
                                                Desconto: R$ <Input placeholder={"Desconto"} onChange={event => ModificationDesconto({element,element2}, Mask(event.target.value,'money'))} value={element2.discount} width={'20%'}/>
                                                Parte paga: R$ <Input placeholder={"Parte já paga"} onChange={event => ModificationPartePagamento({element,element2}, Mask(event.target.value,'money'))} value={element2.partPayment} width={'20%'}/>
                                            </p>
                                        </Td>
                                        <Td colSpan="1">
                                            <Select onChange={event => SelectService({element,element2,paymentType:event.target.value})} value={element2.paymentType}>
                                                <option value='cash'>Dinheiro</option>
                                                <option value='debit'>Débito</option>
                                                <option value='credit'>Crédito avista</option>
                                                <option value='dividedcredit'>Crédito parcelado</option>
                                                <option value='transfer'>Transferência</option>
                                                <option value='pix'>Pix</option>
                                                <option value='check'>Cheque</option>
                                                <option value='onCredit'>Não pago</option>
                                                <option value='cancel'>Serviço não executado</option>
                                            </Select>
                                        </Td>
                                        <Td colSpan="1"><ButtonAction onClick={()=>{Salvar(element2)}} color={Colors().white} bgcolor={Colors().primary} marginTop="8vh">{Icons().FaSave} Salvar</ButtonAction></Td>
                                    </tr>
                                </>
                            ))   
                        }
                    </tbody>
                </Table>
            ))
        }
        </>
    )
}