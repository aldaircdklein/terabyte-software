import {
    NavBusca,
    List,
    Li,
    Span
} from './style'
import { format, parseISO } from 'date-fns';
import {useListServicoPendente} from './action';
import {Icons} from '../../../../icons/index';

export const TelaListaServicoPendente = () => {
    const [
        separarDados,
        listPendente
    ] = useListServicoPendente();

    return (
        <>
            <NavBusca>
                <h3>{Icons().FaClock} Lista serviços pendentes</h3>
                <span style={{marginLeft:'20%'}}><h4>Total: {listPendente.length}</h4></span>
            </NavBusca>
            <List className="scroll-style">
                {
                    listPendente.map((element) => (
                        <Li key={`list${element.serviceOrders[0]._id}`} onClick={()=>{separarDados(element)}}> 
                            <strong>
                                {Icons().FaWrench} Cliente: {element.user.name}
                            </strong>
                            <Span>
                                Data Entrada: {format(parseISO(element.serviceOrders[0].createdAt), 'dd/MM/yyyy HH:mm:ss')}
                            </Span>
                            <div>
                                <p>Descrição do problema: {element.serviceOrders[0].problemDescription}</p>
                                <p>Modelo: {element.computer.computerModel}</p>
                            </div>
                        </Li>
                    ))
                }
                {
                    listPendente.length === 0? (<h4 style={{textAlign:'center'}}>Nenhum pendente encontrado!</h4>):('')
                }
            </List>
        </>
    )
}