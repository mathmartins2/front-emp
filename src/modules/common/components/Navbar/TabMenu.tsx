import React, { SetStateAction, useState } from "react";
import styleNavbarMobile from "./style-mobile.module.scss";

interface IOption {
    title: string;
    description: string;
    icon?: React.ReactElement;
    onclick?: () => void;
    url?: string;
}

interface ITabMenu{
    title: string;
    icon: React.ReactElement;
    options?: IOption[];
    optionsHelp?: IOption[];
    open: (prop: SetStateAction<string>) => void;
}

const TabMenu = (Props: ITabMenu) => {
    const [closeTabAnimation, setCloseTabAnimation] = useState(false)
    const [openTabHelp, setOpenTabHelp] = useState(false)

    const host = window.location.host;

    return(
        <section className={`${styleNavbarMobile["tab_menu"]} ${closeTabAnimation && styleNavbarMobile["tab_menu--close"]}`}>
            <div className={styleNavbarMobile["tab_menu__header"]}>
                <div className={styleNavbarMobile["header__option"]}>
                    <i className="fa fa-arrow-left" onClick={() => { setTimeout(() => Props.open(""), 600); setCloseTabAnimation(true)}}></i>
                    {
                        Props.optionsHelp && 
                        <i className="fal fa-question-circle" onClick={() => setOpenTabHelp(true)}></i>
                    }
                </div>
                <div className={styleNavbarMobile["header__title"]}>
                    <div className={styleNavbarMobile["header__icon"]}>
                        {Props.icon}
                    </div>
                    <span>{Props.title}</span>
                </div>
            </div>

            {
                Props.options?.map((item, index) => {
                    return (
                        <div key={index} className={styleNavbarMobile["tab_menu__option"]} onClick={() => item.url ? window.location.href=`${host + item.url}` : null}>
                            <div className={styleNavbarMobile["tab_option__header"]}>
                                <span className={styleNavbarMobile["header__title"]}>
                                    {item.icon}
                                    {item.title}
                                </span>
                                <i className="fa fa-chevron-right"></i>
                            </div>
                            <p className={styleNavbarMobile["tab_option__description"]}>
                                {item.description}
                            </p>
                        </div>
                    )
                })
            }
            {
                openTabHelp && <TabHelp onclick={setOpenTabHelp} option={Props.optionsHelp}/>
            }
        </section>
    )
};

interface ITabHelp {
    onclick: (prop: SetStateAction<boolean>) => void;
    option?: IOption[];
}

const TabHelp = ({onclick, option}: ITabHelp) => {
    const [closeTabAnimation, setCloseTabAnimation] = useState(false)

    return (
        <section className={`${styleNavbarMobile["tab_menu"]} ${closeTabAnimation && styleNavbarMobile["tab_menu--close"]}`}>
            <div className={styleNavbarMobile["tab_menu__header"]}>
                <div className={styleNavbarMobile["header__option"]}>
                    <i className="fa fa-arrow-left" onClick={() => { setTimeout(() => onclick(false), 600); setCloseTabAnimation(true)}}></i>
                </div>
                <div className={styleNavbarMobile["header__title"]}>
                    <div className={styleNavbarMobile["header__icon"]}>
                        <i className="far fa-question-circle"></i>
                    </div>
                    <span>Ajuda</span>
                </div>
            </div>
            {
                option?.map((item, index) => {
                    return (
                        <div key={index} className={styleNavbarMobile["tab_menu__option"]} onClick={() => item.url ? window.location.href=`${item.url}` : null}>
                            <div className={styleNavbarMobile["tab_option__header"]}>
                                <span className={styleNavbarMobile["header__title"]}>
                                    {item.icon}
                                    {item.title}
                                </span>
                                <i className="fa fa-chevron-right"></i>
                            </div>
                            <p className={styleNavbarMobile["tab_option__description"]}>
                                {item.description}
                            </p>
                        </div>
                    )
                })
            }
        </section>
    )
}

export default TabMenu;
