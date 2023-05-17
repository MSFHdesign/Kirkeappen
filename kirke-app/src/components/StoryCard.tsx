import React from "react";
import style from "../style/display.module.css";
import { useLanguage } from "./LanguageContext";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import Logo from "../img/logo.svg";

interface CardProps {
  firstName: string;
  lastName: string;
  graveNumber: string;
  imageUrl: string;
  born: string;
  death: string;
  sections: {
    title: string;
    description: string;
  }[];
  comments: {
    title: string;
    comment: string;
  }[];
  collectionName: string;
  cardId: string;
  onDelete: () => void;
}

const Card: React.FC<CardProps> = (props) => {
  const { firstName, lastName, graveNumber, born, death, sections, comments } =
    props;
  const { locale } = useLanguage();
  const story = locale.story;

  return (
    <div className={style.TopLevelWrapper}>
      <img
        src={props.imageUrl || Logo}
        alt={firstName}
        className={style.cardImg}
        onContextMenu={(e) => e.preventDefault()}
      />
      <div className={style.contentWrapper}>
        <div className={style.textBox}>
          <div className={style.topBoxes}>
            <span className={style.nameBox}>
              <h2>
                {firstName}&nbsp;{lastName}
              </h2>
              <p>
                {story.graveID}: {graveNumber}
              </p>
            </span>
            <span className={style.dates}>
              <h3>
                {story.born}: <br />
                {born}
              </h3>
              <h3>
                {story.dead}: <br />
                {death}
              </h3>
            </span>
          </div>

          <div>
            {sections.map((section, index) => (
              <div key={index} className={style.section}>
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </div>
            ))}
          </div>
          <div>
            {comments.length > 0 && (
              <div>
                {comments.map((commentss, index) => (
                  <div key={index} className={style.section}>
                    <h3>{commentss.title}</h3>
                    <p>{commentss.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={style.buttonsWrapper}>
          <DeleteButton
            collectionName={props.collectionName}
            cardId={props.cardId}
            onDelete={props.onDelete}
          />
          <EditButton
            imageUrl={props.imageUrl}
            collectionName={props.collectionName}
            cardId={props.cardId}
            firstName={props.firstName}
            lastName={props.lastName}
            born={props.born}
            death={props.death}
            graveId={props.graveNumber}
            sections={props.sections}
            comments={props.comments}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
