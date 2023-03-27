import React, { useState } from "react";
import { useLanguage } from "./LanguageContext";
import dk from "../img/dk.png";
import uk from "../img/uk.png";

const LanguageSwitcher: React.FC = () => {
  const { toggleLocale } = useLanguage();
  const [languageFlag, setLanguageFlag] = useState(uk);

  const handleClick = (props: any) => {
    if (languageFlag === props) {
      toggleLocale();
    } else {
    }
  };
  const changeLanguageUk = () => {
    setLanguageFlag(uk);
    handleClick(uk);
  };
  const changeLanguageDk = () => {
    setLanguageFlag(dk);
    handleClick(dk);
  };

  return (
    <div>
      <img
        src={dk}
        alt="languageFlag"
        width={100}
        height={50}
        onClick={changeLanguageDk}
      />
      <img
        src={uk}
        alt="languageFlag"
        width={100}
        height={50}
        onClick={changeLanguageUk}
      />
    </div>
  );
};

export default LanguageSwitcher;
