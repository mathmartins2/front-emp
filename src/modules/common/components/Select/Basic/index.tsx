import React, { useState } from "react";
import { UseFormGetValues, UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";

import styleSelect from "../style.module.scss";

interface IOption {
  text: string,
  value: string | number,
  icon?: React.ReactElement,
}

interface IProps {
  title: string,
  required?: boolean,
  options?: IOption[],
  register: UseFormRegisterReturn<any>,
  setvalue: UseFormSetValue<any>,
  getvalue: UseFormGetValues<any>,
  style?: React.CSSProperties,
}

const SelectBasic = ({ title, options, register, setvalue, getvalue, required, style }: IProps) => {
  const [boxOptionOpen, setBoxOptionOpen] = useState<boolean>(false);
  const [optionSelected, setOptionSelected] = useState<IOption>(() => {
    const value = getvalue(register.name);
    const option: IOption = options?.find(item => item.value === value) ?? { text: '', value: '' };

    return option;
  });

  function getOption(index: number) {
    if (options) {
      const option = options[index];
      setvalue(register.name, option.value, { shouldValidate: true, shouldDirty: true });
      setOptionSelected(option)
    }
    setBoxOptionOpen(false);
  }

  return (
    <>
      <div className={styleSelect["select"]} style={style}>
        <label className={styleSelect["select__title"]}>{title}{required && <span>*</span>}</label>
        <div className={styleSelect["select__group"]}>
          <div
            className={styleSelect["inputResult"]}
            onClick={() => setBoxOptionOpen((oldValue) => !oldValue)}
          >
            <input type="hidden" {...register} />
            {
              optionSelected.icon &&
              <span className={styleSelect["icon"]}>{optionSelected.icon}</span>
            }
            <input
              type="text"
              readOnly={true}
              placeholder="Selecione"
              className={`${styleSelect["inputResult__input"]} ${optionSelected.icon && styleSelect["inputResult__input--icon"]}`}
              value={optionSelected.text}
            />
            <i className="fa fa-chevron-down"></i>
          </div>
          <div className={`${styleSelect["select__box"]} ${boxOptionOpen && styleSelect["select__box--open"]}`}>
            <ul>
              {options &&
                options.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={styleSelect["select__option"]}
                      onClick={() => getOption(index)}
                    >
                      {item.icon &&
                        <span className={styleSelect["icon"]}>{item.icon}</span>
                      }
                      {item.text}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
      <div
        className={`${styleSelect["select__backdrop"]} ${boxOptionOpen && styleSelect["select__backdrop--open"]}`}
        onClick={() => setBoxOptionOpen(false)}
      ></div>
    </>
  );
};

export default SelectBasic;
