import {
    NavBusca,
    Input,
    ButtonBuscar,
    List,
    Li,
    Span
} from './style';
import {Paginacao} from '../../../../components/index';
import {useListClientes} from './action';
import {Icons} from '../../../../icons/index';

export const ListClientes = () => {
    const [
        Buscar,
        listCliente,
        AddCliente,
        validation,
        PreencherBusca,
        BuscarTodos
    ] = useListClientes();

    return (
        <>
            <NavBusca>
                <h3>{Icons().FaUserAlt} Buscar Clientes: </h3>
                <Input autoFocus request={validation} placeholder="Nome do cliente" onChange={event => PreencherBusca(event.target.value)}/>
                <ButtonBuscar onClick={()=>{Buscar()}}>{Icons().FaSearch} Buscar</ButtonBuscar>
                <ButtonBuscar onClick={()=>{BuscarTodos()}}>{Icons().FaSearch} Todos</ButtonBuscar>
            </NavBusca>
            <List className="scroll-style">
                {
                    listCliente.map((element) => (
                        <Li key={element._id} onClick={()=>{AddCliente(element)}}> 
                            <strong>
                                {Icons().FaUserAlt} Nome: {element.name}
                            </strong>
                            <Span>
                                Tel.:{element.phone}
                            </Span>
                        </Li>
                    ))
                }
                {
                    listCliente.length === 0? <h4 style={{textAlign:'center'}}>Nenhum cliente encontrado!</h4>:''
                }
            </List>
            {
                //listCliente.length > 20? <Paginacao size={10} />:''
            }
        </>
    )
}