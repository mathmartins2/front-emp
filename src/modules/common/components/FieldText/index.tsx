import React, { useRef } from "react";
import inputStyle from "./style.module.scss";
import MaskedInput, { Mask } from 'react-text-mask'
import { Control, Controller, UseFormGetValues, UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";

interface IProps {
  name: string,
  callback?: (prop: string | number) => void,
  style?: React.CSSProperties,
  placeholder?: string,
  title?: string
  onchange?: (props: string) => void,
}

export const SearchBar = ({ style, name, callback, placeholder, onchange }: IProps) => {
  const input = useRef<HTMLInputElement>(null)

  return (
    <fieldset className={inputStyle["searchBar"]} style={style}>
      <input
        ref={input}
        type="text"
        name={name}
        className={inputStyle["searchBar__input"]}
        placeholder={placeholder}
        onChange={(e) => onchange && onchange(e.target.value)}
      />
      <button type="button" className={inputStyle["searchBar__button"]} onClick={() => callback && callback(input.current?.value ?? '')}>
        <i className="fa fa-search"></i>
      </button>
    </fieldset>
  );
};

export const SearchBarRounded = ({ style, name, callback }: IProps) => {
  return (
    <fieldset className={inputStyle["searchBar__rounded"]} style={style}>
      <button type="button" className={inputStyle["searchBar__button"]}>
        <i className="fa fa-search"></i>
      </button>
      <input
        type="text"
        name={name}
        className={inputStyle["searchBar__input"]}
        onChange={(e) => callback && callback(e.target.value)}
      />
    </fieldset>
  );
};

interface IPropsMask {
  title?: string,
  maskstring: Mask,
  required?: boolean,
  style?: React.CSSProperties,
  placeholder?: string,
  loading?: boolean,
  register: UseFormRegisterReturn<any>,
  setvalue: UseFormSetValue<any>,
  getvalue?: UseFormGetValues<any>,
  useformcontrol: Control<any>,
}

export const InputMaskSearch = ({ style, placeholder, title, required, maskstring, register, setvalue, useformcontrol }: IPropsMask) => {
  const setValue = "";

  return (
    <fieldset className={inputStyle["groupInput"]} style={style}>
      <label className={inputStyle["groupInput__title"]}>{title}{required && <span>*</span>}</label>
      <div className={inputStyle["searchBar"]}>
        <Controller
          name={register.name}
          control={useformcontrol}
          render={({ field }) => (
            <MaskedInput
              mask={maskstring}
              id={`input-${register.name}`}
              className={`${inputStyle["searchBar__input"]}`}
              ref={field.ref}
              name={field.name}
              value={field.value}
              autoComplete={'off'}
              placeholder={placeholder}
            />
          )}
        />

        <button type="button" className={inputStyle["searchBar__button--gray"]} onClick={() => setvalue(register.name, setValue, { shouldValidate: true, shouldDirty: true })}>
          <i className="fa fa-search"></i>
        </button>
      </div>
    </fieldset >
  );
};
