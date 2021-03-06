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
    FormatString
} from '../../../../../util/index';
import {useTableServico} from './action';
import { format, parseISO } from 'date-fns';
import {Icons} from '../../../../../icons/index';

export const TableProduto = ({listVenda}) => {
    const [
        SelectServiceSold,
        Salvar,
        ModificationDesconto,
        ModificationPartePagamento
    ] = useTableServico();

    return (
        <>
        {
            listVenda.map((element) => (
                <Table key={element._id}>
                    <thead>
                        <tr>
                            <Th bgtitle={true} colSpan="5">{Icons().FaFileInvoiceDollar} Venda - {format(parseISO(element.createdAt), 'dd/MM/yyyy HH:mm:ss')}</Th>
                        </tr>
                        <tr>
                            <Th colSpan="5">Produtos</Th>
                        </tr>
                        <tr>
                            <Th>Código</Th>
                            <Th>Descrição</Th>
                            <Th>Quantidade</Th>
                            <Th>Preço uni.</Th>
                            <Th>Preço total</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            element.items.map((element2) => (
                                <tr key={element2._id}>
                                    <Td>{element2.product.code}</Td>
                                    <Td title={`Descrição: ${element2.product.name}`}>{FormatString(element2.product.name,50)}</Td>
                                    <Td>{element2.quantity}</Td>
                                    <Td><strong>R$ <Span>{(parseFloat(element2.product.price)).toFixed(2)}</Span></strong></Td>
                                    <Td><strong>R$ <Span>{(parseFloat(element2.product.price)*parseFloat(element2.quantity)).toFixed(2)}</Span></strong></Td>
                                </tr>
                            ))   
                        }
                        {
                            element.serviceOrder?(
                                <>
                                    <tr>
                                        <Th colSpan="5">Venda em ordem de serviço</Th>
                                    </tr>
                                    <tr>
                                        <Td colSpan="3" title={`Problema relatado: ${element.serviceOrder.problemDescription}`}>Problema relatado: {FormatString(element.serviceOrder.problemDescription,30)}</Td>
                                        <Td>Data início: {format(parseISO(element.serviceOrder.startDate), 'dd/MM/yyyy HH:mm:ss')}</Td>
                                        <Td><strong>Mão de obra: R$ <Span>{(parseFloat(element.serviceOrder.servicePrice)).toFixed(2)}</Span></strong></Td>
                                    </tr>
                                </>
                            ):(
                                <>
                                    {
                                        element.name? (
                                            <Td colSpan="5" title={`Nome: ${element.name}`}>Comprador: {FormatString(element.name,35)}</Td>
                                        ):<></>
                                    }
                                </>
                            )
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <Td colSpan="5">Observação: {element.observation}</Td>
                        </tr>
                        <tr>
                            <Td colSpan="5">Código: {element.code}</Td>
                        </tr>
                        <tr>
                            <Td colSpan="1"><strong>Total produtos: R$ <Span>{(parseFloat(element.total)).toFixed(2)}</Span></strong></Td>
                            <Td colSpan="1"><strong>Total mão de obra: R$ <Span>{(parseFloat(element.serviceOrder? element.serviceOrder.servicePrice:0)).toFixed(2)}</Span></strong></Td>
                            <Td colSpan="1"><strong>Desconto: R$ <Span>{(parseFloat(element.discount? element.discount:0)).toFixed(2)}</Span></strong></Td>
                            <Td colSpan="1"><strong>Parte paga: R$ <Span>{(parseFloat(element.partPayment? element.partPayment:0)).toFixed(2)}</Span></strong></Td>
                            <Td colSpan="1"><strong>Total: R$ <Span>{(parseFloat(element.total) + parseFloat(element.serviceOrder? element.serviceOrder.servicePrice:0)).toFixed(2)}</Span></strong></Td>
                        </tr>
                        <tr>
                            <Td colSpan="1"><strong>Pagamento - [<Span2 payment={element.paid}>{element.paid? 'Concluído':'Pendente'}</Span2>]</strong></Td>
                            <Td colSpan="2">
                                <p>
                                    Desconto: R$ <Input placeholder={"Desconto"} onBlur={event => ModificationDesconto({element},event.target.value)} width={'20%'}/>
                                    Parte paga: R$ <Input placeholder={"Parte já paga"} onBlur={event => ModificationPartePagamento({element},event.target.value)} width={'20%'}/>
                                </p>
                            </Td>
                            <Td colSpan="1">
                                <Select onChange={event => SelectServiceSold({element,paymentType:event.target.value})} value={element.paymentType}>
                                    <option value='cash'>Dinheiro</option>
                                    <option value='debit'>Débito</option>
                                    <option value='credit'>Crédito avista</option>
                                    <option value='dividedcredit'>Crédito parcelado</option>
                                    <option value='transfer'>Transferência</option>
                                    <option value='pix'>Pix</option>
                                    <option value='check'>Cheque</option>
                                    <option value='onCredit'>Crédito em loja</option>
                                </Select>
                            </Td>
                            <Td colSpan="1"><ButtonAction onClick={()=>{Salvar(element)}} color={Colors().white} bgcolor={Colors().primary} marginTop="8vh">{Icons().FaSave} Salvar</ButtonAction></Td>
                        </tr>
                    </tfoot>
                </Table>
            ))
        }
        </>
    )
}