import { useState } from "react";

function FilterBar({ filter, setFilter, onAdd }) {
  const filters = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
  ];

  return (
    <div>
      <div className="flex flex-row gap-5 justify-center items-center p-5 bg-[#2C666E] text-18px md:text-[20px]">
        {filters.map((f) => {
          return (
            <button
              key={f.value}
              className={`cursor-pointer px-3 py-1 duration-500 hover:scale-105 transition capitalize ${filter === f.value ? "active" : "text-gray-400"}`}
              onClick={() => {
                setFilter(f.value);
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>
      <button
        onClick={onAdd}
        className="cursor-pointer hover:scale-102 transition bg-[#E76F51] text-white md:text-[18px] px-5 py-2 m-2 ml-8 mt-5 -mb-5 rounded"
        title="Add Tasks"
      >
        Add Task
      </button>
    </div>
  );
}

export default FilterBar;
