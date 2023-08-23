import React, { useState, useRef, useEffect } from "react";

const defaultData = [
  { title: "group 1", items: ["1", "2", "3"] },
  { title: "group 2", items: ["4", "5"] },
];

const sumArray = [1, 2, 3, 4, 5];
console.log("sumArray", sumArray);

const dubleArray = sumArray.map((item) => item * 2);
console.log("dubleArray", dubleArray);
const evnArray = sumArray.filter((item) => item % 2 === 0);
console.log("evnArray", evnArray);
const oddArray = sumArray.filter((item) => item % 2 !== 0);

console.log("oddArray", oddArray);

const maxValueArray = sumArray.reduce((max, currItem) =>
  Math.max(max, currItem)
);

console.log("maxValueArray", maxValueArray);

const minValueArray = sumArray.reduce((min, currItem) =>
  Math.min(min, currItem)
);

console.log("minValueArray", minValueArray);

const sumValueArray = sumArray.reduce(
  (totalValue, value) => totalValue + value,
  0
);
console.log("sumValueArray", sumValueArray);

const isOddValue = sumArray.some((item) => item % 2 !== 0);
console.log("isOddValue", isOddValue);

const userList = [
  { name: "chala", gender: "M", salery: 35000 },
  { name: "burtukan", gender: "F", salery: 38000 },
  { name: "zeberga", gender: "M", salery: 37000 },
  { name: "turingo", gender: "F", salery: 36000 },
];

const upGradedMansSalery = userList
  .filter((user) => user.gender === "M")
  .map((user) => user.salery + 1000)
  .reduce((totalSalery, salery) => totalSalery + salery, 0);

console.log("upGradedMansSalery", upGradedMansSalery);

function DragNDrop() {
  const [list, setList] = useState(defaultData);
  const [dragging, setDragging] = useState(false);

  // useEffect(() => {
  //   setList(data);
  // }, [setList, data]);

  const dragItem = useRef();
  const dragItemNode = useRef();

  const handletDragStart = (e, item) => {
    console.log("Starting to drag", item);

    dragItem.current = item;
    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener("dragend", handleDragEnd);

    setTimeout(() => {
      setDragging(true);
    }, 0);
  };
  const handleDragEnter = (e, targetItem) => {
    console.log("Entering a drag target", targetItem);
    if (dragItemNode.current !== e.target) {
      console.log("Target is NOT the same as dragged item");
      let newList = JSON.parse(JSON.stringify(list));
      newList[targetItem.grpI].items.splice(
        targetItem.itemI,
        0,
        newList[dragItem.current.grpI].items.splice(
          dragItem.current.itemI,
          1
        )[0]
      );
      dragItem.current = targetItem;
      // localStorage.setItem("List", JSON.stringify(newList));
      console.log("newList", newList);
      // return newList;
      setList(newList);
    }
  };
  const handleDragEnd = (e) => {
    console.log("list", list);
    setDragging(false);
    dragItemNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragItemNode.current = null;
  };
  const getStyles = (item) => {
    if (
      dragItem.current.grpI === item.grpI &&
      dragItem.current.itemI === item.itemI
    ) {
      return "bg-green-400 m-2 py-10";
    }
    return "bg-blue-400 m-2 py-10";
  };

  // if (list) {
  return (
    <div className="flex h-full w-full">
      {list.map((grp, grpI) => (
        <div
          key={grp.title}
          onDragEnter={
            dragging && !grp.items.length
              ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
              : null
          }
          className="w-48 bg-red-400 "
        >
          {grp.items.map((item, itemI) => (
            <div
              draggable
              key={item}
              onDragStart={(e) => handletDragStart(e, { grpI, itemI })}
              onDragEnter={
                dragging
                  ? (e) => {
                      handleDragEnter(e, { grpI, itemI });
                    }
                  : null
              }
              className={
                dragging ? getStyles({ grpI, itemI }) : "bg-green-400 m-2 py-10"
              }
            >
              {item}
            </div>
          ))}
        </div>
      ))}

      <div class="relative inline-block text-left">
        <div>
          <button
            type="button"
            class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            Options
            <svg
              class="-mr-1 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div
          class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1"
        >
          <div class="py-1" role="none">
            <a
              href="#"
              class="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabindex="-1"
              id="menu-item-0"
            >
              Account settings
            </a>
            <a
              href="#"
              class="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabindex="-1"
              id="menu-item-1"
            >
              Support
            </a>
            <a
              href="#"
              class="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabindex="-1"
              id="menu-item-2"
            >
              License
            </a>
            <form method="POST" action="#" role="none">
              <button
                type="submit"
                class="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                role="menuitem"
                tabindex="-1"
                id="menu-item-3"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  // } else {
  //   return null;
  // }
}

export default DragNDrop;
