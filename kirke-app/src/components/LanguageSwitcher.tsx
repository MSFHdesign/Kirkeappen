import React, { useState } from "react";
import { useLanguage } from "./LanguageContext";

const LanguageSwitcher: React.FC = () => {
  const { toggleLocale } = useLanguage();
  const [buttonText, setButtonText] = useState("EN");

  const handleClick = () => {
    if (buttonText === "EN") {
      setButtonText("DK");
      toggleLocale();
    } else {
      setButtonText("EN");
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
