import {useState, useEffect} from 'react';
import socketio from 'socket.io-client';
import {
    useAlert,
    useLoarding
} from '../../../../util/contexts/index';
import {
    ValidationDados,
    beepAlerta,
    execStoreNavigation,
    setStoreNavigation,
    setLoadStore
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
    const [searchMode, setSearchMode] = useState("create");
    const [buscaStore, setBuscaStore] = useState(true);

    const Buscar = async () => {
        try {
            if(ValidationDados([dateStart,dateEnd])){
                await showLoarding();
                const newLista = await ListaVendas({dateStart,dateEnd,name,paid,tipo,searchMode});
                if(!execStoreNavigation()){
                    setStoreNavigation({dateStart,dateEnd,name,paid,tipo,searchMode}, 'Buscar');
                    setListVenda(OrdenaArray(newLista, ordenar, crescente));
                } else {
                    setListVenda(OrdenaArray(newLista, ordenar, crescente));
                }

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
            const newLista = execStoreNavigation()? await ListaVendas(execStoreNavigation().data):await ListaVendas({dateStart:undefined,dateEnd:undefined,name,paid,tipo,searchMode});
            setStoreNavigation({dateStart,dateEnd,name,paid,tipo,searchMode}, 'BuscarTodos');
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
        setBuscaStore(false);
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
    const PreencherSearchMode = (dado) => {
        setSearchMode(dado);
    }

    useEffect(() => {
        if(execStoreNavigation() && buscaStore){
            setLoadStore(
                [
                    {variable: 'dateStart', value:dateStart, func:setDateStart},
                    {variable: 'dateEnd', value:dateEnd, func:setDateEnd},
                    {variable: 'name', value:name, func:setName},
                    {variable: 'paid', value:paid, func:setPaid},
                    {variable: 'tipo', value:tipo, func:setTipo},
                    {variable: 'searchMode', value:searchMode, func:setSearchMode}
                ],
                execStoreNavigation().data,
                () => {
                    eval(
                        execStoreNavigation().execFunction
                    )()
                }
            )
        }
    }, [dateEnd]);

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
        dateStart,
        dateEnd,
        listVenda,
        validation,
        name,
        paid,
        tipo,
        ordenar,
        crescente,
        searchMode,
        Buscar,
        PreencherDateStart,
        PreencherDateEnd,
        PreencherName,
        PreencherPaid,
        PreencherTipo,
        BuscarTodos,
        PreencherOrdenar,
        PreencherCrescente,
        PreencherSearchMode
    ]
}