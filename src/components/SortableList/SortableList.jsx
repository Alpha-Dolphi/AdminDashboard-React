import React from "react";
import { capitilizeFirstLetter } from "../../utils/capitilizeFirstLetter";
import styles from "./styles.module.css";
import * as HiIcons from "react-icons/hi";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";
import * as ReactDOMClient from "react-dom/client";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../../store/todo";
import { useSelector } from "react-redux";
import { selectTodoEntities } from "../../store/todo/selectors";
import { useEffect } from "react";

export class SortableList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props,

      editing: Object.keys(this.props).reduce(
        (acumulative, columnName) => ({
          ...acumulative,
          [columnName]: props[columnName].map((_, index) => false),
        }),
        {}
      ),
    };
  }

  deleteTodoOnClick = (event) => {
    event.preventDefault();
    const id = event.target.closest("[id]").id;

    this.dispatch(deleteTodo(id)).then((item) => {
      console.error(this.completedTodos);
      this.setState({
        completedTodos: Object.values(this.state.completedTodos).filter(
          (item) => +item.id !== +id
        ),
        uncompletedTodos: Object.values(this.state.uncompletedTodos).filter(
          (item) => +item.id !== +id
        ),
      });
    });
  };

  interactTodoOnClick = (event) => {
    const itemElem = event.target;
    const columnName = this.findInParentNodes(
      event.target,
      "data-class",
      "sortable-list-wrap",
      6
    ).id;
    const index = +this.findInParentNodes(itemElem, "data-index", "", 2, true)
      .attributes["data-index"].value;

    this.setState({
      editing: {
        ...this.state.editing,
        [columnName]: {
          ...this.state.editing[columnName],
          [index]: !this.state.editing[columnName][index],
        },
      },
    });
  };

  saveTodoOnClick = (event) => {
    const task = event.target.closest("[data-class='sortable-list-item']");
    const inputValue = task.lastChild.lastChild.value;
    console.error(task.parentNode);
    const userId = task.attributes["data-userid"]?.value;
    const completed = task.parentNode.id === "completedTodos" ? true : false;

    this.dispatch(
      updateTodo({
        id: task.id,
        changes: {
          title: inputValue,
          id: task.id,
          completed: completed,
          UserId: userId,
        },
      })
    ).then((item) => {
      this.setState({
        [task.parentNode.id]: Object.values(this.state[task.parentNode.id]).map(
          (item) => {
            if (+item.id === +task.id) {
              return {
                ...item,
                title: inputValue,
              };
            }
            return item;
          }
        ),
      });
    });
  };

  findInParentNodes = (
    item,
    attributeType,
    attributeValue,
    nestingLevelCheck = 4,
    any = false
  ) => {
    let acumulative = item;

    for (let i = 0; i < nestingLevelCheck; i++) {
      if (!acumulative) {
        return null;
      } else if (any && acumulative?.attributes[attributeType]?.value) {
        return acumulative;
      } else if (
        acumulative?.attributes[attributeType]?.value === attributeValue
      ) {
        return acumulative;
      } else {
        acumulative = acumulative.parentNode;
      }
    }
  };

  clickHandler = (event) => {
    event.preventDefault();
    const itemElem = this.findInParentNodes(
      event.target,
      "data-class",
      "sortable-list-item",
      4
    );

    if (
      !itemElem ||
      this.findInParentNodes(event.target, "data-class", "icon", 1) ||
      event.target.tagName === "INPUT"
    ) {
      if (event.target.tagName === "INPUT") {
        event.target.focus();
      }
      return;
    }

    this.dragStart(itemElem, event);
  };

  dragStart = (itemElem, { pageY, clientX, clientY }) => {
    this.pointerInitialShift = {
      x: clientX - itemElem.getBoundingClientRect().x,
      y: clientY - itemElem.getBoundingClientRect().y,
    };

    this.initialColumnWrapId = itemElem.parentNode.id;
    this.initialIndex = +itemElem?.attributes["index"]?.value;

    this.setState({
      [this.initialColumnWrapId]: {
        ...this.state[this.initialColumnWrapId],
        [this.initialIndex]: {
          ...this.state[this.initialColumnWrapId][this.initialIndex],
          type: "placeholder",
        },
      },
    });

    this.draggingElem = document.createElement("div");
    this.draggingElem.className = styles["sortable-list__item_dragging"];
    this.draggingElem.style.width = `${itemElem.offsetWidth}px`;
    this.draggingElem.style.height = `${itemElem.offsetHeight}px`;
    this.draggingElem.innerHTML = itemElem.innerHTML;
    const childNode = this.draggingElem.firstChild.childNodes[1].firstChild;
    const parentNode = this.draggingElem.firstChild.childNodes[1];
    const columnName = this.findInParentNodes(
      itemElem,
      "data-class",
      "sortable-list-wrap",
      2
    ).id;
    const index = itemElem.attributes["index"].value;

    if (this.state.editing[columnName][index]) {
      this.draggingElem.lastChild.innerHTML =
        this.draggingElem.lastChild.firstChild.value;
      parentNode.removeChild(childNode);
      const secondChildNode = parentNode.firstChild;
      const check = document.createElement("span");
      const root = ReactDOMClient.createRoot(check);
      root.render(<HiIcons.HiOutlinePencilAlt className={styles.update} />);
      parentNode.replaceChild(check, secondChildNode);

      this.setState({
        editing: {
          ...this.state.editing,
          [columnName]: {
            ...this.state.editing[columnName],
            [index]: false,
          },
        },
      });
    }

    this.draggingElem.style.position = "absolute";
    this.draggingElem.style.top = pageY - this.pointerInitialShift.y + "px";

    this.prevItemElem = itemElem;

    itemElem.after(this.draggingElem);

    document.addEventListener("pointermove", this.onPointerMove);
    document.addEventListener("pointerup", this.onPoinerUp);
  };

  onPointerMove = ({ pageY, clientX, clientY }) => {
    this.draggingElem.style.position = "fixed";

    this.moveDraggingAt(clientX, clientY);

    this.draggingElem.hidden = true;
    const elementUnderDraggable = document.elementFromPoint(clientX, clientY);
    this.draggingElem.hidden = false;

    const item = this.findInParentNodes(
      elementUnderDraggable,
      "data-class",
      "sortable-list-item",
      3
    );
    if (item) {
      const currentColumnWrapId = item.parentNode.id;
      const currentIndex = +item.attributes["index"].value;

      if (
        currentColumnWrapId !== this.initialColumnWrapId &&
        this.state[this.initialColumnWrapId][this.initialIndex].type ===
          "placeholder"
      ) {
        const currentArray = Object.values(this.state[currentColumnWrapId]);
        const initialItem =
          this.state[this.initialColumnWrapId][this.initialIndex];

        this.setState({
          [currentColumnWrapId]: {
            ...[
              ...currentArray.slice(0, currentIndex),
              { ...initialItem },
              ...currentArray.slice(currentIndex),
            ],
          },
          [this.initialColumnWrapId]: {
            ...Object.values(this.state[this.initialColumnWrapId]).filter(
              (_, i) => i !== this.initialIndex
            ),
          },
        });

        this.initialColumnWrapId = currentColumnWrapId;
        this.initialIndex = currentIndex;
        return;
      }

      if (this.initialIndex === currentIndex) {
        return;
      }

      this.setState({
        [currentColumnWrapId]: {
          ...Object.values(this.state[currentColumnWrapId]).map((item) => {
            return { ...item, type: "item" };
          }),
          [this.initialIndex]: {
            ...this.state[currentColumnWrapId][currentIndex],
            type: "item",
          },
          [currentIndex]: {
            ...this.state[currentColumnWrapId][this.initialIndex],
            type: "placeholder",
          },
        },
      });
      this.initialIndex = currentIndex;
    }

    this.scrollIfCloseToWindowEdge(clientY, pageY);
  };

  scrollIfCloseToWindowEdge(clientY, pageY) {
    const scrollingValue = 220;
    const threshold = 150;

    if (window.innerHeight - clientY < threshold && !this.scrolling) {
      this.scrolling = true;
      window.scrollBy({ top: scrollingValue, behavior: "smooth" });
      setTimeout(() => {
        this.scrolling = false;
      }, "300");
    } else if (clientY < threshold && !this.scrolling) {
      this.scrolling = true;
      window.scrollBy({ top: -scrollingValue, behavior: "smooth" });
      setTimeout(() => {
        this.scrolling = false;
      }, "300");
    }
  }

  moveDraggingAt(clientX, pageY) {
    const left = clientX - this.pointerInitialShift.x;
    const top = pageY - this.pointerInitialShift.y;
    this.draggingElem.style.left = left + "px";
    this.draggingElem.style.top = top + "px";
  }

  onPoinerUp = ({ clientX, clientY }) => {
    this.draggingElem.hidden = true;
    const elementUnderDraggable = document.elementFromPoint(clientX, clientY);
    this.draggingElem.hidden = false;

    if (
      elementUnderDraggable?.attributes["data-class"]?.value ===
        "sortable-list-wrap" &&
      !Object.values(this.state[elementUnderDraggable.id]).length
    ) {
      const currentColumnWrapId = elementUnderDraggable.id;
      this.setState({
        [currentColumnWrapId]: {
          0: {
            ...this.state[this.initialColumnWrapId][this.initialIndex],
            type: "item",
          },
        },
        [this.initialColumnWrapId]: {
          ...Object.values(this.state[this.initialColumnWrapId]).filter(
            (_, i) => i !== this.initialIndex
          ),
        },
      });
    } else {
      if (
        elementUnderDraggable?.attributes["data-class"]?.value ===
        "sortable-list-item"
      ) {
        this.initialIndex = +elementUnderDraggable?.attributes["index"]?.value;
      }

      const placeholderType =
        this.state[this.initialColumnWrapId][this.initialIndex].type;

      if (placeholderType !== "placeholder") {
        const placeHolderItem = Object.values(
          this.state[this.initialColumnWrapId]
        ).find((item) => item.type === "placeholder");
      }

      const column = this.state[this.initialColumnWrapId];

      console.log(
        column,
        this.initialIndex,
        column[this.initialIndex].completed
      );
      this.setState({
        [this.initialColumnWrapId]: {
          ...Object.values(this.state[this.initialColumnWrapId]).map(
            (item) => ({ ...item, type: "item" })
          ),
        },
      });
    }

    document.removeEventListener("pointermove", this.onPointerMove);
    document.removeEventListener("pointerup", this.onPoinerUp);

    this.draggingElem.remove();
    this.draggingElem = null;
    this.initialIndex = null;
    this.prevItemElem = null;
    this.pointerInitialShift;
  };

  getColumn(list, columnName) {
    return (
      <>
        {Object.values(list).map((item, index) => {
          return item.type === "placeholder" ? (
            <div
              key={item.id}
              style={{
                width: "100%",
                height: `${
                  this.draggingElem?.style.height
                    ? this.draggingElem?.style.height
                    : "60px"
                }`,
              }}
              index={index}
              data-class={"sortable-list-item"}
            ></div>
          ) : (
            <div
              key={item.id}
              id={item.id}
              data-class={"sortable-list-item"}
              data-userid={item.userId}
              index={index}
              className={styles["sortable-list-item"]}
            >
              <div className={styles["panel-container"]}>
                <div className={styles.number}>
                  <i>Task №{item.id}</i>
                </div>
                <div className={styles.panel}>
                  {this.state.editing[columnName][index] ? (
                    <>
                      <MdIcons.MdOutlineExitToApp
                        data-class="icon"
                        data-index={index}
                        onClick={(event) => this.interactTodoOnClick(event)}
                        className={styles.quit}
                      />
                      <MdIcons.MdOutlineSaveAlt
                        data-class="icon"
                        data-index={index}
                        onClick={(event) => this.saveTodoOnClick(event)}
                        className={styles.save}
                      />
                    </>
                  ) : (
                    <HiIcons.HiOutlinePencilAlt
                      data-class="icon"
                      data-index={index}
                      onClick={this.interactTodoOnClick}
                      className={styles.update}
                    />
                  )}
                  <RiIcons.RiDeleteBinLine
                    data-class="icon"
                    id={item.id}
                    data-index={index}
                    onClick={(event) => this.deleteTodoOnClick(event)}
                    className={styles.delete}
                  />
                </div>
              </div>
              <hr className={styles.separator}></hr>
              {this.state.editing[columnName][index] ? (
                <div className={styles["textarea-wrap"]}>
                  <input
                    className={styles.textarea}
                    defaultValue={capitilizeFirstLetter(item.title)}
                  ></input>
                </div>
              ) : (
                <div>{capitilizeFirstLetter(item.title)}</div>
              )}
            </div>
          );
        })}
      </>
    );
  }

  AccessToHooks = () => {
    const todos = useSelector(selectTodoEntities);
    this.dispatch = useDispatch();

    this.uncompletedTodos = Object.values(todos).filter(
      (todo) => !todo.completed
    );
    this.completedTodos = Object.values(todos).filter((todo) => todo.completed);
    const data = {
      completedTodos: this.completedTodos,
      uncompletedTodos: this.uncompletedTodos,
    };

    useEffect(() => {
      this.state = {
        ...data,
        editing: Object.keys(data).reduce(
          (acumulative, columnName) => ({
            ...acumulative,
            [columnName]: data[columnName].map((_, index) => false),
          }),
          {}
        ),
      };
    }, []);

    this.sortableColumnsWrap = Object.keys(data).map((id, index) => {
      if (id === "editing") {
        return;
      }
      return (
        <div
          key={id}
          className={styles["sortable-list-wrap"]}
          data-class={"sortable-list-wrap"}
          id={id}
          onPointerDown={this.clickHandler}
        >
          {this.getColumn(this.state[id], id)}
        </div>
      );
    });

    return Object.values(this.sortableColumnsWrap);
  };

  render() {
    return <this.AccessToHooks />;
  }
}
