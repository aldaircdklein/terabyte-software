export const setLoadStore = async (objectFunction, store, funExec) => {
    if(store){
        const notLoad = objectFunction.filter(element => 
            element.value !== store[element.variable]
        ).length > 0
    
        if(notLoad) {
            for (const iterator of objectFunction) {
                iterator.func(store[iterator.variable])
            }
        } else {
            funExec();
        }
    }else{
        funExec();
    }
}