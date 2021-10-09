import {useState, useEffect} from 'react';
import {
    CadastrarMessage,
    AtualizarMessage,
    ExcluirMessage,
    ListaMessages
} from './service';
import {
    generationWarning,
    generationError
} from '../../../../error/index';
import {
    ValidationDados,
} from '../../../../util/index';
import {
    useAlert,
    useLoarding
} from '../../../../util/contexts/index';


export const useTelaWhatsapp = () => {
    const [recado, setRecado] = useState({message:'',status:false});
    const [listRecado, setListRecado] = useState([]);
    const [validation, setValidation] = useState(false);
    const {showLoarding, hiddeLoarding} = useLoarding();
    const {addAlert} = useAlert();

    const generationJSON = () => {
        return {
            status:recado.status,
            message:recado.message
        }
    }

    const SalvarDados = async (tipo) => {
        if(tipo === 'cadastrar'){
            if(ValidationDados([recado.message])){
                await showLoarding();
                await CadastrarMessage(generationJSON());
                setRecado({message:'',status:false});
                await hiddeLoarding();
                await Init();
            }else{
                setValidation(true);
                addAlert(generationWarning('003-C'));
            }
        }else if(tipo === 'atualizar'){
            if(ValidationDados([recado.message])){
                await showLoarding();
                const retorno = await AtualizarMessage({message:recado.message,status:recado.status},recado._id);
                setRecado(retorno.data);
                await hiddeLoarding();
                await Init();
            }else{
                setValidation(true);
                addAlert(generationWarning('003-C'));
            }
        }else if(tipo === 'excluir'){
            await showLoarding();
            await ExcluirMessage(recado._id);
            setRecado({message:'',status:false});
            await hiddeLoarding();
            await Init();
        }
    }

    const ModificarStatus = async (dado) => {
        setRecado({message:recado.message,status:dado});
        await showLoarding();
        const retorno = await AtualizarMessage({message:recado.message,status:dado},recado._id);
        setRecado(retorno.data);
        await hiddeLoarding();
        await Init();
    }

    const PreencherMessage = (dado) => {
        let newDado = {...recado}
        newDado.message = dado;
        setRecado(newDado);
    }

    const SelecionarMessage = (dado) => {
        setRecado(dado);
    }

    const LiberarNovo = () => {
        setRecado({message:'',status:false})
    }
    
    const Init = async () => {
        try {
            await showLoarding();
            setListRecado(await ListaMessages());
        } catch (error) {
            addAlert(generationError('024-B'))
        }finally{
            await hiddeLoarding();
        }
    }
    useEffect(()=>{
        Init();
    },[])

    return [
        recado,
        listRecado,
        validation,
        SalvarDados,
        PreencherMessage,
        ModificarStatus,
        SelecionarMessage,
        LiberarNovo
    ]

}