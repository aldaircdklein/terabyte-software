import { useState } from 'react';
import {
    DivPagination,
    ButtonPagination,
    FormContainer
} from './style';
import {TelaCliente} from './tela_cliente/index';
import {TelaComputador} from './tela_computer/index';
import {TelaServico} from './tela_servico/index';
import {useTelasCriar} from '../../../../util/contexts/index';
import {Icons} from '../../../../icons/index'


export const TelasCriar = () => {
    const {telaCliente, telaComputer, telaServico} = useTelasCriar();
    const [selectTela, setSelectTela] = useState('cliente');

    return (
        <>
            <DivPagination>
                <ButtonPagination disabled={selectTela === 'servico'} onClick={()=>{setSelectTela('cliente')}} activeBtn={selectTela === 'cliente'}>{Icons().FaUserAlt} Cliente</ButtonPagination>
                <ButtonPagination onClick={()=>{setSelectTela('computador')}} activeBtn={selectTela === 'computador'}>{Icons().FaDesktop} Aparelho</ButtonPagination>
                <ButtonPagination disabled={selectTela === 'cliente'} onClick={()=>{setSelectTela('servico')}} activeBtn={selectTela === 'servico'}>{Icons().FaWrench} Serviço</ButtonPagination>
            </DivPagination>
            <FormContainer>
                {
                    selectTela === 'cliente'?(
                        <TelaCliente typeRequest={telaCliente}></TelaCliente>
                    ):('')
                }
                {
                    selectTela === 'computador'?(
                        <TelaComputador typeRequest={telaComputer}></TelaComputador>
                    ):('')
                }
                {
                    selectTela === 'servico'?(
                        <TelaServico typeRequest={telaServico}></TelaServico>
                    ):('')
                }
            </FormContainer>
        </>
    )
}