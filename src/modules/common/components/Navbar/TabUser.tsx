import React from "react";
import styleNavbar from "./style.module.scss";

const TabUser = () => {
    const host = window.location.host;

    return (
        <section className={styleNavbar["tab_user"]}>
            <div className={styleNavbar["tab_user__header"]}>
                <div className={styleNavbar["tab_user__logo"]}>

                </div>
                <span>
                    EMPREENDEAQUI TECNOLOGIA LTDA
                </span>
            </div>
            <ul className={styleNavbar["tab_user__menu"]}>
                <li className={styleNavbar["tab_user__option"]} onClick={() => window.location.href=`${host}/MeuPerfil/Index`}>
                    <i className="fal fa-user" aria-hidden="true"></i>Meu Perfil
                </li>
                <li className={styleNavbar["tab_user__option"]} onClick={() => window.location.href=`${host}/MinhaEmpresa/MinhaEmpresa/Index`}>
                    <i className="fal fa-building" aria-hidden="true"></i>Minha Empresa
                </li>
                <li className={styleNavbar["tab_user__option"]} onClick={() => window.location.href=`${host}/MinhaEmpresa/CertificadoDigital/Index`}>
                    <i className="fal fa-shield" aria-hidden="true"></i>Certificado Digital
                </li>
                <li className={styleNavbar["tab_user__option"]} onClick={() => window.location.href=`${host}/MinhaEmpresa/Usuarios/Index`}>
                    <i className="fal fa-users" aria-hidden="true"></i>Usuários
                </li>
                <li className={styleNavbar["tab_user__option"]} onClick={() => window.location.href=`${host}/MinhaEmpresa/Documentos/Index`}>
                    <i className="fal fa-folder-open" aria-hidden="true"></i>Documentos
                </li>
                <li className={styleNavbar["tab_user__option"]} onClick={() => window.location.href=`${host}/MeuPlano/Index`}>
                    <i className="fal fa-hand-holding-usd" aria-hidden="true"></i>Meu Plano
                </li>
                <li className={styleNavbar["tab_user__option"]} onClick={() => window.location.href=`${host}/Configuracao/Index`}>
                    <i className="fas fa-cog" aria-hidden="true"></i>Configurações
                </li>
                <br />
                <li className={`${styleNavbar["tab_user__option"]} ${styleNavbar["exit"]}`} onClick={() => window.location.href=`${host}/Home/Login`}>
                    <i className="fa fa-power-off" aria-hidden="true"></i>Sair do Sistema
                </li>
            </ul>
        </section>
    );
};

interface IBackdrop{
    onclick: (prop: boolean) => void
}

export const BackdropUser = ({onclick}: IBackdrop) => {
    return (
        <div className={styleNavbar["tab__backdrop"]} onClick={() => onclick(false)}></div>
    )
}

export default TabUser;
