import React, { useState, useEffect, useRef } from "react";
import { UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";

import styleSelect from "../style.module.scss";

interface IOption {
  text: string,
  value: string | number,
}

interface IProps {
  title: string,
  required?: boolean,
  options?: IOption[],
  register: UseFormRegisterReturn<any>,
  setvalue: UseFormSetValue<any>,
  name: string,
  style?: React.CSSProperties,
}

const SelectWithSearch = ({title, options, register, setvalue, required, style}: IProps) => {
  const [boxOptionOpen, setBoxOptionOpen] = useState<boolean>(false);
  const [optionSelected, setOptionSelected] = useState<IOption>({text: '', value: ''});
  const [search, setSearch] = useState<string>('');
  const inputSearch = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(boxOptionOpen)
      inputSearch.current?.focus()
  }, [boxOptionOpen]);

  function getOption(index: number){
    if(options){
      const option = options[index];
      setvalue(register.name, option.value, { shouldValidate: true });
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
            <input type="hidden" {...register} value={optionSelected.value}/>
            <input
              type="text"
              readOnly={true}
              placeholder="Selecione"
              className={styleSelect["inputResult__input"]}
              value={optionSelected.text}
            />
            <i className="fa fa-chevron-down"></i>
          </div>
          <div className={`${styleSelect["select__box"]} ${boxOptionOpen && styleSelect["select__box--open"]}`}>
            <input
              ref={inputSearch}
              type="text"
              name="text-search"
              className={styleSelect["select__search"]}
              placeholder="Pesquisar"
              onKeyUp={(e) => setSearch(e.currentTarget.value)}
            />
            <ul>
              {options &&
                options
                  .filter((item) => {
                    return item.text.toLowerCase().includes(search.toLowerCase())
                  })
                  .map((item, index) => {
                    return(
                      <li
                        key={index}
                        className={styleSelect["select__option"]}
                        onClick={() => getOption(index)}
                      >
                        {item.text}
                      </li>
                    )
                  })
              }
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

export default SelectWithSearch;
