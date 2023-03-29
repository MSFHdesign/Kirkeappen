import React, { useState } from "react";
import style from "../style/search.module.css";

interface Props {
  data: any[];
  onSearch: (searchText: string, filteredData: any[]) => void;
}

const Search: React.FC<Props> = (props) => {
  const [searchText, setSearchText] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    const filteredData = props.data.filter((item) =>
      item.firstName.toLowerCase().includes(event.target.value.toLowerCase())
    );
    props.onSearch(event.target.value, filteredData);
  };

  return (
    <div className={style.searchWrapper}>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchText}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Search;
