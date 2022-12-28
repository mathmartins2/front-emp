import React from "react";
import styleContent from "./style.module.scss";

import NavBarLeft from "./NavBarLeft";
import NavBarTop from "./NavBarTop";
import NavBarRight from "./NavBarRight";

interface INavbar {
  children: React.ReactElement,
  tab_active?: string,
  navbar_mobile?: boolean,
}

const Navbar = ({children, tab_active, navbar_mobile}: INavbar) => {
  return (
    <div className={`${styleContent["navbar"]} ${!navbar_mobile && styleContent["navbar--disable"]}`}>
      <NavBarRight />
      <NavBarTop tab_active={tab_active} navbar_mobile={navbar_mobile ? navbar_mobile : false}/>
      <NavBarLeft tab_active={tab_active} />
      <section className={styleContent["navbar__content"]}>
        {children}
      </section>
    </div>
  );
};

export default Navbar;
