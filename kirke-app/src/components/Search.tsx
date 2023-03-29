import React, { useState } from "react";
import style from "../style/search.module.css";
import { useLanguage } from "../components/LanguageContext";
interface Props {
  data: any[];
  onSearch: (searchText: string, filteredData: any[]) => void;
}

const Search: React.FC<Props> = (props) => {
  const [searchText, setSearchText] = useState("");
  const { locale } = useLanguage();
  const story = locale.story;
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
        placeholder={locale.story.search}
        value={searchText}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Search;
