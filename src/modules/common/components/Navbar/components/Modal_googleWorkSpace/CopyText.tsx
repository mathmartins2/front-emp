import React, { useRef, useState } from "react";
import styled from "./style.module.scss";


interface IProps {
    title: string,
    value: string
}

const CopyText = ({title, value}: IProps) => {
    const [mouseCord, setMouseCord] = useState({x: 15, y: 15});
    const [visiblePopUp, setVisiblePopUp] = useState(false);
    const [copied, setCopied] = useState("Copiar");

    const Input = useRef<HTMLInputElement | null>(null);
    
    function movablePopUp(pointer: React.MouseEvent) {
        setMouseCord({x: pointer.clientX, y: pointer.clientY})
    }

    function copyValue() {
        if(Input.current?.value) {
            navigator.clipboard.writeText(Input.current?.value).then(() => {
                setCopied("Copiado")
            })
            .catch(() => {
                alert("Tente novamente");
            });
        }
    }

    return(
        <section className={styled["copytext"]}>
            <label className={styled["copytext__description"]}>{title}</label>
            <input 
                ref={Input} 
                type="text" 
                className={styled["copytext__input"]} 
                defaultValue={value} 
                onMouseMove={(e) => movablePopUp(e)}
                onMouseLeave={() => { setVisiblePopUp(false); setCopied("Copiar")}}
                onMouseEnter={() => setVisiblePopUp(true)}
                onClick={() => copyValue()}
                readOnly={true}
            />
            {
                visiblePopUp &&
                <div className={styled["copytext_popup"]} style={{left: mouseCord.x + 15, top: mouseCord.y - 30}}>
                    {copied}
                </div>
            }
        </section>
    )
};

export default CopyText;
