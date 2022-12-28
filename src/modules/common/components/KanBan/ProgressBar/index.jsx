import React from "react";
import progressBarStyle from "./style.module.scss";

const ProgressBar = ({ size, open, onClick }) => {
  return (
    <div className={progressBarStyle["task_progressBar"]} onClick={onClick}>
      {open ? (
        <i className="fa fa-bars-sort"></i>
      ) : (
        <div className={progressBarStyle["progressBar"]}>
          <div className={progressBarStyle["progressBar__element"]}>
            <div
              className={progressBarStyle["progressBar__bar"]}
              style={{ width: `${size}%` }}
            ></div>
          </div>
          <span className={progressBarStyle["progressBar__count"]}>
            {size}%
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
