import {
    AlertProvider,
    ModalProvider,
    TelasCriarProvider,
    LoardingProvider,
    BloqueioMenuProvider
} from '../util/contexts/index';
import {
    ClienteProvider,
    ComputerProvider,
    ServicoProvider,
    ProdutoProvider,
    VendaProvider,
    ListProdutoProvider,
    VinProductProvider
} from '../pages/home/contexts/index';
import {Home} from './home/index';

export const ProviderHome = () => {
    return (
        <AlertProvider>
            <LoardingProvider>
                <VinProductProvider>
                    <ModalProvider>
                        <TelasCriarProvider>
                            <BloqueioMenuProvider>
                                <VendaProvider>
                                    <ProdutoProvider>
                                        <ServicoProvider>
                                            <ComputerProvider>
                                                <ClienteProvider>
                                                    <ListProdutoProvider>
                                                        <Home />
                                                    </ListProdutoProvider>
                                                </ClienteProvider>
                                            </ComputerProvider>
                                        </ServicoProvider>
                                    </ProdutoProvider>
                                </VendaProvider>
                            </BloqueioMenuProvider>
                        </TelasCriarProvider>
                    </ModalProvider>
                </VinProductProvider>
            </LoardingProvider>
        </AlertProvider>
    )
}