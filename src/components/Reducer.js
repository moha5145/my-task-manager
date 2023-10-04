import { toast } from "react-toastify";

export const init = {
  id: 0,
  categorys: [],
  columns: [],
  todos: [],
  newTodos: [],
  name: "",
  taskTitle: "",
  color: "",
  colorPalette: [
    { primary: "#808080", secondary: "#E6E6E6" },
    { primary: "#62C188", secondary: "#D8EFE1" },
    { primary: "#5D92BE", secondary: "#F1F4FF" },
    { primary: "#FF8138", secondary: "#FFDFCD" },
    { primary: "#B33FD6", secondary: "#ECCFF5" },
    { primary: "#bf2d2d", secondary: "#EFCACA" },
    { primary: "#2cb1ba", secondary: "#CAEBEE" },
    { primary: "#6240FF", secondary: "#D8CFFF" },
  ],
  defaultColor: { primary: "#808080", secondary: "#E6E6E6" },
  taskName: "",
  taskNameUpdate: "",
  isLoading: false,
};

export const nestCategories = (
  categories,
  todos,
  columns,
  linkProperty = "categoryId"
) => {
  const nest = (items, parentId = null) => {
    return items?.length > 0 && items?.map((item) => {
      const filteredColumns = columns.length > 0 && columns?.filter(
        (column) => column.categoryId === item._id
      );
      
      const filteredTodos = todos.filter(
        (todo) => todo[linkProperty] === item._id
      );
      
      const nestedColumns = filteredColumns.length > 0 && filteredColumns?.map((col) => {
        const nestedTodos = filteredTodos.filter(
          (todo) => todo.status === col.title
        );
        return {
          ...col,
          todos: nestedTodos,
        };
      });
      
      return {
        ...item,
        columns: nestedColumns,
      };
    });
  };

  const nestedCategories = nest(categories);
  return nestedCategories;
};

const taskTitle = (state, action) => {
  const { title, column } = action.payload;
  const newColumns = [...state.columns];

  const updatedColumns = newColumns.map((item) => {
    return {
      ...item,
      taskTitle: item.title === column.title ? title : "",
    };
  });
  return updatedColumns;
};

const updateColumns = (state, action) => {
  const { currCategory } = action.payload;
  const newColumns = [...state.columns];
  const updatedColumns = newColumns.map((column) => {
    const updatedTodos = currCategory.todos.filter(
      (item) => item?.status === column.title
    );
    return { ...column, todos: updatedTodos };
  });
  return updatedColumns;
};

const changeColumnTitle = (state, action) => {
  const { _id, title } = action.payload;
  const updatedCol = state.columns.map((column) => {
    return {
      ...column,
      title: column._id === _id ? title : column.title,
    };
  });
  return updatedCol;
};

const showColumnMenu = (state, action) => {
  const { showMenu, column } = action.payload;

  const updatedColumns = state.columns.map((col) => ({
    ...col,
    showMenu: col._id === column._id ? showMenu : col.showMenu,
  }));

  return updatedColumns;
};

export const resizeTextArea = (textAreaRef) => {
  const singleRefs = textAreaRef?.current?.map((ref) => {
    ref && (ref.style.height = "auto");
    return ref ? (ref.style.height = ref.scrollHeight + "px") : ref;
  });
  return singleRefs;
};

const isTodoChanged = (state, action) => {
  const { name, value, _id } = action.payload;
   const result = state.todos.map((element) => {
      if (element._id === _id) {
        const isEditing = state.newTodos.some((item) => item._id === _id && item[name] !== value)
        return {
          ...element,
          isEditing
        }
      }
      return element
    })
    return result
  } 

const onUpdateTodo = (state, action) => {
  const { name, value, _id } = action.payload;
  const todos = state.todos.map((todo) => {
    if (_id === todo._id) {
      return {...todo, [name] : value || todo[name] }
    }
    return todo
  });
  return todos;
};

const updateStatusInColumn = (state, action) => {
  const { todos, title } = action.payload;

  const updatedTodos = state.todos.map((todo) => {
    const isTodoUpdated = todos.some((elem) => elem._id === todo._id);
    return isTodoUpdated ? { ...todo, status: title } : todo;
  });

  return updatedTodos;
};
export const priorityStyle = (todo) => {
  if (todo.priority === "high") {
    return "red";
  } else if (todo.priority === "medium") {
    return "orange";
  } else if (todo.priority === "low") {
    return "lightgreen";
  } else {
    return "grey";
  }
};

export const filterTodosByCategory = (todos, id) => {
  return todos?.filter((todo) => todo?.categoryId === id);
};

const todosWithoutCurrentCategory = (todos, id) => {
  return todos.filter((todo) => todo?.categoryId !== id);
};

export const isEqual = (newTodos, todos) => {
  if (newTodos?.length !== todos?.length) return false;

  return newTodos.some((value, index) => value === todos[index]);
};

export const activeSaveButton = (state, category) => {
  const filteredTodos = filterTodosByCategory(state.todos, category._id);
  const result = filteredTodos.some((todo) => todo.isEditing);
  return result
};

