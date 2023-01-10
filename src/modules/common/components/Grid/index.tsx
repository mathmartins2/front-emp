import React, { useRef } from 'react';

import styled from './style.module.scss';
import { IGrid } from './interface';

const Grid = ({ config, rows, button, style }: IGrid) => {

    const button_empreende = useRef<HTMLDivElement>(null);
    const lines = useRef<HTMLElement[]>([]);

    function clickLine(index: number) {
        if (button_empreende.current) {
            let active = false;

            lines.current.forEach((line, i) => {
                if (line.classList.contains(styled["grid__lines--active"]) && i === index) {
                    closeButton();
                    active = true;
                }

                line.classList.remove(styled["grid__lines--active"]);

                if (line.children[0].tagName === "INPUT")
                    line.children[0].removeAttribute('checked');
            });

            if (!active) {
                button_empreende.current.classList.remove(styled["button_empreende--fadeIn"]);

                lines.current[index]?.parentNode?.insertBefore(button_empreende.current, lines.current[index]?.nextElementSibling);

                button_empreende.current.classList.add(styled["button_empreende--fadeIn"]);

                lines.current[index].classList.add(styled["grid__lines--active"]);

                const firstChildren = lines.current[index].children[0];

                if (firstChildren.tagName === "INPUT")
                    firstChildren.setAttribute('checked', 'checked');
            }
        }
    }

    function closeButton() {
        if (button_empreende.current) {
            lines.current.forEach(line => {
                line.classList.remove(styled["grid__lines--active"]);

                if (line.children[0].tagName === "INPUT")
                    line.children[0].removeAttribute('checked');
            });

            lines.current[0]?.parentNode?.appendChild(button_empreende.current);

            button_empreende.current.classList.remove(styled["button_empreende--fadeIn"]);
        }
    }

    function clickOption(func: (prop: string) => void) {
        const rowSelected = lines.current.find(line => line.children[0].getAttribute('checked') === 'checked');
        if (rowSelected !== null) {
            const value = rowSelected?.children[0].getAttribute('value');
            func(value ?? '')
        }
    }

    function teste(column: string) {
        if(column.startsWith('R$')) {
            const value = column.replace('R$', '');
            if (Number(value) < 0) return <span style={{color: 'red'}}>{column}</span>
            if (Number(value) > 0) return <span style={{color: 'green'}}>{column}</span>
        }
        if(column.includes("<i className='fa fa-check-circle'></i>")) return <i className='fa fa-check-circle'></i>;
        if(column.includes("<i className='fa fa-times-circle'></i>")) return <i className='fa fa-times-circle'></i>;
        if(column.includes('../../../../assets/images/')) return <img src={column} alt="" />
        return column;
    }

    return (
        <div className={styled["grid"]} style={style}>
            <div className={`${styled["grid__row"]} ${styled["grid__header"]}`}>
                {
                    config.map((column, index) => {
                        return (
                            <div key={index} className={`${styled["header__column"]} ${(index === 0 && button) && styled["grid__header--withButton"]}`}
                                style={{ width: column.size, textAlign: column.center ? 'center' : 'left' }}>
                                {column.title}
                            </div>
                        )
                    })
                }
            </div>
            {
                (rows && rows.length > 0)
                    ? rows.map((line, index) => {
                        return (
                            <div key={index} ref={ref => { if (ref) lines.current[index] = ref }} className={`${styled["grid__row"]} ${styled["grid__lines"]}`} onClick={() => button ? clickLine(index) : null}>
                                {button && <input type="checkbox" value={line.value} className={styled["checkbox"]} />}
                                {
                                    line.data.map((column, index) => {
                                        return (
                                            <div key={index} style={{ width: config[index].size, textAlign: config[index].center ? 'center' : 'left', paddingLeft: config[index].center ? '10px' : '0px' }}>
                                                <span className={styled["row__content"]}>
                                                    {teste(column)}
                                                </span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                    :
                    <div className={`${styled["grid__row"]} ${styled["grid__lines"]} ${styled["grid__lines--nocontent"]}`}>
                        <div style={{ width: '100%', textAlign: 'center' }}>
                            <span className={`${styled["row__content"]}`}>
                                Nenhum registro
                            </span>
                        </div>
                    </div>
            }

            {
                button &&
                <div ref={button_empreende} className={`${styled["button_empreende"]}`}>
                    <div className={styled["options__left"]}>
                        <i className='fa fa-minus-square' onClick={() => closeButton()}></i>
                        <span>1</span>
                    </div>
                    <div className={styled["options__right"]}>
                        {
                            button?.option.map((option, index) => {
                                return (
                                    <div key={index} className={styled["option"]} onClick={() => option.callback && clickOption(option.callback)}>
                                        {option.icon}
                                        {option.text}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Grid;