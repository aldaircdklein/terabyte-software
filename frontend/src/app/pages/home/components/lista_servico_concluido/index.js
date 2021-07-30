import {
    NavBusca,
    Input,
    ButtonBuscar,
    List,
    Li,
    Span
} from './style.js'
import { format, parseISO } from 'date-fns';
import {useListServicoConcluido} from './action';
import {Icons} from '../../../../icons/index';

export const TelaListaServicoConcluido = () => {
    const [
        separarDados,
        Buscar,
        PreencherBusca,
        listConcluido,
        validation,
        busca
    ] = useListServicoConcluido();

    return (
        <>
            <NavBusca>
                <h3>{Icons().FaCheck} Lista serviços concluídos</h3>
                <Input autoFocus request={validation} placeholder="código da comanda" onChange={event => PreencherBusca(event.target.value)} value={busca}/>
                <ButtonBuscar onClick={()=>{Buscar()}}>{Icons().FaSearch} Buscar</ButtonBuscar>
            </NavBusca>
            <List className="scroll-style">
                {
                    listConcluido.map((element) => (
                        <Li key={`list${element.serviceOrders[0]._id}`} onClick={()=>{separarDados(element)}}> 
                            <strong>
                                {Icons().FaWrench} Descrição problema: {element.serviceOrders[0].problemDescription}
                            </strong>
                            <Span>
                                Data Entrada: {format(parseISO(element.serviceOrders[0].startDate), 'dd/MM/yyyy HH:mm:ss')}
                            </Span>
                            <div>
                                <p>Código: {element.serviceOrders[0].code}</p>
                                <p>Cliente: {element.user.name}</p>
                                <p>Modelo: {element.computer.computerModel} - Código: {element.computer.code} </p>
                             </div>
                        </Li>
                    ))
                }
                {
                    listConcluido.length === 0? (<h4 style={{textAlign:'center'}}>Nenhum concluído encontrado!</h4>):('')
                }
            </List>
        </>
    )
}