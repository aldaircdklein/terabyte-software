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
    TelaWhatsapp,
    TelaRecado
} from '../pages/home/components/index';
import {
    listRoutes
} from './lista.routes';
import {
    NavigationVoltar
} from '../components/index';

export function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path={listRoutes().animationHome} component={() => {return (<><NavigationVoltar/><AnimationHome/></>)}} />
                <Route path={listRoutes().clienteCreate} component={() => {return (<><NavigationVoltar/><TelasCriar/></>)}} />
                <Route path={listRoutes().clienteList} component={() => {return (<><NavigationVoltar/><ListClientes/></>)}} />
                <Route path={listRoutes().vendaProduct} component={() => {return (<><NavigationVoltar/><TelaVenda/></>)}} />
                <Route path={listRoutes().productCreate} component={() => {return (<><NavigationVoltar/><TelaProduto/></>)}} />
                <Route path={listRoutes().productList} component={() => {return (<><NavigationVoltar/><ListProduto/></>)}} />
                <Route path={listRoutes().computadorList} component={() => {return (<><NavigationVoltar/><ListComputador/></>)}} />
                <Route path={listRoutes().configuracao} component={() => {return (<><NavigationVoltar/><TelaConfiguracao/></>)}} />
                <Route path={listRoutes().servicePendentList} component={() => {return (<><NavigationVoltar/><TelaListaServicoPendente/></>)}} />
                <Route path={listRoutes().serviceConcluidoList} component={() => {return (<><NavigationVoltar/><TelaListaServicoConcluido/></>)}} />
                <Route path={listRoutes().vendaList} component={() => {return (<><NavigationVoltar/><ListVenda/></>)}} />
                <Route path={listRoutes().extrawhatsapp} component={() => {return (<><NavigationVoltar/><TelaWhatsapp/></>)}} />
                <Route path={listRoutes().extrarecados} component={() => {return (<><NavigationVoltar/><TelaRecado/></>)}} />
            </Switch>
        </BrowserRouter>
    )
} 