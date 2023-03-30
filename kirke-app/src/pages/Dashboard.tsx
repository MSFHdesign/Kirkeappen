import React from "react";

import DashboardCard from "../components/DashboardCard";
import { useLanguage } from "../components/LanguageContext";
import Navigationsbar from "../components/navigationbar";
import style from "../style/dashCard.module.css";

export interface IDashBoardProps {
  userEmail: string;
}

// eslint-disable-next-line no-lone-blocks
{
  /*
        import { getAuth, signOut } from "firebase/auth";
         const auth = getAuth();
        <button onClick={() => signOut(auth)}>Sign out of Firebase</button>
        
        */
}

const DashBoard: React.FunctionComponent<IDashBoardProps> = (props) => {
  const { locale } = useLanguage();
  const dash = locale.dashboard;
  return (
    <div className={style.container}>
      <Navigationsbar />
      <h1>{dash.title}</h1>
      <h2>
        {dash.welcomeMessage} <strong>{props.userEmail}</strong>
      </h2>
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
