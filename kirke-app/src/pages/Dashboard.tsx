import React from "react";

import { useLanguage } from "../components/LanguageContext";
// Components
import DashboardCard from "../components/DashboardCard";
import Navigationsbar from "../components/navigationbar";
import AuthWelcome from "../components/AuthWelcome";
import AuthSelect from "../components/AuthSelect";
// Style
import style from "../style/dashCard.module.css";

const DashBoard: React.FunctionComponent = (props) => {
  const { locale } = useLanguage();
  const dash = locale.dashboard;
  return (
    <div className={style.container}>
      <Navigationsbar />
      <h1>{dash.title}</h1>

      <AuthWelcome />

      <AuthSelect />

      <div className={style.DashContainer}>
        <div className={style.containerBox}>
          <DashboardCard
            heading={dash.cardOne.header}
            text={dash.cardOne.content}
            addnew={{
              btnTitle: dash.cardOne.addTitle,
              btnLink: "/personlige/add",
            }}
            readedit={{
              btnTitle: dash.cardOne.readTitle,
              btnLink: "/personlige",
            }}
          />

          <DashboardCard
            heading={dash.cardTwo.header}
            text={dash.cardTwo.content}
            addnew={{
              btnTitle: dash.cardTwo.addTitle,
              btnLink: "/historiske/add",
            }}
            readedit={{
              btnTitle: dash.cardTwo.readTitle,
              btnLink: "/historiske",
            }}
          />
          <DashboardCard
            heading={dash.cardThree.header}
            text={dash.cardThree.content}
            addnew={{
              btnTitle: dash.cardThree.readTitle,
              btnLink: "/approve",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
