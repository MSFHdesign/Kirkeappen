import React, { useState } from "react";
import { useLanguage } from "./LanguageContext";
import dk from "../img/dk.png";
import uk from "../img/uk.png";

const LanguageSwitcher: React.FC = () => {
  const { toggleLocale } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleLanguageChange = (language: string) => {
    if (language !== selectedLanguage) {
      setSelectedLanguage(language);
      toggleLocale();
    }
  };

  return (
    <div>
      <span>Select language: </span>
      <select
        value={selectedLanguage}
        onChange={(e) => handleLanguageChange(e.target.value)}
      >
        <option value="en">Dansk</option>
        <option value="da">English</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
