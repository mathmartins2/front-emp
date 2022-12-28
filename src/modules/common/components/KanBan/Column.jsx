import React from "react";
import Task from "./Tasks";

import { Droppable } from "react-beautiful-dnd";

import styleKanban from "./style.module.scss";

const Column = ({
  column,
  tasks,
  isDropDisabled,
  icon,
  infos = null,
  isDraggableDisabled,
}) => {
  return (
    <section className={styleKanban["column"]}>
      <div className={styleKanban["column__title"]}>
        <div>
          {icon}
          {column.title}
        </div>
        <span>{tasks ? tasks.tasks.length : 0}</span>
      </div>
      <Droppable droppableId={column.id} isDropDisabled={isDropDisabled}>
        {(provided) => (
          <div
            className={`${styleKanban["column__list"]} ${
              column.isDisabled && styleKanban["column__list--disabled"]
            } `}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks &&
              tasks.order.map((order, index) => {
                const task = tasks.tasks.find((x) => x.id === order);
                return (
                  <Task
                    key={task.id}
                    task={task}
                    infos={infos}
                    index={index}
                    isDraggableDisabled={isDraggableDisabled}
                  />
                );
              })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  );
};

export default Column;
