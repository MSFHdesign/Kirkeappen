import React, { useState } from "react";
import { useLanguage } from "./LanguageContext";

const LanguageSwitcher: React.FC = () => {
  const { toggleLocale } = useLanguage();
  const [buttonText, setButtonText] = useState("SWITCH TO ENGLISH");

  const handleClick = () => {
    if (buttonText === "SWITCH TO ENGLISH") {
      setButtonText("SKIFT TIL DANSK");
      toggleLocale();
    } else {
      setButtonText("SWITCH TO ENGLISH");
      toggleLocale();
    }
  };

  return (
    <div>
      <button onClick={handleClick}>{buttonText}</button>
    </div>
  );
};

export default LanguageSwitcher;
