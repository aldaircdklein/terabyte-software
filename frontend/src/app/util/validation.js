export const ValidationDados = (dados, force) => {
    let validation = true; 
    if(!force){
        for(const iterator of dados){
            if(iterator === '' || iterator === null){
                validation = false;
            }
        }
    }
    return validation;
}