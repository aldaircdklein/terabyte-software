import {useEffect} from 'react';
import {
    DivAlert,
    AlertContainer,
    AlertHeader,
    AlertBody,
    ButtonClose
} from './style';
import {
    useAlert
} from '../../util/contexts/index';
import {Colors} from '../../util/index';
import {Icons} from '../../icons/index';

export const AlertMessage = () => {
    const {alert, removeAlert} = useAlert();

    const closeAlert = (msg) => {
        removeAlert(msg);
    }

    useEffect(() => {
        let time = setInterval(()=>{
            removeAlert();
            if(alert.length === 0){
                clearInterval( time );
            }
        },5000);
    },[alert]);

    return(
        <DivAlert>
            {
                alert.map((element) => (
                    <AlertContainer key={`alert${Math.random}${element.color}`} borderColor={element.color}>
                        <AlertHeader headColor={element.color}>
                            {element.color === Colors().success? <>{Icons().FaCheck}Successo</>:''}
                            {element.color === Colors().danger? <>{Icons().FaBan}Problema</>:''}
                            {element.color === Colors().warning? <>{Icons().FaExclamationTriangle}Atenção</>:''}
                            <ButtonClose onClick={()=>{closeAlert(element.msg)}}>X</ButtonClose>
                        </AlertHeader>
                        <AlertBody>
                            {element.msg}
                        </AlertBody>
                    </AlertContainer>
                ))
            }
        </DivAlert>
    )
}