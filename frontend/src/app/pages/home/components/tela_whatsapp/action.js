import {useState} from 'react';
import {
    generationWarning
} from '../../../../error/index';
import {
    ValidationDados
} from '../../../../util/index';
import {
    useAlert,
    useModal
} from '../../../../util/contexts/index';


export const useTelaWhatsapp = () => {
    const [phone, setPhone] = useState('');
    const [validation, setValidation] = useState(false);
    const {addAlert} = useAlert();
    const {setOnShowModal2} = useModal();

    const AbrirWhatsapp = async () => {
        if(ValidationDados([phone])){
            setTimeout(()=>{
                const telefone = phone.replace(/[^0-9]/g, '')
                window.open(`https://api.whatsapp.com/send?phone=55${telefone}`, "Enviar mensagem", "height=480,width=720");
            },2000)
        }else{
            setValidation(true);
            addAlert(generationWarning('002-C'));
        }
    }

    const PreencherPhone = (dado) =>  {
        setPhone(dado);
    }
    const ModificationShowModal2 = (status) => {
        setOnShowModal2(status);
    }

    return [
        phone,
        PreencherPhone,
        AbrirWhatsapp,
        validation,
        ModificationShowModal2
    ]

}