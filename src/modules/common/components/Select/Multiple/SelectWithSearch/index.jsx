import React, { useState } from "react";

import styleSelect from "../style.module.scss";
//import "../../../../assets/css/base/input.scss";

const SelectWithSearch = ({
  title,
  infos,
  callback,
  options,
  value = [],
  all = null,
}) => {
  const [optionSearch, setOptionSearch] = useState("");

  const setSearch = (e) => {
    setOptionSearch(e.target.value.toLowerCase());
  };

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
              <input
                type="text"
                name="text-search"
                className={styleSelect["select__search"]}
                placeholder="Pesquisar"
                onKeyUp={setSearch}
                focus={openOption ? "true" : "false"}
              />
              {options.map((item, index) => {
                const idSearch = item.id
                  ? item.id.toString().indexOf(optionSearch) !== -1
                  : false;

                if (
                  item.title.toLowerCase().indexOf(optionSearch) !== -1 ||
                  idSearch
                ) {
                  return (
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
                      <span>
                        {item.id ? `${item.id} -` : ""} {item.title}
                      </span>
                    </li>
                  );
                } else return false;
              })}
            </ul>
          </div>
          {/* <BoxOption open={openOption}>
            <input
              type="text"
              name="text-search"
              className="input__text"
              placeholder="Pesquisar"
              onKeyUp={setSearch}
              focus={openOption ? "true" : "false"}
            />
            <Lista>
              {options.map((item, index) => {
                if (item.title.toLowerCase().indexOf(optionSearch) !== -1) {
                  return (
                    <Option key={index} onClick={() => changeCheck(index)}>
                      <input
                        type="checkbox"
                        name="check"
                        checked={value.includes(item.title)}
                        readOnly={true}
                      />
                      <Checkmark />
                      {item.icon ? item.icon : ""}
                      <span>
                        {item.id ? `${item.id} -` : ""} {item.title}
                      </span>
                    </Option>
                  );
                } else return false;
              })}
            </Lista>
          </BoxOption> */}
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

export default SelectWithSearch;
