import React from "react";

const Priority = ({ todo, dispatch, category, focus, setFocus }) => {
  const onChangePriority = (e) => {
    const priority = e.target.value;
    dispatch({type: 'isTodoChanged', payload: {name:'priority', value: priority, _id: todo._id}});

    dispatch({ type: "updateTodos", payload: { name: 'priority', value: priority, _id: todo._id }});
  }

  return (
    <div className="bg-red flex-1 mt-3">
      <label
        htmlFor="small"
        className="block w-full text-sm font-medium text-gray-400"
      >
        Priorité
      </label>
      <select
        id="priority"
        className="w-full p-1 mb-3 bg-[#E5E7EB] text-sm text-gray-900 border 
            border-gray-300 rounded-md
              dark:border-gray-600 dark:placeholder-gray-400"
        onChange={onChangePriority}
        defaultValue={todo.priority}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        style={
          focus
            ? {
                borderColor: category?.color?.primary,
                outlineColor: category?.color?.primary,
                ring: category?.color?.primary,
              }
            : { outline: "none", border: "none", ring: "none" }
        }
      >
        <option value="aucune">Aucune</option>
        <option value="low">Basse</option>
        <option value="medium">Moyenne</option>
        <option value="high">Haute</option>
      </select>
    </div>
  );
};
export default Priority;
