import React, { useState } from "react";
import { useLanguage } from "./LanguageContext";
import dk from "../img/dk.png";
import uk from "../img/uk.png";

const LanguageSwitcher: React.FC = () => {
  const { toggleLocale } = useLanguage();
  const [languageFlag, setLanguageFlag] = useState(uk);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLanguageClick = (flag: any) => {
    setLanguageFlag(flag);
    toggleLocale();
    setDropdownOpen(false);
  };

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const languages = [
    { flag: uk, name: "English" },
    { flag: dk, name: "Danish" },
  ];

  return (
    <div className="dropdown" onClick={handleDropdownClick}>
      <img
        src={languageFlag}
        alt="languageFlag"
        width={30}
        height={20}
        className="dropdown-toggle"
        data-toggle="dropdown"
      />
      {dropdownOpen && (
        <div className="dropdown-menu">
          {languages.map((language, index) => (
            <button
              key={index}
              className="dropdown-item"
              onClick={() => handleLanguageClick(language.flag)}
            >
              <img
                src={language.flag}
                alt={language.name}
                width={30}
                height={20}
                className="mr-2"
              />
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
