import React from "react";
import { useLanguage } from "../models/LanguageContext";

const LanguageSwitcher: React.FC = () => {
  const { toggleLocale } = useLanguage();

  return (
    <div>
      <button onClick={() => toggleLocale()}>Switch Language</button>
    </div>
  );
};

export default LanguageSwitcher;
