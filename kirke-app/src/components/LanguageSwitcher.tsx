import React, { useState } from "react";
import { useLanguage } from "./LanguageContext";
import dk from "../img/dk.png";
import uk from "../img/uk.png";

const LanguageSwitcher: React.FC = () => {
  const { toggleLocale } = useLanguage();
  const [languageFlag, setLanguageFlag] = useState(uk);

  const handleClick = () => {
    if (languageFlag === dk) {
      setLanguageFlag(uk);
      toggleLocale();
    } else {
      setLanguageFlag(dk);
      toggleLocale();
    }
  };

  return (
    <div>
      <img
        src={languageFlag}
        alt="languageFlag"
        width={100}
        height={50}
        onClick={handleClick}
      />
    </div>
  );
};

export default LanguageSwitcher;
