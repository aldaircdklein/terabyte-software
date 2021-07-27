import {useState, useEffect} from 'react';
import {
    generationWarning,
    generationSuccess,
    generationError
} from '../../../../error/index';
import {
    ValidationDados,
    GerarImpressao
} from '../../../../util/index';
import {
    useAlert,
    useModal,
    useLoarding
} from '../../../../util/contexts/index';
import {
    SalvarDados,
    CarregarDados,
    BuscarProducts
} from './service';
import {
    FolhaEtiqueta,
    FolhaEstoque
} from '../folha_impressao/index';


export const useTelaConfiguracao = () => {
    const [msgAuto, setMsgAuto] = useState('');
    const [nome, setNome] = useState('');
    const [subtitulo, setSubtitulo] = useState('');
    const [telefones, setTelefones] = useState('');
    const [email, setEmail] = useState('');
    const [cnpjcpf, setCnpjCpf] = useState('');
    const [endereco, setEndereco] = useState('');
    const [validation, setValidation] = useState(false);
    const {addAlert} = useAlert();
    const {showLoarding, hiddeLoarding} = useLoarding();
    const [modalConfirmation, setModalConfirmation] = useState('undefined');
    const {setOnShowModal2} = useModal();

    const prepararDados = async () => {
        let dados = {
            msgAuto,
            nome,
            subtitulo,
            telefones,
            email,
            cnpjcpf,
            endereco,
        }
        try {
            if(ValidationDados([msgAuto,nome,subtitulo,telefones,email,cnpjcpf,endereco])){
                await showLoarding();
                await SalvarDados(dados);
                addAlert(generationSuccess('015-A'));
            }else{
                setValidation(true);
                addAlert(generationWarning('002-C'));
            }      
        } catch (error) {
            addAlert(generationError('022-B'));
        }finally{
            await hiddeLoarding();
        }
    }
    const PreencherMsgAuto = (dado) =>  {
        setMsgAuto(dado);
    }
    const PreencherNome = (dado) =>  {
        setNome(dado);
    }
    const PreencherSubtitulo = (dado) =>  {
        setSubtitulo(dado);
    }
    const PreencherTelefones = (dado) =>  {
        setTelefones(dado);
    }
    const PreencherEmail = (dado) =>  {
        setEmail(dado);
    }
    const PreencherCnpjCpf = (dado) =>  {
        setCnpjCpf(dado);
    }
    const PreencherEndereco = (dado) =>  {
        setEndereco(dado);
    }
    const ModificationModalConfirmation = (status) => {
        setModalConfirmation(status);
    }
    const ModificationShowModal2 = (status) => {
        setOnShowModal2(status);
    }
    const BuscarTodoOsProdutos = async () => {
        const dado = await BuscarProducts();
        GerarImpressao(FolhaEstoque(dado));
    }
    const GerarEtiquetas = () => {
        GerarImpressao(FolhaEtiqueta());
    }

    useEffect(()=>{
        async function init(){
            try {
                await showLoarding();
                const dados = await CarregarDados();
                if(dados.nome){
                    setMsgAuto(dados.msgAuto);
                    setNome(dados.nome);
                    setSubtitulo(dados.subtitulo);
                    setTelefones(dados.telefones);
                    setEmail(dados.email);
                    setCnpjCpf(dados.cnpjcpf);
                    setEndereco(dados.endereco);
                }   
            } catch (error) {
                
            }finally{
                await hiddeLoarding();
            }
        }
        init();
    },[]);

    return [
        prepararDados,
        msgAuto,
        nome,
        subtitulo,
        telefones,
        email,
        cnpjcpf,
        endereco,
        validation,
        PreencherMsgAuto,
        PreencherNome,
        PreencherSubtitulo,
        PreencherTelefones,
        PreencherEmail,
        PreencherCnpjCpf,
        PreencherEndereco,
        modalConfirmation,
        ModificationModalConfirmation,
        ModificationShowModal2,
        BuscarTodoOsProdutos,
        GerarEtiquetas
    ]

}