const moveItemUpAndDown = (state, action) => {
  const { newList } = action.payload;

  const updatedTodos = newList.flatMap((columns) => {
    const todos = columns.todos.map((todo) => ({
      ...todo,
      status: columns.title
    }));

    return todos.filter(Boolean);
  });

  const updatedNewTodos = state.todos.filter(
    (todo) => todo.categoryId !== action.payload.category._id
  ).concat(updatedTodos);

  return updatedNewTodos;
};

const toggleExpanded = (state, action) => {
  return state.todos.map((todo) => {
     return todo._id === action.payload._id ? 
     { ...todo, expanded: !todo.expanded } :
     todo
  }
  );
};

const saveTodosInCurrentCategory = (state, action) => {
  const otherTodos = todosWithoutCurrentCategory(state.todos, action.payload.categoryId);
  const result = otherTodos.concat(action.payload.data)
  return result
}

export const notify = (text, type) => {
  switch (type) {
    case "success":
      return toast.success(text, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    case "error":
      return toast.error(text, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    case "info":
      return toast.info(text, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    case "warning":
      return toast.warn(text, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    case "custom":
      return toast("Custom Style Notification with css class!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "foo-bar",
      });
    default:
      return toast("Default Notification !");
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "isLoading":
      return {
        ...state,
        isLoading: action.payload,
      }
    case "initialData":
      const { allCategories, allColumns, allTodos } = action.payload;
      
      return {
        ...state,
        categorys: allCategories ? allCategories : state.categorys,
        columns: allColumns ? allColumns : state.columns,
        todos: allTodos ? allTodos : state.todos,
        // newTodos: allTodos ? allTodos : state.newTodos,
        name: "",
        color: "",
      }

    case "updateCategory":
      const {name, slug, color, _id } = action.payload;
      const updatedCategory = state.categorys.map((category) => {
        return category._id === _id ? { ...category, name, slug, color } : category
      })

      return {
        ...state,
        categorys: updatedCategory,
        name: "",
        color: "",
      };
    case "deleteCategory":
      const deletedCategory = state.categorys.filter((category) => category._id !== action.payload);
      return {
        ...state,
        categorys: deletedCategory,
      };
    case "categoryName":
      return {
        ...state,
        name: action.payload,
      };
    case "color":
      return {
        ...state,
        color: action.payload,
      };
    case "copyCategory":
      return {
        ...state,
        tasks: action.payload.category?.tasks,
      };
      case "copyTodos":
      return {
        ...state,
        newTodos: [...state.todos],
      };
    case "addIntialColumns":
      const { todo, inProgress, completed } = action.payload;
      return {
        ...state,
        columns: [...state.columns, todo, inProgress, completed],
      };
    case "addNewColumn":
      return {
        ...state,
        columns: [...state.columns, action.payload],
      };
    case "updateColumnName":
      const changeName = changeColumnTitle(state, action);
      return {
        ...state,
        columns: changeName,
      };
    case "updateColumns":
      const newColumns = updateColumns(state, action);
      return {
        ...state,
        columns: newColumns,
      };
    case "deleteColumn":
      const { data } = action.payload;
      return {
        ...state,
        columns: data.allColumns,
        todos: data.allTodos
      };
    case "showMenu":
      const showColMenu = showColumnMenu(state, action);
      return {
        ...state,
        columns: showColMenu,
      };
    case "taskTitle":
      const col = taskTitle(state, action);
      return {
        ...state,
        columns: col,
      };
    case "addTodo":
      const resetTaskTitle = state.columns.map((column) => ({
        ...column,
        taskTitle: "",
      }));
      return {
        ...state,
        todos: [...state.todos, action.payload],
        newTodos: [...state.newTodos, action.payload],
        columns: resetTaskTitle,
      };
    case "isTodoChanged":
      const todoChangedResult = isTodoChanged(state, action);
      return {
        ...state,
        todos: todoChangedResult
      }
    case "updateTodos":
      const updatedTodos = onUpdateTodo(state, action);
      return {
        ...state,
        todos: updatedTodos,
      };
    case "updateTodo":
      const updatedTodo = state.todos.map((todo) => {
        return todo._id === action.payload._id ? action.payload : todo
      })
      return {
        ...state,
        todos: updatedTodo,
      };
    case "updateStatus":
      const updatedStatus = updateStatusInColumn(state, action);
      return {
        ...state,
        todos: updatedStatus,
      };

    case "saveTodos":
      const savedTodos = saveTodosInCurrentCategory(state, action);
      
      return {
        ...state,
        todos: savedTodos,
      };
    case "deleteTodo":
      return {
        ...state,
        newTodos: action.payload.todos.allTodos,
        todos: action.payload.todos.allTodos
      };
    case "moveUpAndDown":
      const updatedNewTodos = moveItemUpAndDown(state, action);
      return {
        ...state,
        todos: updatedNewTodos,
      };
    case "expanded":
      const toggledExpanded = toggleExpanded(state, action);
      return {
        ...state,
        todos: toggledExpanded,
      };
    default:
      return state;
  }
};
