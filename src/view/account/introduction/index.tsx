import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonSucess } from "@common/components/Button";
import styled from './styled.module.scss';
import Group from "@assets/img/onboarding.svg";

const ViewIntroduction = () => {
    const navigate = useNavigate();
    return (
        <div className={styled["all"]}>
            <img src={Group} alt="Aperto de mãos"  style={{width: "600px"}}/>
            <div className={styled["group"]}>
                <h1>Contas</h1>
                <span>Para gerenciar suas contas você <br /> precisa primeiro:</span>
                <div className={styled["register"]}>
                    <i className="fa fa-circle-check"></i>
                    <span>Cadastrar sua conta bancária PJ</span>
                </div>
                <div className={styled["register"]}>
                    <i className="fa fa-circle-check"></i>
                    <span>Cadastrar o caixa de sua empresa</span>
                </div>
                <div className={styled["register"]}>
                    <ButtonSucess onclick={() => navigate('/contas')}>Cadastrar conta</ButtonSucess>
                </div>
            </div>
        </div>
    )
}

export default ViewIntroduction