import React, { useState, useRef, useEffect } from "react";

const defaultData = [
  { title: "group 1", items: ["1", "2", "3"] },
  { title: "group 2", items: ["4", "5"] },
];

const sumArray = [1, 2, 3, 4, 5];
// console.log("sumArray", sumArray);

const dubleArray = sumArray.map((item) => item * 2);
console.log("dubleArray", dubleArray);
const evnArray = sumArray.filter((item) => item % 2 === 0);
console.log("evnArray", evnArray);
const oddArray = sumArray.filter((item) => item % 2 !== 0);

console.log("oddArray", oddArray);

const maxValueArray = sumArray.reduce((maxVal, currVal) =>
  Math.max(maxVal, currVal)
);

console.log("maxValueArray", maxValueArray);

const minValueArray = sumArray.reduce((minVal, currVal) =>
  Math.min(minVal, currVal)
);

console.log("minValueArray", minValueArray);

const sumValueArray = sumArray.reduce(
  (totalVal, currVal) => totalVal + currVal
);
console.log("sumValueArray", sumValueArray);

const isOddValue = sumArray.some((item) => item % 2 === 0);
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
  .reduce((totalSalery, singleSalery) => totalSalery + singleSalery, 0);

console.log("upGradedMansSalery", upGradedMansSalery);

function DragNDrop() {
  const [data, setData] = useState(defaultData);
  const [draggedItem, setDraggedItem] = useState(null);

  useEffect(() => {
    const handleTouchMove = (e) => {
      if (draggedItem) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [draggedItem]);

  const handleDragStart = (groupIndex, itemIndex) => {
    setDraggedItem({ groupIndex, itemIndex });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (groupIndex, itemIndex) => {
    const sourceGroupIndex = draggedItem.groupIndex;
    const sourceItemIndex = draggedItem.itemIndex;

    // Do nothing if the item is dropped in the same position
    if (sourceGroupIndex === groupIndex && sourceItemIndex === itemIndex) {
      return;
    }

    const item = data[sourceGroupIndex].items[sourceItemIndex];
    const updatedData = [...data];

    // Remove the item from the source group
    updatedData[sourceGroupIndex].items.splice(sourceItemIndex, 1);

    // Insert the item at the target position in the target group
    updatedData[groupIndex].items.splice(itemIndex, 0, item);

    setData(updatedData);
    setDraggedItem(null);
  };

  return (
    <div className="flex gap-6 bg-gray-500">
      {data.map((group, groupIndex) => (
        <div
          key={group.title}
          className="group flex flex-col bg-yellow-400 gap-3"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(groupIndex, -1)}
        >
          <h2>{group.title}</h2>
          {group.items.map((item, itemIndex) => (
            <div
              key={item}
              className="item p-28 bg-red-400"
              draggable
              onDragStart={() => handleDragStart(groupIndex, itemIndex)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(groupIndex, itemIndex)}
              onTouchStart={() => handleDragStart(groupIndex, itemIndex)}
              onTouchMove={(e) => {
                const handleTouchMove = (e) => {
                  if (draggedItem) {
                    e.preventDefault();
                  }
                };

                document.addEventListener("touchmove", handleTouchMove, {
                  passive: false,
                });
              }}
              onTouchEnd={() => handleDrop(groupIndex, itemIndex)}
              onTouchCancel={() => handleDrop(groupIndex, itemIndex)}
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default DragNDrop;
