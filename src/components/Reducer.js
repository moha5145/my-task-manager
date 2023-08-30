import { uid } from "uid";
export const init = {
  id: 0,
  categorys: [],
  todos: [],
  newTodos: [],
  name: "",
  taskTitle: "",
  color: "",
  colorPalette: [
    { primary: "#62C188", secondary: "#D8EFE1" },
    { primary: "#f7ce00", secondary: "#FDF5CB" },
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

  columns: [],
};

export const nestCategories = (
  categories,
  todos,
  columns,
  linkProperty = "categoryId"
) => {
  const nest = (items, parentId = null) => {
    return items.map((item) => {
      const filteredColumns = columns.filter(
        (column) => column.categoryId === item.id
      );
      const filteredTodos = todos.filter(
        (todo) => todo[linkProperty] === item.id
      );
      const nestedColumns = filteredColumns.map((col) => {
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

const updateCategory = (state, action) => {
  const { name, color, slug, id, type, columns } = action.payload;
  const defaultColor = state.defaultColor;

  if (type === "edit") {
    const updatedCategory = state.categorys.map((category) =>
      id === category.id
        ? {
            ...category,
            name: name || category.name,
            color: color || category.color,
            slug: slug || category.slug,
            columns: [],
          }
        : category
    );
    return updatedCategory;
  }
  const category = [
    {
      id,
      name,
      color: color || defaultColor,
      slug: slug || id,
      columns: columns || [],
    },
    ...state.categorys,
  ];
  return category;
};

const deleteCategory = (state, action) => {
  return state.categorys.filter((category) => category.slug !== action.payload);
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

const showColumnMenu = (state, action) => {
  const { showMenu, column } = action.payload;

  const updatedColumns = state.columns.map((col) => ({
    ...col,
    showMenu: col.id === column.id ? showMenu : col.showMenu,
  }));

  return updatedColumns;
};

const addTodo = (state, action) => {
  const { title, category, status } = action.payload;
  const newTodo = {
    id: uid(),
    title,
    details: "",
    status,
    priority: "",
    dueDate: "",
    isDragging: false,
    categoryId: category.id,
    expanded: false,
  };
  return [newTodo, ...state.newTodos];
};

export const resizeTextArea = (textAreaRef) => {
  const singleRefs = textAreaRef?.current?.map((ref) => {
    ref && (ref.style.height = "auto");
    return ref ? (ref.style.height = ref.scrollHeight + "px") : ref;
  });
  return singleRefs;
};

const onUpdateTodo = (state, action) => {
  const { id, details, title, priority, status, dueDate } = action.payload;

  const newTodos = state.newTodos.map((todo) => {
    return id === todo.id
      ? {
          ...todo,
          details: details || todo.details,
          title: title || todo.title,
          priority: priority || todo.priority,
          status: status || todo.status,
          dueDate: dueDate || todo.dueDate,
        }
      : todo;
  });
  return newTodos;
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

const filterTodosByCategory = (todos, id) => {
  return todos.filter((todo) => todo?.categoryId === id);
};

const todosWithoutCurrentCategory = (todos, id) => {
  return todos.filter((todo) => todo?.categoryId !== id);
};

export const isEqual = (newTodos, todos) => {
  if (newTodos.length !== todos.length) return false;

  return newTodos.every((value, index) => value === todos[index]);
};

const saveTodos = (state, action) => {
  const { id } = action.payload;
  const newTodos = filterTodosByCategory(state.newTodos, id);
  const todos = filterTodosByCategory(state.todos, id);
  const isEqualResult = isEqual(newTodos, todos);
  const withoutCurrCategory = todosWithoutCurrentCategory(state.todos, id);
  const updatedTodos = isEqualResult
    ? state.todos
    : withoutCurrCategory.concat(newTodos);

  return updatedTodos;
};

export const activeSaveButton = (state, category) => {
  const filteredNewTodos = filterTodosByCategory(state.newTodos, category.id);
  const filteredTodos = filterTodosByCategory(state.todos, category.id);
  return isEqual(filteredNewTodos, filteredTodos);
};

const deleteTodo = (state, action) => {
  return state.newTodos.filter((todo) => todo.id !== action.payload.id);
};

const moveItemUpAndDown = (state, action) => {
  const { newList } = action.payload;

  const withoutCurrCategory = todosWithoutCurrentCategory(
    state.todos,
    action.payload.category.id
  );

  const changeStatus = newList.map((columns) => {
    const todos = columns.todos.map((todo) => ({
      ...todo,
      status: columns.title,
    }));
    return {
      ...columns,
      todos,
    };
  });
  const flatedTodos = changeStatus
    .flatMap((curr) => curr.todos)
    .filter(Boolean);

  const updatedNewTodos = withoutCurrCategory.concat(flatedTodos);

  return updatedNewTodos;
};

const toggleExpanded = (state, action) => {
  return state.newTodos.map((todo) =>
    todo.id === action.payload.id ? { ...todo, expanded: !todo.expanded } : todo
  );
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "updateCategory":
      const updatedCategory = updateCategory(state, action);
      return {
        ...state,
        categorys: updatedCategory,
        name: "",
        color: "",
      };
    case "deleteCategory":
      const deletedCategory = deleteCategory(state, action);
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
    case "updateColumns":
      const columns = updateColumns(state, action);
      return {
        ...state,
        columns: columns,
      };
    case "deleteColumn":
      const { column } = action.payload;
      const deleteTodosInThisCol = state.newTodos.filter(
        (todo) => todo.status !== column.title
      );
      return {
        ...state,
        columns: state.columns.filter((item) => item.id !== column.id),
        newTodos: deleteTodosInThisCol,
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
      const addedTodos = addTodo(state, action);
      const resetTaskTitle = state.columns.map((column) => ({
        ...column,
        taskTitle: "",
      }));
      return {
        ...state,
        newTodos: addedTodos,
        columns: resetTaskTitle,
      };
    case "updateTodos":
      const updatedTodos = onUpdateTodo(state, action);
      return {
        ...state,
        newTodos: updatedTodos,
      };

    case "saveTodos":
      const savedTodos = saveTodos(state, action);
      return {
        ...state,
        todos: savedTodos,
      };
    case "deleteTodo":
      const deletedTodo = deleteTodo(state, action);
      return {
        ...state,
        newTodos: deletedTodo,
      };
    case "moveUpAndDown":
      const updatedNewTodos = moveItemUpAndDown(state, action);
      return {
        ...state,
        newTodos: updatedNewTodos,
      };
    case "expanded":
      const toggledExpanded = toggleExpanded(state, action);
      return {
        ...state,
        newTodos: toggledExpanded,
      };
    default:
      return state;
  }
};
