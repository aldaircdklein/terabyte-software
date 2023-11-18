import {
    NavBusca,
    Input,
    ButtonBuscar,
    List,
    Li,
    Span
} from './style';
import {Paginacao} from '../../../../components/index';
import {useActionListProduto} from './action';
import {Icons} from '../../../../icons/index';
import {FormatString} from '../../../../util/index';

export const ListProduto = () => {
    const [
        listProduto,
        validation,
        busca,
        Buscar,
        AddProduto,
        PreencherBusca,
        BuscarTodos
    ] = useActionListProduto();

    return (
        <>
            <NavBusca>
                <h3>{Icons().FaBoxOpen} Buscar produto: </h3>
                <Input autoFocus request={validation} placeholder="Nome ou código do produto" value={busca} onChange={event => PreencherBusca(event.target.value)}/>
                <ButtonBuscar onClick={()=>{Buscar()}}>{Icons().FaSearch} Buscar</ButtonBuscar>
                <ButtonBuscar onClick={()=>{BuscarTodos()}}>{Icons().FaSearch} Todos</ButtonBuscar>
            </NavBusca>
            <List className="scroll-style">
                {
                    listProduto.map((element) => (
                        <Li key={element._id} stock={element.minStock < element.quantity} title={`Descrição: ${element.description}`} onClick={()=>{AddProduto(element)}}> 
                            <strong>
                                {Icons().FaBoxOpen} Nome: {FormatString(element.name,50)} - Estoque: {element.quantity}
                            </strong>
                            <Span>
                                Código: {element.code}
                            </Span>
                        </Li>
                    ))
                }
                {
                    listProduto.length === 0? <h4 style={{textAlign:'center'}}>Nenhum produto encontrado!</h4>:''
                }
            </List>
            {
                //listProduto.length > 20? <Paginacao size={10} />:''
            }
        </>
    )
}