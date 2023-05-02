import React, { useState } from "react";
import { useLanguage } from "./LanguageContext";
// This component is for allowing the user to set prefered language.
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
      <span>
        <p>Select language: </p>
      </span>
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
