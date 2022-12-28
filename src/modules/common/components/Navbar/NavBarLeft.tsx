import React, { useState } from "react";
import styleNavbar from "./style.module.scss";
import logo from '../../assets/img/logo.svg';

import TabUser, { BackdropUser } from './TabUser';
import TabHelp, { BackdropHelp } from './TabHelp';

interface IProps {
  tab_active?: string
}

const NavBarLeft = ({tab_active}: IProps) => {
  const [openUser, setOpenUser] = useState<boolean>(false);
  const [openHelp, setOpenHelp] = useState<boolean>(false);

  const host = window.location.host;

  return (
    <>
      <section className={`${styleNavbar["navbar__left"]} ${styleNavbar["tabs__open"]}`}>
        <div>
          <img src={logo} alt="Logo EmpreendeAqui" />
          <div className={`${styleNavbar["navbarLeft__option"]} ${tab_active === 'notificacao' && styleNavbar["navbarLeft__option--active"]}`} onClick={() => window.location.href=`${host}/Dashboard/Notificacoes/Index`}>
            <i className={`fal fa-inbox ${styleNavbar["icone_main"]}`}></i>
            <span className={`${styleNavbar["option__title"]} ${styleNavbar["option__title--inbox"]}`}>
              <i className="fal fa-inbox"></i> Caixa de entrada
            </span>
          </div>
          <div className={`${styleNavbar["navbarLeft__option"]} ${tab_active === 'tarefas' && styleNavbar["navbarLeft__option--active"]}`} onClick={() => window.location.href=`${host}/Dashboard/Tarefas/Index`}>
            <i className={`far fa-calendar-check ${styleNavbar["icone_main"]}`}></i>
            <span className={`${styleNavbar["option__title"]}`}>
              <i className="far fa-calendar-check"></i> Tarefas
            </span>
          </div>
          <div className={styleNavbar["navbarLeft__option"]} onClick={() => window.location.href=`${host}/Admin/PainelAdm/Index`}>
            <i className="fa fa-poll" style={{transform: 'rotate(180deg)'}}></i>
            <span className={`${styleNavbar["option__title"]}`}>
              <i className="fa fa-poll" style={{transform: 'rotate(180deg)'}}></i> Painel Adm
            </span>
          </div>
        </div>
        <div>
          <div className={styleNavbar["navbarLeft__option"]} onClick={() => window.location.href=`${host}/IndiqueAqui/IndiqueAqui/Index`}>
            <i className="fa fa-heart"></i>
            <span className={`${styleNavbar["option__title"]} ${styleNavbar["option__title--indique"]}`}>
              <i className="fa fa-heart"></i> IndiqueAqui
            </span>
          </div>
          <div className={`${styleNavbar["navbarLeft__help"]}`}>
            <div className={`${styleNavbar["navbarLeft__option"]} ${openHelp && styleNavbar["navbarLeft__option--active"]}`} onClick={() => { setOpenHelp((oldValue) => !oldValue); openUser && setOpenUser(false) }}>
              <i className={`fal fa-question-circle ${styleNavbar["icone_main"]}`}></i>
              <span className={`${styleNavbar["option__title"]} ${styleNavbar["option__title--ajuda"]}`}>
                <i className="fal fa-question-circle"></i> Ajuda
              </span>
            </div>
            {
              openHelp &&
                <>
                  <TabHelp onclick={setOpenHelp}/>
                  <BackdropHelp onclick={setOpenHelp} />
                </>
            }
          </div>
          <div className={styleNavbar["navbarLeft__user"]}>
            <div className={styleNavbar["tab_user__button"]} onClick={() => { setOpenUser((oldValue) => !oldValue);  openHelp && setOpenHelp(false) }}>
              {/* foto perfil */}
            </div>
            {
              openUser &&
                <>
                  <BackdropUser onclick={setOpenUser} />
                  <TabUser />
                </>
            }
          </div>
        </div>
      </section>
    </>
  );
};

export default NavBarLeft;
