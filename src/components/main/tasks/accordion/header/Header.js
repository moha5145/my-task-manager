import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

// import ColoredButton from "../../../../buttons/ColoredButton";
// import FlatButton from "../../../../custom/buttons/FlatButton";
import IconButton from "../../../../custom/buttons/IconButton";
import CustomInput from "../../../../custom/inputs/CustomInput";

const AccordionHeader = ({
  state,
  todo,
  dispatch,
  category,
  index,
  textAreaRef,
  focus,
  setFocus,
}) => {
  // const getOutlineColor = () => {
  //   return type === "edit"
  //     ? state?.color?.primary || category?.color.primary
  //     : state?.color?.primary || state.defaultColor.primary;
  // };

  // const outlineColor = getOutlineColor();
  return (
    <div className="flex w-full  gap-2 mb-1 justify-between items-center">
      <DragIndicatorIcon />

      {/* <input
        // autoFocus
        name="title"
        placeholder="Title"
        onChange={(e) => {
          e.stopPropagation();
          dispatch({
            type: "updateTodos",
            payload: {
              title: e.target.value,
              id: todo.id,
            },
          });
        }}
        defaultValue={todo.title}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        style={
          focus
            ? { outlineColor: category?.color?.primary }
            : { border: "none" }
        }
        className={`h-auto px-1 mx-0 py-2 my-0 w-full overflow-y-hidden resize-non focus:outline-indigo-[${category.color.primary}] border-solid rounded-md decoration-2`}
      /> */}
      <CustomInput
        placeholder="title"
        value={todo.title}
        category={category}
        className={`h-auto px-1 mx-0 py-2 my-0 w-full  overflow-y-hidden resize-non focus:outline-indigo-[${category.color.primary}] border-solid rounded-md decoration-2`}
        onChange={(e) => {
          dispatch({
            type: "updateTodos",
            payload: {
              title: e.target.value,
              id: todo.id,
            },
          });
        }}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        style={
          focus
            ? { outlineColor: category?.color?.primary }
            : { border: "none" }
        }
      />
      {todo.dueDate ? (
        <div className="text-xs min-w-[65px]">
          {new Date(todo.dueDate).toLocaleDateString()}
        </div>
      ) : null}
      <div className="">
        <IconButton
          Icon={todo.expanded ? ExpandLessIcon : ExpandMoreIcon}
          color={category.color.primary}
          onClick={() => {
            dispatch({ type: "expanded", payload: todo });
          }}
        />
      </div>
    </div>
  );
};
export default AccordionHeader;
