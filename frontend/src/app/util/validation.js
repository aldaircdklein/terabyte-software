export const ValidationDados = (dados) => {
    let validation = true;
    for(const iterator of dados){
        if(iterator === '' || iterator === null){
            validation = false;
        }
    }
    return validation;
}