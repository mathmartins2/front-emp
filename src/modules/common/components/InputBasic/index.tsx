import React, { ReactElement } from "react";
import styleInput from "./style.module.scss";
import MaskedInput, { Mask } from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { Control, Controller, UseFormRegisterReturn } from "react-hook-form";

interface IProps {
  title: string,
  required?: boolean,
  style?: React.CSSProperties,
  register: UseFormRegisterReturn<any>,
  iconright?: ReactElement | string,
  placeholder?: string,
}

const Input = ({ title, style, required, iconright, register, placeholder }: IProps) => {
  return (
    <fieldset className={styleInput["groupInput"]} style={style}>
      <label className={styleInput["groupInput__title"]}>{title}{required && <span>*</span>}</label>
      <div className={styleInput["groupInput__group"]}>
        <input
          id={`input-${register.name}`}
          className={styleInput["groupInput__input"]}
          {...register}
          autoComplete={'off'}
          placeholder={placeholder}
        />
        {
          iconright &&
          <label htmlFor={`input-${register.name}`} className={styleInput["groupInput__icon"]}>{iconright}</label>
        }
      </div>
    </fieldset>
  );
};

const defaultMaskOptions = {
  prefix: '',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: '.',
  allowDecimal: true,
  decimalSymbol: ',',
  decimalLimit: 2,
  requireDecimal: false,
  integerLimit: 11,
  allowNegative: false,
  allowLeadingZeroes: false,
}

interface IPropsMask extends IProps {
  useformcontrol: Control<any>
}

export const InputMoney = ({ title, style, required, register, useformcontrol }: IPropsMask) => {
  const currencyMask = createNumberMask(defaultMaskOptions)

  return (
    <fieldset className={styleInput["groupInput"]} style={style}>
      <label className={styleInput["groupInput__title"]}>{title}{required && <span>*</span>}</label>
      <div className={styleInput["groupInput__group"]}>
        <label htmlFor={`input-${register.name}`} className={styleInput["groupInput__icon--money"]}>R$</label>
        <Controller
          name={register.name}
          control={useformcontrol}
          render={({ field }) => (
            <MaskedInput
              mask={currencyMask}
              id={`input-${register.name}`}
              className={`${styleInput["groupInput__input"]} ${styleInput["groupInput__input--money"]}`}
              {...field}
              autoComplete={'off'}
              placeholder='0.000,00'
            />
          )}
        />
      </div>
    </fieldset>
  );
};
interface IPropsMaskIcon extends IPropsMask {
  maskstring: Mask,
  iconleft?: React.ReactElement,
  iconright?: React.ReactElement,
}

export const InputMask = ({ title, maskstring, register, required, iconleft, iconright, placeholder, style, useformcontrol }: IPropsMaskIcon) => {
  return (
    <fieldset className={styleInput["groupInput"]} style={style}>
      <label className={styleInput["groupInput__title"]}>{title}{required && <span>*</span>}</label>
      <div className={styleInput["groupInput__group"]}>
        {
          iconleft &&
          <label htmlFor={`input-${register.name}`} className={styleInput["groupInput__icon--mask-left"]}>
            {iconleft}
          </label>
        }
        <Controller
          name={register.name}
          control={useformcontrol}
          render={({ field }) => (
            <MaskedInput
              mask={maskstring}
              id={`input-${register.name}`}
              className={`${styleInput["groupInput__input"]}`}
              {...field}
              autoComplete={'off'}
              placeholder={placeholder}
            />
          )}
        />
        {
          iconright &&
          <label htmlFor={`input-${register.name}`} className={styleInput["groupInput__icon--mask-right"]}>
            {iconright}
          </label>
        }
      </div>
    </fieldset>
  );
};

export const InputDate = ({ title, style, required, register, useformcontrol }: IPropsMask) => {
  return (
    <fieldset className={styleInput["groupInput"]} style={style}>
      <label className={styleInput["groupInput__title"]}>{title}{required && <span>*</span>}</label>
      <input className={styleInput["input__date"]} type="date" />
    </fieldset>
  );
};

export default Input;
