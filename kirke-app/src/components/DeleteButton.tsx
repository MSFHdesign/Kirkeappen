import React, { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../models/FBconfig";
import style from "../style/warning.module.css";
import { useLanguage } from "../components/LanguageContext";

interface Props {
  collectionName: string;
  cardId: string;
  onDelete?: () => void;
}

const DeleteButton: React.FC<Props> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Text
  const { locale } = useLanguage();
  const story = locale.story;

  const handleDeleteClick = async () => {
    setIsModalOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const docRef = doc(db, props.collectionName, props.cardId);
      await deleteDoc(docRef);
      setIsModalOpen(false);
      if (props.onDelete) {
        props.onDelete();
      }
    } catch (e) {
      console.error("Error deleting card: ", e);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen ? (
        <div className={style["warning-modal"]}>
          <div className={style["warning-modal-content"]}>
            <h3>{story.error.delete.title}</h3>
            <p> {story.error.delete.description}</p>
            <button
              className={`${style["yes-button"]} ${style["warning-modal-content"]}`}
              onClick={handleDeleteConfirmed}
            >
              {story.error.delete.confirm}
            </button>
            <button
              className={`${style["no-button"]} ${style["warning-modal-content"]}`}
              onClick={handleModalClose}
            >
              {story.error.delete.reject}
            </button>
          </div>
        </div>
      ) : (
        <button className={style["delete-button"]} onClick={handleDeleteClick}>
          {story.deleteBtn}
        </button>
      )}
    </div>
  );
};

export default DeleteButton;
