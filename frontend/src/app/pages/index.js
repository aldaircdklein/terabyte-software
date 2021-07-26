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
    VendaProvider
} from '../pages/home/contexts/index';
import {Home} from './home/index';

export const ProviderHome = () => {
    return (
        <AlertProvider>
            <LoardingProvider>
                <ModalProvider>
                    <TelasCriarProvider>
                        <BloqueioMenuProvider>
                            <VendaProvider>
                                <ProdutoProvider>
                                    <ServicoProvider>
                                        <ComputerProvider>
                                            <ClienteProvider>
                                                <Home />
                                            </ClienteProvider>
                                        </ComputerProvider>
                                    </ServicoProvider>
                                </ProdutoProvider>
                            </VendaProvider>
                        </BloqueioMenuProvider>
                    </TelasCriarProvider>
                </ModalProvider>
            </LoardingProvider>
        </AlertProvider>
    )
}