import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import taskStyle from "./style.module.scss";

import ProgressBar from "./ProgressBar";

import userDefault from "../../assets/img/user-default.svg";

const Task = (props) => {
  const [openInfo, setOpenInfo] = useState(false);

  return (
    <Draggable
      draggableId={props.task.id}
      index={props.index}
      isDragDisabled={props.isDraggableDisabled}
    >
      {(provided, snapshot) => (
        <div
          className={`${taskStyle["task"]} ${
            props.task.recalculando && taskStyle["task--recalculando"]
          }`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <header className={taskStyle["task__header"]}>
            {props.task.id} - {props.task.title}
            {props.task.recalculando && (
              <div className={taskStyle["task__headerAlert"]}>
                <i className={"fa fa-calculator-alt"}></i>
                <label>Recalculando</label>
              </div>
            )}
          </header>
          {props.task.sector && (
            <p className={taskStyle["task__sector"]}>{props.task.sector}</p>
          )}

          {openInfo ? (
            props.task.subtask ? (
              <div className={taskStyle["task__descriptionInfo"]}>
                {props.task.subtask.map((item, index) => (
                  <span>
                    {item.value === "recalculo" ? (
                      <i className={"fa fa-calculator-alt"}></i>
                    ) : item.value === "ok" ? (
                      <i className={"fa fa-check-circle"}></i>
                    ) : (
                      <i className={"fal fa-circle"}></i>
                    )}
                    {item.description}
                  </span>
                ))}
              </div>
            ) : (
              <div>vazio</div>
            )
          ) : (
            <p className={taskStyle["task__infos"]}>
              {props.task.tax} | {props.task.activity}
            </p>
          )}

          <div className={taskStyle["task__footer"]}>
            <div className={taskStyle["task__footerLeft"]}>
              <div className={taskStyle["task__imgProfile"]} style={{backgroundImage: `url(${userDefault})`}}></div>
            </div>

            {props.task.progress_substask ||
            props.task.progress_substask === 0 ? (
              <ProgressBar
                size={props.task.progress_substask}
                open={openInfo}
                onClick={() =>
                  setOpenInfo((oldValue) =>
                    props.task.subtask ? !oldValue : false
                  )
                }
              />
            ) : (
              ""
            )}

            {props.task.notification > 0 ? (
              <div className={taskStyle["task__notification"]}
                onClick={() =>
                  props.infos({ open: true, value: props.task.id })
                }
              >
                <i className="far fa-comment"></i>
                <span>
                  {props.task.notification > 9 ? "+9" : props.task.notification}
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
