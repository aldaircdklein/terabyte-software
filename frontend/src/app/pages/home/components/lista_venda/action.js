import {useState, useEffect} from 'react';
import socketio from 'socket.io-client';
import {
    useAlert,
    useLoarding
} from '../../../../util/contexts/index';
import {
    ValidationDados,
    beepAlerta
} from '../../../../util/index';
import {
    generationError,
    generationWarning
} from '../../../../error/index';
import{
    ListaVendas,
    OrdenaArray
} from './service';
import {useVenda} from '../../contexts/index';

export const useListVenda = () => {
    const {listVenda, setListVenda} = useVenda();
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [name, setName] = useState('');
    const [paid, setPaid] = useState(false);
    const [ordenar, setOrdenar] = useState('data');
    const [crescente, setCrescente] = useState('menor');
    const {addAlert} = useAlert();
    const {showLoarding, hiddeLoarding} = useLoarding();
    const [validation, setValidation] = useState(false);
    const [tipo, setTipo] = useState(false);

    const Buscar = async () => {
        try {
            if(ValidationDados([dateStart,dateEnd])){
                await showLoarding();
                const newLista = await ListaVendas({dateStart,dateEnd,name,paid,tipo});
                setListVenda(OrdenaArray(newLista, ordenar, crescente));
            }else{
                setValidation(true);
                addAlert(generationWarning('002-C'));
            }   
        } catch (error) {
            addAlert(generationError('023-B'));
        }finally{
            await hiddeLoarding();
        }
    }

    const BuscarTodos = async () => {
        try {
            await showLoarding();
            const newLista = await ListaVendas({dateStart:undefined,dateEnd:undefined,name,paid,tipo});
            setListVenda(OrdenaArray(newLista, ordenar, crescente));   
        } catch (error) {
            addAlert(generationError('023-B'));
        }finally{
            await hiddeLoarding();
        }
    }

    const PreencherDateStart = (date) => {
        setDateStart(date);
    }
    const PreencherDateEnd = (date) => {
        setDateEnd(date);
    }
    const PreencherName = (dado) => {
        setName(dado);
    }
    const PreencherPaid = (dado) => {
        setPaid(dado);
    }
    const PreencherTipo = (dado) => {
        setListVenda([]);
        setTipo(dado);
    }
    const PreencherOrdenar = (dado) => {
        setOrdenar(dado);
    }
    const PreencherCrescente = (dado) => {
        setCrescente(dado);
    }

    useEffect(()=>{
        (async ()=>{
            const socket = await socketio('http://localhost:3333');
            socket.on("responseCode", data => {
                setName(data);
                beepAlerta(true);
            })
        })()
    },[]);

    return [
        Buscar,
        listVenda,
        validation,
        name,
        paid,
        tipo,
        ordenar,
        crescente,
        PreencherDateStart,
        PreencherDateEnd,
        PreencherName,
        PreencherPaid,
        PreencherTipo,
        BuscarTodos,
        PreencherOrdenar,
        PreencherCrescente
    ]
}