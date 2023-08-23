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

  columns: [
    {
      id: "1f0fab8d0c8",
      title: "todo",
      color: "red",
      taskTitle: "",
      showMenu: false,
      todos: [],
    },
    {
      id: "f0fab8d0c8f",
      title: "inProgress",
      color: "orange",
      taskTitle: "",
      showMenu: false,
      todos: [],
    },
    {
      id: "0fab8d0c8f8",
      title: "completed",
      color: "lightgreen",
      taskTitle: "",
      showMenu: false,
      todos: [],
    },
  ],
};

export const nested = (categories, newTodos, linkProperty = "categoryId") => {
  const nest = (items, parentId = null) =>
    items.map((item) => ({
      ...item,
      todos: nest(newTodos.filter((todo) => todo[linkProperty] === item.id)),
    }));

  const nestedCategories = nest(categories);
  return nestedCategories;
};

const updateCategory = (state, action) => {
  const { name, color, slug, id, type, todos } = action.payload;
  const defaultColor = state.defaultColor;

  if (type === "edit") {
    const updatedCategory = state.categorys.map((category) =>
      id === category.id
        ? {
            ...category,
            name: name || category.name,
            color: color || category.color,
            slug: slug || category.slug,
            todos: [],
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
      todos: todos || [],
    },
    ...state.categorys,
  ];
  // console.log("copy 2");
  return category;
};

const deleteCategory = (state, action) => {
  return state.categorys.filter((category) => category.slug !== action.payload);
};

const taskTitle = (state, action) => {
  const { columnIndex, title, column } = action.payload;
  const newColumns = [...state.columns];
  const updatedColumns = newColumns.map((item, index) => {
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
  const { columnIndex, showMenu } = action.payload;
  const columns = state.columns.map((column, index) => {
    return {
      ...column,
      showMenu: index === columnIndex ? showMenu : column.showMenu,
    };
  });
  return columns;
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
  // console.log("priority", priority);
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
  // console.log("todos", todos);
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

  const changeStatus = newList.map((items) => ({
    ...items,
    todos: items.todos.map((todo) => ({ ...todo, status: items.title })),
  }));

  return changeStatus;
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
    case "updateColumns":
      const columns = updateColumns(state, action);
      return {
        ...state,
        columns: columns,
      };
    case "addColumn":
      return {
        ...state,
        columns: [...state.columns, action.payload],
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
      // console.log("state.newTodos", state.newTodos);
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
      const withoutCurrCategory = todosWithoutCurrentCategory(
        state.todos,
        action.payload.category.id
      );

      const reorderedTodos = moveItemUpAndDown(state, action);

      const flatedTodos = reorderedTodos
        .flatMap((curr) => curr.todos)
        .filter(Boolean);

      const updatedNewTodos = withoutCurrCategory.concat(flatedTodos);
      return {
        ...state,
        columns: reorderedTodos,
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
