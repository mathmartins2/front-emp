import React, { useState } from "react";
import styleNavbar from "./style.module.scss";

import { eaqui, eaqui_fixed } from './assets/js/eaqui';

import ModalGoogleWorkSpace from './components/Modal_googleWorkSpace'

const NavBarRight = () => {
  const [openModalGoogle, setOpenModalGoogle] = useState<boolean>(false);

  return (
    <section className={`${styleNavbar["navbar__right"]} ${openModalGoogle && styleNavbar["modal--active"]}`}>
      {
        eaqui_fixed.map((item, index) => {
          return (
            <div 
              key={index} 
              className={styleNavbar["card"]} 
              onClick={() => {
                if(item?.identify){
                  if(item.identify === "google")
                    return setOpenModalGoogle(true);
                }
                return item.onclick? item.onclick() : null
              }}
            >
              <img src={item.img} className={styleNavbar["eaqui__image"]} alt="imagem de eaqui" />
              <div className={styleNavbar["eaqui__price"]}>
                {item.price}
                <span>{item.cent}</span>
              </div>
              <div className={styleNavbar["eaqui__title"]}>
                {item.title}
              </div>
            </div>
          )
        })
      }
      {
        eaqui.map((item, index) => {
          return (
            <div key={index} className={styleNavbar["card"]} onClick={() => item.onclick? item.onclick() : null}>
              <img src={item.img} className={styleNavbar["eaqui__image"]} alt="imagem de eaqui" />
              <div className={styleNavbar["eaqui__price"]}>
                {item.price}
                <span>{item.cent}</span>
              </div>
              <div className={styleNavbar["eaqui__title"]}>
                {item.title}
              </div>
            </div>
          )
        })
      }
      {
        openModalGoogle &&
          <ModalGoogleWorkSpace close={setOpenModalGoogle} />
      }
    </section>
  );
};

export default NavBarRight;