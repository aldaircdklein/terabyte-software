export const setStoreNavigation = (search, execFunction) => {
    const json = localStorage.getItem('storeNavigation')? JSON.parse(localStorage.getItem('storeNavigation')):{};
    json[window.location.pathname] = {
        data:search,
        execFunction
    }
    localStorage.setItem('storeNavigation', JSON.stringify(json));
}

export const execStoreNavigation = () => {
    const store = localStorage.getItem('storeNavigation')? JSON.parse(localStorage.getItem('storeNavigation')):{};
    return store[window.location.pathname];
}

export const removeStore = (route) => {
    const store = localStorage.getItem('storeNavigation')? JSON.parse(localStorage.getItem('storeNavigation')):{};
    delete store[route];
    localStorage.setItem('storeNavigation', JSON.stringify(store));
}