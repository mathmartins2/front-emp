import React from 'react';

import styled from './style.module.scss';
import {IButtonRadio} from './interface/';

const ButtonRadio = ({title, options, register, style}:IButtonRadio)  => {
    return(
        <div className={styled["container"]} style={style}>
            <div className={styled["title"]}>    
                {title}
            </div>    
            { 
                options.map((option, index) => {
                    return(
                        <div className={styled["options"]} key={index}>
                            <div className={styled["optionsRadio"]}>
                                <input
                                    type="radio" 
                                    value={option.value} 
                                    className={styled["radio"]} 
                                    id={`${register.name}-${index}`}
                                    {...register}
                                /> 
                            </div>
                            <label className={styled["optionsTitle"]} htmlFor={`${register.name}-${index}`}>
                                {option.titleOptions}
                            </label>
                        </div>
                    ) 
                })
            }
        </div>
    )
}
export default ButtonRadio

