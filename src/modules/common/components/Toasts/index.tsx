import React from 'react';
import IToasts from './interface';
import styled from '../Toasts/styled.module.scss';
import { useState } from 'react';

const Toasts = ({type, info}:IToasts) => { 
    const [estado, setEstado] = useState(true)
    
    return(
        <div className={`${styled["toasts"]} ${styled[type]} ${!estado && styled['header__hides']}`}>
            <div className={styled["toasts__icon"]}>
                {type === 'sucess' && <i className='fa fa-check-circle'></i>}
                {type === 'info' && <i className='fa fa-info-circle'></i>}
                {type === 'error' && <i className='fa fa-times-circle'></i>}
                {type === 'warning' && <i className='fa fa-triangle-exclamation'></i>}
            </div>
            <div className={`${styled["toasts__content"]} ${styled[type]}`}>
                <div className={styled["content__header"]}>
                    <p className={styled["toasts__title"]}>
                        {type === 'sucess' && 'Sucesso!'}
                        {type === 'info' && 'Informação'}
                        {type === 'error' && 'Erro'}
                        {type === 'warning' && 'Aviso'}
                    </p>
                    <div className={styled[type]}>
                        <button onClick={() => setEstado(false)} >
                            <i className='fa fa-times'></i> 
                        </button>
                    </div>
                </div>
                <p className={styled["toasts__description"]}>
                    {info}
                </p>
            </div>
        </div>
    );
}
export default Toasts