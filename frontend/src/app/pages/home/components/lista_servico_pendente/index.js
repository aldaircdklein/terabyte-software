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
            </NavBusca>
            <List className="scroll-style">
                {
                    listPendente.map((element) => (
                        <Li key={`list${element.serviceOrders[0]._id}`} onClick={()=>{separarDados(element)}}> 
                            <strong>
                                {Icons().FaWrench} Descrição problema: {element.serviceOrders[0].problemDescription}
                            </strong>
                            <Span>
                                Data Entrada: {format(parseISO(element.serviceOrders[0].createdAt), 'dd/MM/yyyy HH:mm:ss')}
                            </Span>
                            <div>
                                <p>Código: {element.serviceOrders[0].code}</p>
                                <p>Cliente: {element.user.name}</p>
                                <p>Modelo: {element.computer.computerModel} - Código: {element.computer.code}</p>
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