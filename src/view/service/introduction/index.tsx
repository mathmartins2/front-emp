import React, { Suspense } from 'react'

import { Link } from "react-router-dom";

import {ButtonSucess} from "@common/components/Button";

import styled from './styled.module.scss'
import Group from "@assets/img/servico/Group.svg";

const ViewIntroductionService = () => {
    return (
        <Suspense fallback={<h1>loading...</h1>}>
            <div className={styled["all"]}>
                <img src={Group} alt="Aperto de mãos"  style={{width: "400px"}}/>
                <div className={styled["group"]}>
                    <h1>Serviços</h1>
                    <div className={styled["description"]}>Para gerenciar suas faturas e notas fiscais você precisa primeiro:</div>
                    <div className={styled["register"]}>
                        <ul>
                            <li className={styled["check-list"]}><i className="fa fa-circle-check"></i>Cadastrar seus clientes</li>
                            <li className={styled["check-list"]}><i className="fa fa-circle-check"></i>Cadastrar seus serviços</li>
                        </ul>
                        <Link to="/servico/cadastro">
                            <ButtonSucess onclick={() => null}>Cadastrar serviço</ButtonSucess>
                        </Link>
                    </div>
                </div>
            </div>
        </Suspense>
    )
}

export default ViewIntroductionService