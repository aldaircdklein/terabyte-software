import {
    NavBusca,
    Input,
    ButtonBuscar,
    List,
    Li,
    Span
} from './style';
import {
    FormatString
} from '../../../../util/index';
import {Paginacao} from '../../../../components/index';
import {useListComputer} from './action';
import {Icons} from '../../../../icons/index'

export const ListComputador = () => {
    const [
        Buscar,
        separarDados,
        validation,
        listComputer,
        PreencherBusca,
		busca
    ] = useListComputer();

    return (
        <>
            <NavBusca>
                <h3>{Icons().FaDesktop} Buscar Aparelho: </h3>
                <Input autoFocus request={validation} placeholder="Código do computador" onChange={event => PreencherBusca(event.target.value)} value={busca}/>
                <ButtonBuscar onClick={()=>{Buscar()}}>{Icons().FaSearch} Buscar</ButtonBuscar>
            </NavBusca>
            <List className="scroll-style">
                {
                    listComputer.map((element) => (
                        <Li key={element._id} onClick={()=>{separarDados(element)}}> 
                            <strong>
                                {Icons().FaDesktop} Modelo: {element.computerModel}
                            </strong>
                            <Span>
                                Código: {FormatString(element.code,10)}
                            </Span>
                        </Li>
                    ))
                }
                {
                    listComputer.length === 0? <h4 style={{textAlign:'center'}}>Nenhum computador encontrado!</h4>:''
                }
            </List>
            {
                //listVeiculo.length > 20? <Paginacao size={10} />:''
            }
        </>
    )
}