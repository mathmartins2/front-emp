import React from "react";
import buttonStyle from "./style.module.scss";

interface IProp {
  children: React.ReactElement | string,
  onclick: () => void,
  size?: string,
  style?: React.CSSProperties,
  loading?: boolean,
  disabled?: boolean,
  submit?: boolean
}

export const ButtonSucess = ({ children, onclick, disabled, loading, style, size, submit }: IProp) => {
  return (
    <button
      type={submit ? "submit" : "button"}
      className={`
        ${buttonStyle["button__sucess"]} 
        ${disabled && buttonStyle["button__sucess--disabled"]}
        ${size === "md" && buttonStyle["size_md"]}
      `}
      onClick={() => !disabled ? onclick() : null}
      style={style}
    >
      {
        loading ? <i className="fad fa-spinner-third"></i> : children
      }
    </button>
  );
};

export const ButtonCancelOutline = ({ children, onclick, loading }: IProp) => {
  return (
    <button
      className={buttonStyle["button__cancel--outline"]}
      onClick={() => onclick ? onclick() : null}
    >
      {
        loading ? <i className="fad fa-spinner-third"></i> : children
      }
    </button>
  );
};

export const ButtonCancelSimple = ({ children, onclick, size, loading }: IProp) => {
  return (
    <button
      type="button"
      className={`${buttonStyle["button__cancel--simple"]} ${size === "md" && buttonStyle["size_md"]}`} onClick={() => onclick ? onclick() : null} >
      {
        loading ? <i className="fad fa-spinner-third"></i> : children
      }
    </button>
  );
};

export const ButtonFilter = ({ onclick, style }: IProp) => {
  return (
    <button
      className={buttonStyle["button__filter"]}
      style={style}
      onClick={() => onclick ? onclick() : null}
    >
      <i className="fa fa-filter"></i>
    </button>
  );
};

export const ButtonInfo = ({ children, onclick, disabled, loading, style, size, submit }: IProp) => {
  return (
    <button
      type={submit ? "submit" : "button"}
      className={`
        ${buttonStyle["button__info"]} 
        ${disabled && buttonStyle["button__info--disabled"]}
        ${size === "md" && buttonStyle["size_md"]}
      `}
      onClick={() => !disabled ? onclick() : null}
      style={style}
    >
      {
        loading ? <i className="fad fa-spinner-third"></i> : children
      }
    </button>
  );
};