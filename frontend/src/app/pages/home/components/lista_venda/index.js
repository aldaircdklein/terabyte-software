import {
    NavBusca,
    Input,
    ButtonBuscar,
    Select
} from './style';
import {TableProduto} from './table_produto/index';
import {TableServico} from './table_servico/index';
import {Paginacao} from '../../../../components/index';
import {useListVenda} from './action';
import {Icons} from '../../../../icons/index';

export const ListVenda = () => {
    const [
        Buscar,
        listVenda,
        validation,
        name,
        paid,
        tipo,
        PreencherDateStart,
        PreencherDateEnd,
        PreencherName,
        PreencherPaid,
        PreencherTipo,
        BuscarTodos
    ] = useListVenda();

    return (
        <>
            <NavBusca>
                <h3 style={{marginRight:'1vw'}}>{Icons().FaFileInvoiceDollar} Buscar vendas: </h3>
                Início:
                <Input autoFocus type="date" request={validation} onChange={event => PreencherDateStart(event.target.value)}/>
                Final:
                <Input type="date" request={validation} onChange={event => PreencherDateEnd(event.target.value)}/>
                <ButtonBuscar onClick={()=>{Buscar()}}>{Icons().FaSearch} Buscar</ButtonBuscar>
                <ButtonBuscar onClick={()=>{BuscarTodos()}}>{Icons().FaSearch} Todos</ButtonBuscar>
            </NavBusca>
            <NavBusca>
                <h3 style={{marginRight:'1vw'}}>Filtrar: </h3>
                Nome/código:
                <Input disabled={tipo === 'true'} placeholder={"Nome ou código"} onChange={event => PreencherName(event.target.value)} value={name}/>
                Pagamento:
                <Select disabled={tipo === 'true'} style={{marginRight:'1vw'}} onChange={event => PreencherPaid(event.target.value)} value={paid}>
                    <option value={true}>Pagos</option>
                    <option value={false}>Crédito em loja</option>
                </Select>
                Tipo:
                <Select onChange={event => PreencherTipo(event.target.value)} value={tipo}>
                    <option value={false}>Todos</option>
                    <option value={true}>Serviço</option>
                </Select>
            </NavBusca>
            {
                tipo === 'true'?(
                    <TableServico listVenda={listVenda} />
                ):(
                    <TableProduto listVenda={listVenda} />
                )
            }
            {
                listVenda.length === 0? <h4 style={{textAlign:'center'}}>Nenhuma venda encontrada!</h4>:''
            }
            {
                //listVenda.length > 20? <Paginacao size={10} />:''
            }
        </>
    )
}