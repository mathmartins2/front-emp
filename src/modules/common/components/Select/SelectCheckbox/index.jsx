import React, { useState } from "react";

import styleSelect from "../style.module.scss";

const Select = ({
  title,
  infos,
  callback,
  options,
  value = [],
  all = null,
}) => {
  const [openOption, setOpen] = useState(false);

  const changeCheck = (index) => {
    let newValue = [...value];
    const option = options[index].title;

    if (all ? all === options[index].title : false) {
      if (value.includes(option)) {
        newValue = [];
      } else {
        newValue = options.map((item) => {
          return item.title;
        });
      }
    } else {
      if (value.includes(option)) {
        if (all ? value.includes(all) : false) {
          newValue = value.filter((item) => item !== all);
        }
        newValue = newValue.filter((item) => item !== option);
      } else {
        newValue.push(option);
      }
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
              value={value.includes(all) ? all : value.join("; ")}
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
                  onClick={() => changeCheck(index)}
                >
                  <input
                    type="checkbox"
                    name="check"
                    checked={value.includes(item.title)}
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
