import React, { useRef, useState } from "react";
import styled from "./style.module.scss";

interface IProps {
    options: {
        title: string;
        value: string | number | boolean;
    }[];
    callback?: (prop: string) => void;
}

const RadioButtonPill = ({options, callback}: IProps) => {
    const option = useRef<HTMLElement[]>([])
    const [leftOption, setLeftOption] = useState<number>(0)

    function selectOption(index: number) {
        if(option){
            option.current.map(item => item.classList.remove(styled["pill__option--active"]))

            setLeftOption(option.current[index].offsetLeft)
            option.current[index].classList.add(styled["pill__option--active"]);

            if(callback)
                callback(option.current[index].getAttribute('data-value') ?? '')
        }
    }

    return(
        <section className={styled["pill"]}>
            {
                options.map((item, index) => {
                    return (
                        <div key={index} data-value={item.value} ref={ref => { if(ref) option.current[index] = ref}} className={styled["pill__option"]} onClick={() => selectOption(index)}>
                            {item.title}
                        </div>
                    )
                })
            }

            <div className={styled["pill__option--movable"]} style={{width: `${100 / options.length}%`, left: leftOption}}>
            </div>
        </section>
    )
};


export default RadioButtonPill;
