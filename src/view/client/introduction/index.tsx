import React, { Suspense } from 'react';

import {ButtonSucess} from "@common/components/Button";

import styled from './styled.module.scss';
import Group from "@assets/img/cliente/Group.svg";

const ViewIntroduction = () => {
    return (
        <Suspense fallback={<h1>loading...</h1>}>
            <div className={styled["all"]}>
                <img src={Group} alt="Aperto de mãos"  style={{width: "400px"}}/>
                <div className={styled["group"]}>
                    <h1>Clientes</h1>
                    <span>Para gerenciar suas faturas e notas <br /> fiscais você precisa primeiro:</span>
                    <div className={styled["register"]}>
                        <i className="fa fa-circle-check"></i>
                        <span>Cadastrar seus clientes</span>
                        <div className={styled["register"]}>
                            <ButtonSucess onclick={() => null}>Cadastrar cliente</ButtonSucess>
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>
    )
}

export default ViewIntroduction