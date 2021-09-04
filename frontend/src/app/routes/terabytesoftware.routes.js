import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import{
    AnimationHome,
    TelasCriar,
    ListClientes,
    TelaVenda,
    TelaProduto,
    ListComputador,
    ListProduto,
    TelaConfiguracao,
    TelaListaServicoPendente,
    TelaListaServicoConcluido,
    ListVenda,
    TelaWhatsapp
} from '../pages/home/components/index';
import {
    listRoutes
} from './lista.routes';


export function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path={listRoutes().animationHome} component={AnimationHome} />
                <Route path={listRoutes().clienteCreate} component={TelasCriar} />
                <Route path={listRoutes().clienteList} component={ListClientes} />
                <Route path={listRoutes().vendaProduct} component={TelaVenda} />
                <Route path={listRoutes().productCreate} component={TelaProduto} />
                <Route path={listRoutes().productList} component={ListProduto} />
                <Route path={listRoutes().computadorList} component={ListComputador} />
                <Route path={listRoutes().configuracao} component={TelaConfiguracao} />
                <Route path={listRoutes().servicePendentList} component={TelaListaServicoPendente} />
                <Route path={listRoutes().serviceConcluidoList} component={TelaListaServicoConcluido} />
                <Route path={listRoutes().vendaList} component={ListVenda} />
                <Route path={listRoutes().extrawhatsapp} component={TelaWhatsapp} />
            </Switch>
        </BrowserRouter>
    )
} 