//https://egghead.io/lessons/react-course-introduction-beautiful-and-accessible-drag-and-drop-with-react-beautiful-dnd

import React from "react";

import { DragDropContext } from "react-beautiful-dnd";

import styleKanban from "./style.module.scss";

import Column from "./Column";

const KanBan = ({ data, tasks = null, setTasks, isDraggableDisabled = false }) => {
  const board = data;

  function save(obj) {
    //console.log(obj)
  }

  function onDragStart(start) {
    // const homeIndex = board.columnOrder.indexOf(start.source.droppableId)
    // setBoard({...board, homeIndex: homeIndex})
  }

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = tasks[source.droppableId];
    const finish = tasks[destination.droppableId];

    if (start.order === finish.order) {
      const newOrder = Array.from(tasks[destination.droppableId].order);

      newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, draggableId);

      const newColumn = {
        order: newOrder,
        tasks: tasks[destination.droppableId].tasks,
      };

      const newTasks = {
        ...tasks,
        [destination.droppableId]: newColumn,
      };

      setTasks(newTasks);
      save(newTasks);
      return;
    }

    //Moving from one list to another
    const startOrderIds = Array.from(start.order);
    startOrderIds.splice(source.index, 1);

    const startTasksIds = Array.from(start.tasks);
    const startTask = startTasksIds.find((x) => x.id === draggableId);
    startTasksIds.splice(startTasksIds.indexOf(startTask), 1);

    const newColumnStart = {
      tasks: startTasksIds,
      order: startOrderIds,
    };

    const finishOrderIds = Array.from(finish.order);
    finishOrderIds.splice(destination.index, 0, draggableId);

    const finishTasksIds = Array.from(finish.tasks);
    finishTasksIds.push(startTask);

    const newColumnFinish = {
      tasks: finishTasksIds,
      order: finishOrderIds,
    };

    const newTasks = {
      ...tasks,
      [source.droppableId]: newColumnStart,
      [destination.droppableId]: newColumnFinish,
    };

    setTasks(newTasks);
    save(newTasks);
  }

  return (
    <section className={styleKanban["kanban"]}>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        {board.columnOrder.map((columnId) => {
          const column = board.columns[columnId];
          const groupTasks = tasks[columnId];

          const icon = board.icons[columnId];
          //const isDropDisabled = index < board.homeIndex;
          const isDropDisabled = false;

          return (
            <Column
              key={column.id}
              column={column}
              tasks={groupTasks}
              icon={icon}
              infos={data.openchat}
              isDropDisabled={isDropDisabled}
              isDraggableDisabled={isDraggableDisabled}
            />
          );
        })}
      </DragDropContext>
    </section>
  );
};

export default KanBan;
