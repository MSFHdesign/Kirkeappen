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
      <div>
        <span>Select language: </span>
        <select
          value={selectedLanguage}
          onChange={(e) => handleLanguageChange(e.target.value)}
        >
          <option value="en">
            <img src={uk} alt="English" width={24} height={24} /> Dansk
          </option>
          <option value="da">
            <img src={dk} alt="Danish" width={24} height={24} /> English
          </option>
        </select>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
