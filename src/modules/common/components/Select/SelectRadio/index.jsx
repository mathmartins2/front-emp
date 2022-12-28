import React, { useState } from "react";

import styleSelect from "../style.module.scss";

const Select = ({ title, infos, callback, options, value = "" }) => {
  const [openOption, setOpen] = useState(false);

  const changeCheck = (onptionValue) => {
    let newValue = [];
    if (value !== onptionValue) {
      newValue = onptionValue;
    }
    callback(newValue);
  };

  return (
    <>
      <div className={styleSelect["select"]}>
        <label className={styleSelect["select__title"]}>{title}</label>
        <div className={styleSelect["select__group"]}>
          <div
            className={styleSelect["inputResult"]}
            onClick={() => setOpen(!openOption)}
          >
            <input
              type="text"
              readOnly={true}
              value={value}
              placeholder="Selecione"
              className={styleSelect["inputResult__input"]}
              {...infos}
            />
            <i className="fa fa-chevron-down"></i>
          </div>
          <div
            className={`${styleSelect["select__box"]} ${
              openOption ? styleSelect["select__box--open"] : ""
            }`}
          >
            <ul>
              {options.map((item, index) => (
                <li
                  key={index}
                  className={styleSelect["select__option"]}
                  onClick={() => changeCheck(item.title)}
                >
                  <input
                    type="checkbox"
                    name="check"
                    checked={options[index].title === value}
                    readOnly={true}
                  />
                  <span className={styleSelect["select__checked"]}></span>
                  {item.icon ? item.icon : ""}
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div
        className={`${styleSelect["select__backdrop"]} ${
          openOption ? styleSelect["select__backdrop--open"] : ""
        }`}
        onClick={() => setOpen(false)}
      ></div>
    </>
  );
};

export default Select;
