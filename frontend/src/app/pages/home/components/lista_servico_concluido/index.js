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
        listConcluido,
        validation,
        busca,
        separarDados,
        Buscar,
        PreencherBusca,
        BuscarDignostico,
        BuscarConcluidoNaoEntregue,
        BuscarConcluidoNaoExecutado
    ] = useListServicoConcluido();

    return (
        <>
            <NavBusca>
                <h3>{Icons().FaCheck} Lista serviços concluídos/buscados</h3>
            </NavBusca>
            <NavBusca>
                <h3>Filtro: </h3>
                <Input autoFocus request={validation} placeholder="Código da comanda ou diagnóstico" onChange={event => PreencherBusca(event.target.value)} value={busca}/>
                <ButtonBuscar onClick={()=>{Buscar()}}>{Icons().FaSearch} Buscar código</ButtonBuscar>
                <ButtonBuscar onClick={()=>{BuscarDignostico()}}>{Icons().FaSearch} Buscar diagnóstico</ButtonBuscar>
            </NavBusca>
            <NavBusca>
                <ButtonBuscar onClick={()=> {BuscarConcluidoNaoEntregue()}} >{Icons().FaSearch} Buscar finalizados não entregues</ButtonBuscar>
                <ButtonBuscar onClick={()=> {BuscarConcluidoNaoExecutado()}} >{Icons().FaSearch} Buscar não executados/cobrados</ButtonBuscar>
            </NavBusca>
            <List className="scroll-style">
                {
                    listConcluido.map((element) => (
                        <Li key={`list${element.serviceOrders[0]._id}`} onClick={()=>{separarDados(element)}}> 
                            <strong>
                                {Icons().FaWrench} Cliente: {element.user.name}
                            </strong>
                            <Span>
                                Data Entrada: {format(parseISO(element.serviceOrders[0].createdAt), 'dd/MM/yyyy HH:mm:ss')}
                            </Span>
                            <div>
                                <p>Descrição problema: {element.serviceOrders[0].problemDescription}</p>
                                <p>Diagnóstico: {element.serviceOrders[0].diagnostic}</p>
                                <p>Informação de serviço: {element.serviceOrders[0].serviceDescription}</p>
                                <p>Modelo: {element.computer.computerModel}</p>
                             </div>
                        </Li>
                    ))
                }
                {
                    listConcluido.length === 0? (<h4 style={{textAlign:'center'}}>Nenhum concluído/buscado encontrado!</h4>):('')
                }
            </List>
        </>
    )
}