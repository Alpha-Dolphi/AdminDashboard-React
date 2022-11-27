import React from "react";
import { useSelector } from "react-redux";
import { selectAreTodosLoading, selectTodoEntities, selectTodoIds, selectTodosById } from "../../store/todo/selectors";
import { capitilizeFirstLetter } from "../../utils/capitilizeFirstLetter";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./styles.module.css";

export const Todos = () => {
    // const [order, changeOrder] = useState(false);
    const isLoadingTodos = useSelector(selectAreTodosLoading);

    if (isLoadingTodos) {
        return <div>Loading</div>;
    }

    const todos = useSelector(selectTodoEntities);
    const todosIds = useSelector(selectTodoIds);

    const uncompletedTodos = Object.values(todos).filter((todo) => !todo.completed);
    const completedTodos = Object.values(todos).filter((todo) => todo.completed);

    const draggableState = {
        "uncompletedBoard": uncompletedTodos,
        "completedBoard": completedTodos
    };

    const toggleStatus = (event) => {
        if (event.target.innerText === "✓") {
            event.target.innerText = "x"
            event.target.style.color = "var(--dark-text-color)";
            event.target.style.backgroundColor = "var(--semi-light-background-color)";
        } else {
            event.target.innerText = "✓";
            event.target.style.color =  "var(--light-text-color)";
            event.target.style.backgroundColor = "var(--dark-text-color)";
        }
    }

    const dragEnd = (result) => {
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

        const initialColumnTaskIds = draggableState[source.droppableId];
        const newColumnTaskIds = draggableState[destination.droppableId];

        if (source.droppableId === "uncompletedBoard") {
            const task = initialColumnTaskIds.splice(source.index, 1);
            const buttonSymbol = document.getElementById(task[0].id).lastChild.innerText;
            if (buttonSymbol === "✓") {
                newColumnTaskIds.splice(destination.index, 0, task[0]);
            } else {
                initialColumnTaskIds.splice(source.index, 0, task[0]);
            }

        } else {
            const task = initialColumnTaskIds.splice(source.index, 1);
            newColumnTaskIds.splice(destination.index, 0, task[0]);
        }
    }


  return (
    <DragDropContext onDragEnd={dragEnd}>
    <div className={styles.wrap}>
        <Droppable droppableId="uncompletedBoard" key="uncompletedBoard">
            {(provided) => {
                return (
                    <div
                        className={styles.uncompletedBoard}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {provided.placeholder}
                        {uncompletedTodos.map((todo, index) => {
                                return <Draggable draggableId={todo.id.toString()} index={index} key={todo.id}>
                                    {(provided) => {
                                        return (
                                        <div
                                            key={todo.id}
                                            id={todo.id}
                                            className={styles.todo}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                        >
                                            {capitilizeFirstLetter(todo.title)}
                                            <button className={styles.uncompleted} onClick={(event) => toggleStatus(event)}>x</button>
                                        </div>
                                        )}
                                    }
                                </Draggable>
                        })}
                    </div>
                )
            }
        }
        </Droppable>
        <Droppable droppableId="completedBoard" key="completedBoard">
            {(provided) => {
                return (
                    <div
                        className={styles.completedBoard}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {provided.placeholder}
                        {completedTodos.map((todo, index) => {
                                return <Draggable draggableId={todo.id.toString()} index={index} key={todo.id}>
                                    {(provided) => {
                                        return (
                                        <div
                                            key={todo.id}
                                            className={styles.todo}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                        >
                                            {capitilizeFirstLetter(todo.title)}
                                            <button className={styles.completed}>✓</button>
                                        </div>
                                        )}
                                    }
                                </Draggable>
                        })}
                    </div>
                )
            }
        }
        </Droppable>

    </div>
    </DragDropContext>
  );
};
