import React, { useState } from "react";
import styleNavbar from "./style.module.scss";
import styleNavbarMobile from "./style-mobile.module.scss";

import img_sugerir_melhoria from './assets/img/help/sugerir-melhoria.svg';
import img_chat from './assets/img/help/chat.svg';
import img_central_ajuda from './assets/img/help/central-ajuda.svg';
import img_chamados from './assets/img/help/chamados.svg';
import { useMediaQuery } from "react-responsive";

interface IBackdrop{
    onclick: (prop: boolean) => void
}

const TabHelp = ({onclick}: IBackdrop) => {
    const isDesktopAndTablet: boolean = useMediaQuery({ query: '(min-width: 768px)'})
    const [closeTabAnimation, setCloseTabAnimation] = useState(false);

    const host = window.location.host;

    if(isDesktopAndTablet){
        return (
            <section className={styleNavbar["tab_help"]}>
                <div className={styleNavbar["tab_help__header"]}>
                    <span>
                        <i className="fad fa-question-circle" aria-hidden="true"></i>
                        Ajuda
                    </span>
                    <div className={styleNavbar["header__close"]} onClick={() => onclick(false)}>
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                    </div>
                </div>
                <ul className={styleNavbar["tab_help__menu"]}>
                    <li className={styleNavbar["tab_help__option"]} onClick={() => window.location.href=`${host}/Ajuda/SugerirMelhoria/Index`}>
                        <div className={styleNavbar["option__icon"]} style={{backgroundImage: `url(${img_sugerir_melhoria})`}}>
                        </div>
                        <div className={styleNavbar["option__description"]}>
                            <span>Sugerir uma melhoria</span>
                            <p>Sugira, vote e comente nas melhorias que acredita. Colabore com a evolução da EmpreendeAqui.</p>
                        </div>
                        
                    </li>
                    <li className={styleNavbar["tab_help__option"]} onClick={() => window.location.href=`https://contabilizeaqui.zendesk.com/hc/pt-br/requests`}>
                        <div className={styleNavbar["option__icon"]} style={{backgroundImage: `url(${img_chamados})`}}>
                        </div>
                        <div className={styleNavbar["option__description"]}>
                            <span>Chamados</span>
                            <p>Precisa de ajuda ou quer consultar a situação de uma solicitação, estamos aqui para você.</p>
                        </div>
                        
                    </li>
                    <li className={styleNavbar["tab_help__option"]} onClick={() => window.location.href=`https://contabilizeaqui.zendesk.com/hc/pt-br/`}>
                        <div className={styleNavbar["option__icon"]} style={{backgroundImage: `url(${img_central_ajuda})`}}>
                        </div>
                        <div className={styleNavbar["option__description"]}>
                            <span>Central de ajuda</span>
                            <p>Encontre guias rápidos e respostas para perguntas frequentes dentro de cada categoria.</p>
                        </div>
                    </li>
                    <li className={styleNavbar["tab_help__option"]}>
                        <div className={styleNavbar["option__icon"]} style={{backgroundImage: `url(${img_chat})`}}>
                        </div>
                        <div className={styleNavbar["option__description"]}>
                            <span>Chat</span>
                            <p>Converse com um de nossos encantadores e resolva a sua dúvida rapidamente.</p>
                        </div>
                    </li>
                </ul>
            </section>
        );
    }
    else{
        return(
            <section className={`${styleNavbarMobile["tab_help"]} ${closeTabAnimation && styleNavbarMobile["tab_help--close"]}`}>
                <div className={styleNavbarMobile["help__header"]}>
                    <i className={`fa fa-arrow-left ${styleNavbarMobile["help__back"]}`} onClick={() => { setTimeout(() => onclick(false), 1000); setCloseTabAnimation(true)}}></i>
                    <div className={styleNavbarMobile["header__title"]}>
                        <i className="fad fa-question-circle" aria-hidden="true"></i>
                        Ajuda
                    </div>
                </div>
                <ul className={styleNavbarMobile["tab_help__menu"]}>
                    <li className={styleNavbarMobile["tab_help__option"]}>
                        <div className={styleNavbarMobile["option__icon"]} style={{backgroundImage: `url(${img_chamados})`}}>
                        </div>
                        <div className={styleNavbarMobile["option__description"]}>
                            <span>Chamados</span>
                            <p>Precisa de ajuda ou quer consultar a situação de uma solicitação, estamos aqui para você.</p>
                        </div>
                        
                    </li>
                    <li className={styleNavbarMobile["tab_help__option"]}>
                        <div className={styleNavbarMobile["option__icon"]} style={{backgroundImage: `url(${img_central_ajuda})`}}>
                        </div>
                        <div className={styleNavbarMobile["option__description"]}>
                            <span>Central de ajuda</span>
                            <p>Encontre guias rápidos e respostas para perguntas frequentes dentro de cada categoria.</p>
                        </div>
                        
                    </li>
                    <li className={styleNavbarMobile["tab_help__option"]}>
                        <div className={styleNavbarMobile["option__icon"]} style={{backgroundImage: `url(${img_chat})`}}>
                        </div>
                        <div className={styleNavbarMobile["option__description"]}>
                            <span>Chat</span>
                            <p>Converse com um de nossos encantadores e resolva a sua dúvida rapidamente.</p>
                        </div>
                    </li>
                </ul>
            </section>
        )
    }
};

export const BackdropHelp = ({onclick}: IBackdrop) => {
    return (
        <div className={styleNavbar["tab__backdrop"]} onClick={() => onclick(false)}></div>
    )
}

export default TabHelp;
