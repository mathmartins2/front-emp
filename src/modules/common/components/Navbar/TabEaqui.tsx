import React, { useState } from "react";
import styleNavbarMobile from "./style-mobile.module.scss";

import RadioButtonPill from "../RadioButtonPill"

import { eaqui, eaqui_fixed } from "./assets/js/eaqui"

interface IProps {
    close: (prop: string) => void
}

const TabEaqui = ({close}: IProps) => {
    const [closeTabAnimation, setCloseTabAnimation] = useState(false);
    const [typeEaqui, setTypeEaqui] = useState<string>('contabilize')

    return(
        <section className={`${styleNavbarMobile["tab_menu"]} ${closeTabAnimation && styleNavbarMobile["tab_menu--close"]}`}>
            <div className={styleNavbarMobile["tab_menu__header"]}>
                <div className={styleNavbarMobile["header__option"]}>
                    <i className="fa fa-times" onClick={() => { setTimeout(() => close(""), 600); setCloseTabAnimation(true)}}></i>
                </div>
                <div className={styleNavbarMobile["header__title--eaqui"]}>
                    <span>E-aqui</span>
                </div>
            </div>

            <div className={styleNavbarMobile["eaqui__select"]}>
                <RadioButtonPill 
                    options={[
                        {title: 'Contabilizeaqui', value: 'contabilize'}, 
                        {title: 'Parceiros', value: 'parceiro'}
                    ]} 
                    callback={setTypeEaqui}
                />
            </div>

            <div className={styleNavbarMobile["eaqui"]}>
                {
                    eaqui_fixed.map((item, index) => {
                        if(item.type === typeEaqui)
                            return (
                                <div key={index} className={styleNavbarMobile["card_eaqui"]}>
                                    <img src={item.img} className={styleNavbarMobile["eaqui__image"]} alt="imagem de eaqui" />
                                    <div className={styleNavbarMobile["eaqui__price"]}>
                                        {item.price}
                                        <span>{item.cent}</span>
                                    </div>
                                    <div className={styleNavbarMobile["eaqui__title"]}>
                                        {item.title}
                                    </div>
                                </div>
                            )
                        else
                         return null
                    })
                }
                {
                    eaqui.map((item, index) => {
                        if(item.type === typeEaqui)
                            return (
                                <div key={index} className={styleNavbarMobile["card_eaqui"]}>
                                    <img src={item.img} className={styleNavbarMobile["eaqui__image"]} alt="imagem de eaqui" />
                                    <div className={styleNavbarMobile["eaqui__price"]}>
                                        {item.price}
                                        <span>{item.cent}</span>
                                    </div>
                                    <div className={styleNavbarMobile["eaqui__title"]}>
                                        {item.title}
                                    </div>
                                </div>
                            )
                        else 
                            return null
                    })
                }
            </div>
        </section>
    )
};

export default TabEaqui;
