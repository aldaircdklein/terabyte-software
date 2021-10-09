export const ServeRoutes = (param) => {
    return {
        //server datalist
        dataListComputerModel:`/computerModel`,
        dataLoja:`/loja`,

        //server api
        listUsers:`/users/${param}`,
        listUsersAll:`/users`,
        listProducts:`/products/${param}`,
        listProductsAll:`/products`,
        listServiceStatus:`/service-orders?finished=${param}`,
        listComputer:`/computers/${param}`,
        listServiceByCode:`/service-orders/listbycode/${param}`,
        listServiceByDiagnostic:`/service-orders/listbydiagnostic/${param}`,
        listServiceFinishNotOut:`/service-orders/notout?finished=${param}`,
        listServiceFinishCancel:`/service-orders/finishcancel?finished=${param}`,
        createSold:`/sold`,
        updateSold:`/sold/${param}`,
        createProduct:`/products`,
        deleteUpdateProduct:`/products/${param}`,
        createUser:`/users`,
        deleteUpdateUser:`/users/${param}`,
        createComputer:`/computers`,
        deleteUpdateComputer:`/computers/${param}`,
        createService:`/service-orders`,
        deleteUpdateService:`/service-orders/${param}`,
        outComputerService:`/service-orders/out/${param}`,
        listSold:`/sold?${param}`,
        listServiceOrderUnpaid:`/service-orders/unpaid?${param}`,
        listMessageAll:`/message`,
        createMessage:`/message`,
        deleteUpdateMessage:`/message/${param}`,
    }
}