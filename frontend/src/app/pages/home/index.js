import React, {useEffect} from 'react';
import {Routes} from "../../routes/terabytesoftware.routes";
import {
    FaDev
} from 'react-icons/fa';
import {
    Nav,
    NavImage,
    Container,
    Section,
    Main,
    CardItem,
    Footer
} from './style';
import {
    ListaMenu
} from './action';
import {navigation} from '../../util/index';
import {
    AlertMessage,
    Loarding
} from '../../components/index';
import {useTelasCriar} from '../../util/contexts/index';
import {listRoutes} from '../../routes/lista.routes';
import {useBloqueioMenu} from '../../util/contexts/index';

export const Home = () => {
    const {setTelaCliente, setTelaComputer, setTelaServico, setTelaProduto} = useTelasCriar();
    const {bloqueioMenu} = useBloqueioMenu();

    const setNavigation = (rota) => {
        setTelaCliente('cadastrar');
        setTelaComputer('cadastrar');
        setTelaServico('cadastrar');
        setTelaProduto('cadastrar')
        navigation(rota);
    }

    useEffect(()=>{
        if(window.location.pathname === '/'){
            navigation(listRoutes().animationHome);
        }
    },[])

    return(
        <>
            <Nav>
                <NavImage src={`/./assets/logo.png`} />
            </Nav>
            <AlertMessage />
            <Loarding />
            <Container>
                <Section className="scroll-style">
                    {
                        ListaMenu().map((element) => (
                            
                            <CardItem disabled={bloqueioMenu} key={Math.random()} onClick={()=> { setNavigation(element.action) } }>
                                {element.icon} {element.name}
                            </CardItem>
                        ))
                    }
                </Section>
                <Main className="scroll-style">
                    <Routes/>
                </Main>  
            </Container>
            <Footer>
                <FaDev/> Ainertec
            </Footer>
        </>
    )
}