import React, { useState } from "react";

interface Props {
  onSort: (field: string, direction: "asc" | "desc") => void;
}

const Sorting: React.FC<Props> = ({ onSort }) => {
  const [direction, setDirection] = useState<"asc" | "desc">("desc");

  const handleSortClick = (field: string) => {
    const newDirection = direction === "desc" ? "asc" : "desc";
    onSort(field, newDirection);
    setDirection(newDirection);
  };

  return (
    <div>
      <button onClick={() => handleSortClick("createdAt")}>
        {direction === "desc" ? "Newest" : "Oldest"}
      </button>
    </div>
  );
};

export default Sorting;
