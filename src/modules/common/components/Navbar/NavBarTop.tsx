import React, { useState } from "react";
import styleNavbar from "./style.module.scss";
import styleNavbarMobile from "./style-mobile.module.scss";

import fa_rocket from "./assets/img/fa-rocket.svg";

import { useNavigate } from "react-router-dom";

import { useMediaQuery } from 'react-responsive';
import TabUser, { BackdropUser } from "./TabUser";
import TabHelp, { BackdropHelp } from "./TabHelp";
import TabMenu from "./TabMenu";
import TabEaqui from "./TabEaqui";

interface IProps {
    tab_active?: string;
    navbar_mobile: boolean;
}

const NavBarTop = ({tab_active, navbar_mobile}: IProps) => {
    const navigate = useNavigate();

    const [openUserMobile, setOpenUserMobile] = useState<boolean>(false);
    const [openHelpMobile, setOpenHelpMobile] = useState<boolean>(false);

    const [openTabMenuMobile, setOpenTabMenuMobile] = useState<string>('');

    const isDesktopAndTablet: boolean = useMediaQuery({ query: '(min-width: 768px)'})

    const host = window.location.host;

    if(isDesktopAndTablet){
        return (
            <section className={styleNavbar["navbar__top"]}>
                <div className={`${styleNavbar["menus"]}`}>
                    <div className={`${styleNavbar["menu"]} ${tab_active === 'inicio' && styleNavbar["active"]}`} onClick={() => window.location.href=`${host}/Dashboard/Resumo/Index`}>
                        <span>INICIO</span>
                    </div>
                    <div className={`${styleNavbar["menu"]} ${tab_active === 'vendas' && styleNavbar["active"]}`}>
                        <span>VENDAS <i className="fa fa-chevron-down"></i></span>
                        <div className={styleNavbar["dropdown"]}>
                            <ul>
                                <li className={styleNavbar["dropdown__title"]}>Cadastrar</li>
                                <li className={styleNavbar["dropdown__option"]} onClick={()=> navigate('/cliente')}>Clientes</li>
                                <li className={styleNavbar["dropdown__option"]} onClick={()=> navigate('/servico')}>Servi??os</li>
                            </ul>
                        </div>
                    </div>
                    <div className={`${styleNavbar["menu"]} ${tab_active === 'prolabore' && styleNavbar["active"]}`}>
                        <span>PR??-LABORE <i className="fa fa-chevron-down"></i></span>
                        <div className={styleNavbar["dropdown"]}>
                            <ul>
                                <li className={styleNavbar["dropdown__title"]}>Gerenciar</li>
                                <li className={styleNavbar["dropdown__option"]} onClick={() => window.location.href=`${host}/Socio/ProLabore/Index`}>Demonstrativos</li>
                                <li className={styleNavbar["dropdown__option"]} onClick={() => window.location.href=`${host}/Socio/CalculadoraProLabore/Index`}>Calculadora</li>
                            </ul>
                            <ul>
                                <li className={styleNavbar["dropdown__title"]}>Cadastrar</li>
                                <li className={styleNavbar["dropdown__option"]} onClick={() => window.location.href=`${host}/Socio/Socio/IndexBasico`}>S??cios</li>
                                <li className={styleNavbar["dropdown__option"]} onClick={() => window.location.href=`${host}/Socio/Socio/Index`}>Retirada de Pr??-Labore</li>
                            </ul>
                            <div className={styleNavbar["dropdown__help"]}>
                                <div className={styleNavbar["header"]}>
                                    Ajuda
                                </div>
                                <ul>
                                    <li onClick={() => window.location.href=`https://contabilizeaqui.zendesk.com/hc/pt-br/articles/4408098564500-O-que-%C3%A9-Pr%C3%B3-Labore-`}>O que ?? Pr??-Labore?</li>
                                    <li onClick={() => window.location.href=`https://contabilizeaqui.zendesk.com/hc/pt-br/articles/4408093935764-Como-retirar-Pr%C3%B3-Labore-`}>Como retirar Pr??-Labore?</li>
                                    <li onClick={() => window.location.href=`https://contabilizeaqui.zendesk.com/hc/pt-br/articles/4408113232020-Como-funciona-a-nossa-calculadora-`}>Como funciona nossa calculadora?</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={`${styleNavbar["menu"]} ${tab_active === 'impostos' && styleNavbar["active"]}`}>
                        <span>IMPOSTOS <i className="fa fa-chevron-down"></i></span>
                        <div className={styleNavbar["dropdown"]}>
                            <ul>
                                <li className={styleNavbar["dropdown__title"]}>Imposto a pagar</li>
                                <li className={styleNavbar["dropdown__option"]} onClick={() => window.location.href=`${host}/Socio/Imposto/Index`}>Pr??-Labore</li>
                                <li className={styleNavbar["dropdown__option"]} onClick={() => window.location.href=`${host}/Imposto/Imposto/Index`}>Simples Nacional</li>
                            </ul>
                            <div className={styleNavbar["dropdown__help"]}>
                                <div className={styleNavbar["header"]}>
                                    Ajuda
                                </div>
                                <ul>
                                    <li onClick={() => window.location.href=`https://contabilizeaqui.zendesk.com/hc/pt-br/articles/4408141004948-Como-funciona-o-Simples-Nacional-`}>O que ?? o Simples Nacional?</li>
                                    <li onClick={() => window.location.href=`https://contabilizeaqui.zendesk.com/hc/pt-br/articles/4408148919188-Quais-os-impostos-do-Pr%C3%B3-Labore-`}>Quais impostos do Pr??-Labore?</li>
                                    <li onClick={() => window.location.href=`https://contabilizeaqui.zendesk.com/hc/pt-br/articles/4408141332756-Como-calcular-o-Simples-Nacional-`}>Como calcular o Simples Nacional?</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={`${styleNavbar["menu"]} ${tab_active === 'contabil' && styleNavbar["active"]}`}>
                        <span>CONT??BIL <i className="fa fa-chevron-down"></i></span>
                        <div className={styleNavbar["dropdown"]}>
                            <ul>
                                <li className={styleNavbar["dropdown__title"]}>Demonstra????es financeiras</li>
                                <li className={styleNavbar["dropdown__option"]} onClick={() => window.location.href=`${host}/Relatorio/Balancete/Index`}>Balancete</li>
                                <li className={styleNavbar["dropdown__option"]} onClick={() => window.location.href=`${host}/Relatorio/BalancoPatrimonial/Index`}>Balan??o Patrimonial</li>
                                <li className={styleNavbar["dropdown__option"]} onClick={() => window.location.href=`${host}/Relatorio/DRE/Index`}>DRE</li>
                            </ul>
                            <ul>
                                <li className={styleNavbar["dropdown__title"]}>Livros cont??beis</li>
                                <li className={styleNavbar["dropdown__option"]} onClick={() => window.location.href=`${host}/Relatorio/LivroRazao/Index`}>Livro Raz??o</li>
                                <li className={styleNavbar["dropdown__option"]} onClick={() => window.location.href=`${host}/Relatorio/LivroDiario/Index`}>Livro Di??rio</li>
                            </ul>
                            <ul>
                                <li className={styleNavbar["dropdown__title"]}>Obriga????es Acess??rias</li>
                                <li className={styleNavbar["dropdown__option"]} onClick={() => window.location.href=`${host}/Relatorio/DEFIS/Index`}>DEFIS</li>
                            </ul>
                            <div className={styleNavbar["dropdown__help"]}>
                                <div className={styleNavbar["header"]}>
                                    Ajuda
                                </div>
                                <ul>
                                    <li onClick={() => window.location.href=`https://contabilizeaqui.zendesk.com/hc/pt-br/articles/4408150517908-Para-que-serve-o-Balancete`}>Para que serve o Balancete?</li>
                                    <li onClick={() => window.location.href=`https://contabilizeaqui.zendesk.com/hc/pt-br/articles/4408142221332-O-que-%C3%A9-Balan%C3%A7o-Patrimonial-`}>O que ?? o Balan??o Patrimonial?</li>
                                    <li onClick={() => window.location.href=`https://contabilizeaqui.zendesk.com/hc/pt-br/articles/4408150963092-Qual-a-import%C3%A2ncia-da-DRE-`}>Qual a import??ncia da DRE?</li>
                                    <li onClick={() => window.location.href=`https://contabilizeaqui.zendesk.com/hc/pt-br/articles/4408151072916-O-que-s%C3%A3o-Livros-Contabeis`}>O que s??o Livros Cont??beis?</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={`${styleNavbar["menu"]} ${tab_active === 'financeiro' && styleNavbar["active"]}`}>
                        <span>FINANCEIRO <i className="fa fa-chevron-down"></i></span>
                        <div className={styleNavbar["dropdown"]}>
                            <ul>
                                <li className={styleNavbar["dropdown__title"]}>Mensalidade</li>
                                <li className={styleNavbar["dropdown__option"]} onClick={() => window.location.href=`${host}/Financeiro/Mensalidade/Index`}>Mensalidade a Pagar</li>
                            </ul>
                            <div className={styleNavbar["dropdown__help"]}>
                                <div className={styleNavbar["header"]}>
                                    Ajuda
                                </div>
                                <ul>
                                    <li onClick={() => window.location.href=`https://contabilizeaqui.zendesk.com/hc/pt-br/articles/4408160516628-Qual-o-valor-da-sua-mensalidade-`}>Pol??tica de Pre??os e Planos</li>
                                    <li onClick={() => window.location.href=`https://contabilizeaqui.zendesk.com/hc/pt-br/articles/4408161264916-O-que-%C3%A9-adicional-de-faturamento-`}>O que ?? adicional de faturamento?</li>
                                </ul>
                            </div>
                        </div>    
                    </div>
                </div>
                <div className={`${styleNavbar["eaqui"]}`}>
                    E-AQUI
                </div>
            </section>
        );
    }
    else if(navbar_mobile){
        return (
            <div className={styleNavbarMobile["navbar"]}>
                <div className={styleNavbarMobile["navbar__header"]}>
                    <div>
                        <div className={styleNavbarMobile["header__user"]} onClick={() => setOpenUserMobile((oldValue) => !oldValue)}>
                            {/* foto de perfil */}
                        </div>
                        {
                            openUserMobile && 
                                <>
                                    <BackdropUser onclick={setOpenUserMobile} />
                                    <TabUser />
                                </>
                        }
                    </div>
                    <div className={styleNavbarMobile["header__options"]}>
                        <i className={`fal fa-question-circle ${styleNavbarMobile["option__help"]}`} onClick={() => setOpenHelpMobile((oldValue) => !oldValue)}></i>
                        {
                            openHelpMobile && 
                                <>
                                    <BackdropHelp onclick={setOpenHelpMobile} />
                                    <TabHelp onclick={setOpenHelpMobile}/>
                                </>
                        }
                        <i className="fa fa-heart"></i>
                    </div>
                </div>
                <div className={styleNavbarMobile["navbar__menu"]}>
                    <div className={styleNavbarMobile["menu__option"]}>
                        <div className={styleNavbarMobile["menu__icon"]}>
                            <i className="far fa-inbox" aria-hidden="true"></i>
                        </div>
                        <span className={styleNavbarMobile["menu__title"]}>Caixa de entrada</span>
                    </div>
                    <div className={styleNavbarMobile["menu__option"]}>
                        <div className={styleNavbarMobile["menu__icon"]}>
                            <i className="far fa-calendar-check" aria-hidden="true"></i>
                        </div>
                        <span className={styleNavbarMobile["menu__title"]}>Tarefas</span>
                    </div>
                    <div className={styleNavbarMobile["menu__option"]}>
                        <div onClick={() => setOpenTabMenuMobile("prolabore")}>
                            <div className={styleNavbarMobile["menu__icon"]}>
                                <i className="far fa-handshake" aria-hidden="true"></i>
                            </div>
                            <span className={styleNavbarMobile["menu__title"]}>Pr??-Labore</span>
                        </div>
                        {
                            openTabMenuMobile === "prolabore" &&
                            <TabMenu 
                                open={setOpenTabMenuMobile} 
                                title="Pr??-Labore" 
                                icon={<i className="far fa-handshake"></i>}
                                options={
                                    [
                                        {title: 'Demonstrativos', url: '/Socio/ProLabore/Index', icon: <i className="fal fa-search-dollar"></i>, description: 'Consulte o extrato mensal e holerites do seu Pr?? - Labore e Folha de Pagamento.'},
                                        {title: 'Calculadora', url: '/Socio/CalculadoraProLabore/Index_Mobile', icon: <i className="fal fa-calculator-alt"></i>, description: 'Simule os impostos que voc?? pagar?? com a retirada de Pr?? - Labore.'},
                                        {title: 'S??cios', url: '/Socio/Socio/IndexBasico', icon: <i className="fal fa-address-book"></i>, description: 'Cadastre os s??cios e a participa????o societ??ria da sua empresa.'},
                                        {title: 'Retirada de Pr??-Labore', url: '/Socio/Socio/Index', icon: <i className="fal fa-money-check-edit-alt"></i>, description: 'Cadastre a retirada de Pr??-Labore. A maneira legal de comprovar renda!'},
                                    ]
                                }
                                optionsHelp={
                                    [
                                        {title: 'O que ?? Pr??-Labore?', url: 'https://contabilizeaqui.zendesk.com/hc/pt-br/articles/4408098564500-O-que-%C3%A9-Pr%C3%B3-Labore-', description: 'Entenda como calculamos a sua mensalidade e como ela pode variar. '},
                                        {title: 'Como retirar Pr??-Labore?', url: 'https://contabilizeaqui.zendesk.com/hc/pt-br/articles/4408093935764-Como-retirar-Pr%C3%B3-Labore-', description: 'Entenda o que ?? e como calculamos o adicional de faturamento.'},
                                        {title: 'Como funciona nossa calculadora?', url: 'https://contabilizeaqui.zendesk.com/hc/pt-br/articles/4408113232020-Como-funciona-a-nossa-calculadora-', description: 'Entenda o que ?? e como calculamos o adicional de faturamento.'}
                                    ]
                                }
                            />
                        }
                    </div>
                    <div className={styleNavbarMobile["menu__option"]}>
                        <div onClick={() => setOpenTabMenuMobile("imposto")}>
                            <div className={styleNavbarMobile["menu__icon"]}>
                                <i className="far fa-university" aria-hidden="true"></i>
                            </div>
                            <span className={styleNavbarMobile["menu__title"]}>Impostos</span>
                        </div>
                        {
                            openTabMenuMobile === "imposto" &&
                            <TabMenu 
                                open={setOpenTabMenuMobile} 
                                title="Impostos" 
                                icon={<i className="far fa-university"></i>}
                                options={
                                    [
                                        {title: 'Pr??-Labore', url: '/Socio/Imposto/Index', icon: <i className="fal fa-money-bill"></i>, description: 'Consulte os impostos a pagar do seu Pro-Labore.'},
                                        {title: 'Simples Nacional', url: '/Imposto/Imposto/Index', icon: <i className="fal fa-usd-circle"></i>, description: 'Consulte a sua guia DAS do Simples Nacional.'},
                                    ]
                                }
                                optionsHelp={
                                    [
                                        {title: 'O que ?? o Simples Nacional?', url: 'https://contabilizeaqui.zendesk.com/hc/pt-br/articles/4408141004948-Como-funciona-o-Simples-Nacional-', description: 'Entenda como funciona a tributa????o mais utilizada no Brasil.'},
                                        {title: 'Quais impostos do Pr??-Labore?', url: 'https://contabilizeaqui.zendesk.com/hc/pt-br/articles/4408148919188-Quais-os-impostos-do-Pr%C3%B3-Labore-', description: 'Saiba quais impostos incidem sobre o Pr??-Labore.'},
                                        {title: 'Como calcular o  Simples Nacional?', url: 'https://contabilizeaqui.zendesk.com/hc/pt-br/articles/4408141332756-Como-calcular-o-Simples-Nacional-', description: 'Entenda como ?? calculado a guia do DAS do Simples Nacional.'}
                                    ]
                                }
                            />
                        }
                    </div>
                    <div className={styleNavbarMobile["menu__option"]}>
                        <div onClick={() => setOpenTabMenuMobile("contabil")}>
                            <div className={styleNavbarMobile["menu__icon"]}>
                                <i className="far fa-file-signature" aria-hidden="true" style={{marginRight: -10}}></i>
                            </div>
                            <span className={styleNavbarMobile["menu__title"]}>Cont??bil</span>  
                        </div>
                        {
                            openTabMenuMobile === "contabil" &&
                            <TabMenu 
                                open={setOpenTabMenuMobile} 
                                title="Cont??bil" 
                                icon={<i className="far fa-file-signature" style={{marginRight: '-10px'}}></i>}
                                options={
                                    [
                                        {title: 'Balancete', url: '/Relatorio/Balancete/Index', icon: <i className="fal fa-file-invoice"></i>, description: 'Relat??rio mensal contendo o resultado parcial do Balan??o Patrimonial.'},
                                        {title: 'Balan??o Patrimonial', url: '/Relatorio/BalancoPatrimonial/Index', icon: <i className="fal fa-file-contract"></i>, description: 'Relat??rio anual que apresenta a situa????o econ??mica e financeira da empresa.'},
                                        {title: 'DRE', url: '/Relatorio/DRE/Index', icon: <i className="fal fa-file-invoice-dollar"></i>, description: 'Relat??rio anual que mostra o lucro ou preju??zo das empresas.'},
                                        {title: 'Livro Raz??o', url: '/Relatorio/LivroRazao/Index', icon: <i className="fal fa-file-check"></i>, description: 'Relat??rio agrupado por conta dos lan??amentos registrados no Livro Di??rio.'},
                                        {title: 'Livro Di??rio', url: '/Relatorio/LivroDiario/Index', icon: <i className="fal fa-file-circle-check"></i>, description: 'Relat??rio em ordem cronol??gica dos lan??amentos feitos na contabilidade.'},
                                        {title: 'DEFIS', url: '/Relatorio/DEFIS/Index', icon: <i className="fal fa-file-chart-column"></i>, description: 'Declara????o anual das empresas optantes pelo Simples Nacional.'},
                                    ]
                                }
                                optionsHelp={
                                    [
                                        {title: 'Para que serve o Balancete?', url: 'https://contabilizeaqui.zendesk.com/hc/pt-br/articles/4408150517908-Para-que-serve-o-Balancete', description: 'Confira como avaliar o desempenho da sua empresa mensalmente.'},
                                        {title: 'O que ??  o Balan??o Patrimonial?', url: 'https://contabilizeaqui.zendesk.com/hc/pt-br/articles/4408142221332-O-que-%C3%A9-Balan%C3%A7o-Patrimonial-', description: 'Entenda como avaliar a sua empresa atrav??s do Balan??o Patrimonial.'},
                                        {title: 'Qual a import??ncia da DRE?', url: 'https://contabilizeaqui.zendesk.com/hc/pt-br/articles/4408150963092-Qual-a-import%C3%A2ncia-da-DRE-', description: 'Saiba como avaliar os indicadores financeiros da sua DRE.'},
                                        {title: 'O que s??o Livros Cont??beis?', url: 'https://contabilizeaqui.zendesk.com/hc/pt-br/articles/4408151072916-O-que-s%C3%A3o-Livros-Contabeis', description: 'Conhe??a os principais livros contab??is da sua empresa.'},
                                    ]
                                }
                            />
                        }
                    </div>
                    <div className={styleNavbarMobile["menu__option"]}>
                        <div onClick={() => setOpenTabMenuMobile("financeiro")}>
                            <div className={styleNavbarMobile["menu__icon"]}>
                                <i className="far fa-barcode-alt" aria-hidden="true"></i>
                            </div>
                            <span className={styleNavbarMobile["menu__title"]}>Financeiro</span>
                        </div>
                        {
                            openTabMenuMobile === "financeiro" &&
                            <TabMenu 
                                open={setOpenTabMenuMobile} 
                                title="Financeiro" 
                                icon={<i className="far fa-barcode-alt"></i>}
                                options={
                                    [
                                        {title: 'Mensalidade a Pagar', url: '/Financeiro/Mensalidade/Index', icon: <i className="fal fa-envelope-open-dollar"></i>, description: 'Consulte a sua fatura, boleto e nota fiscal da Contabilizeaqui.'},
                                    ]
                                }
                                optionsHelp={
                                    [
                                        {title: 'Pol??tica de Pre??os e Planos', url: 'https://contabilizeaqui.zendesk.com/hc/pt-br/articles/4408160516628-Qual-o-valor-da-sua-mensalidade-', description: 'Entenda como calculamos a sua mensalidade e como ela pode variar.'},
                                        {title: 'O que ?? adicional de faturamento?', url: 'https://contabilizeaqui.zendesk.com/hc/pt-br/articles/4408161264916-O-que-%C3%A9-adicional-de-faturamento-', description: 'Entenda o que ?? e como calculamos o adicional de faturamento.'},
                                    ]
                                }
                            />
                        }
                    </div>
                    <div className={styleNavbarMobile["menu__option"]}>
                        <div onClick={() => setOpenTabMenuMobile("eaqui")}>
                            <div className={styleNavbarMobile["menu__icon"]}>
                                <img src={fa_rocket} alt="icone e-aqui" />
                            </div>
                            <span className={styleNavbarMobile["menu__title"]}>E-aqui</span>
                        </div>
                        {
                            openTabMenuMobile === "eaqui" &&
                            <TabEaqui close={setOpenTabMenuMobile}/>
                        }
                    </div>
                </div>
            </div>
        )
    }
    else{
        return null;
    }
    
};

export default NavBarTop;