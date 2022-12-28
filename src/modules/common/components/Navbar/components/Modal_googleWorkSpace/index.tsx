import React from "react";
import styled from "./style.module.scss";

import CopyText from './CopyText'

import { ButtonSucess } from '../../../Button'

interface IProps {
    close: (prop: boolean) => void
}

const Modal_GoogleWorkSpace = ({close}: IProps) => {
    return(
        <section className={styled["modal"]}>
            <div className={styled["modal__content"]}>
                <div className={styled["content__header"]}>
                    <div>Cupons de desconto <i className="fa fa-times" onClick={() => close(false)}></i></div>
                    <img src="https://www.empreendeaqui.com.br/dist/figma/eaqui/googleworkspace.svg" alt="imagem do google workspace"/>
                </div>
                <div className={styled["content"]}>
                    <span>Utilize nossos códigos promocionais</span>
                    <CopyText title="Plano Business Starter" value="P7M6JW3CHTADDR4" />
                    <CopyText title="Plano Business Standard" value="Q3WQWNUXVM6RHQX" />
                    <p>
                        Cada código promocional oferece <b>10% de desconto</b> no
                        primeiro ano de uso dos planos Google Workspace Business
                        Starter ou Google Workspace Business Standard.
                    </p>
                </div>
                <div className={styled["content__footer"]}>
                    <ButtonSucess 
                        onclick={() => window.location.href = "https://workspace.google.com/landing/partners/referral/gws.html?utm_source=sign-up&utm_medium=affiliatereferral&utm_campaign=apps-referral-program&utm_content=E4DGQOH"}
                    >
                        Contratar
                    </ButtonSucess>
                </div>
            </div>
        </section>
    )
};

export default Modal_GoogleWorkSpace;
