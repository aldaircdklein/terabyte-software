import {
    NavBusca,
    Input,
    ButtonBuscar,
    List,
    Li,
    Span
} from './style';
import {Paginacao} from '../../../../components/index';
import {useListProduto} from './action';
import {Icons} from '../../../../icons/index';
import {FormatString} from '../../../../util/index';

export const ListProduto = () => {
    const [
        Buscar,
        listProduto,
        validation,
        AddProduto,
        PreencherBusca,
        BuscarTodos
    ] = useListProduto();

    return (
        <>
            <NavBusca>
                <h3>{Icons().FaBoxOpen} Buscar produto: </h3>
                <Input autoFocus request={validation} placeholder="Nome ou código do produto" onChange={event => PreencherBusca(event.target.value)}/>
                <ButtonBuscar onClick={()=>{Buscar()}}>{Icons().FaSearch} Buscar</ButtonBuscar>
                <ButtonBuscar onClick={()=>{BuscarTodos()}}>{Icons().FaSearch} Todos</ButtonBuscar>
            </NavBusca>
            <List className="scroll-style">
                {
                    listProduto.map((element) => (
                        <Li stock={element.minStock < element.quantity} title={`Descrição: ${element.description}`} key={element._id} onClick={()=>{AddProduto(element)}}> 
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