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
        listSold:`/sold?${param}`,
        listServiceOrderUnpaid:`/service-orders/unpaid?${param}`
    }
}