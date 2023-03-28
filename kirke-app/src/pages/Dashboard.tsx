import React from "react";

import DashboardCard from "../components/DashboardCard";
import { useLanguage } from "../components/LanguageContext";
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
    <div>
      <h1>{dash.title}</h1>
      <h2>
        {dash.welcomeMessage}
        <strong>{props.userEmail}</strong>
      </h2>
      <div className={style.DashContainer}>
        <div className={style.containerBox}>
          <DashboardCard
            heading={"Personlige Historier"}
            text={
              "Yes, Yes, without the oops! Do you have any idea how long it takes those cups to decompose. God help us, we're in the hands of engineers."
            }
            addnew={{
              btnTitle: "Opret ny",
              btnLink: "/personlige/add",
            }}
            readedit={{
              btnTitle: "Læs/rediger",
              btnLink: "/personlige",
            }}
          />
          <DashboardCard
            heading={"Historiske fortællinger"}
            text={
              "Yes, Yes, without the oops! Do you have any idea how long it takes those cups to decompose. God help us, we're in the hands of engineers."
            }
            addnew={{
              btnTitle: "Opret ny",
              btnLink: "/historiske/add",
            }}
            readedit={{
              btnTitle: "Læs/rediger",
              btnLink: "/historiske",
            }}
          />
          <DashboardCard
            heading={"Historier til godkendelse"}
            text={
              "Yes, Yes, without the oops! Do you have any idea how long it takes those cups to decompose. God help us, we're in the hands of engineers."
            }
            addnew={{
              btnTitle: "Læs & rediger",
              btnLink: "/approve",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
