import React from "react";
import { Link } from "react-router-dom";
import style from "../style/dashCard.module.css";

interface CardProps {
  selectedValue: string;
  heading: string;
  text: string;
  addnew?: {
    btnTitle: string;
    btnLink: string;
  };
  readedit?: {
    btnTitle: string;
    btnLink: string;
  };
}

const Card: React.FC<CardProps> = ({
  heading,
  text,
  addnew,
  readedit,
  selectedValue,
}) => {
  return (
    <div className={style.card}>
      <span className={style.topBar}>
        <h2>{heading}</h2>
      </span>
      <span className={style.contentBox}>
        <p>{text}</p>
        <h3>{selectedValue}</h3>
      </span>
      <div className={style.BtnBox}>
        {addnew?.btnTitle && addnew?.btnLink && (
          <Link to={addnew.btnLink}>
            <button className={style.dashBtn}>{addnew.btnTitle}</button>
          </Link>
        )}
        {readedit?.btnTitle && readedit?.btnLink && (
          <Link to={readedit.btnLink}>
            <button className={style.dashBtn}>{readedit.btnTitle}</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Card;
