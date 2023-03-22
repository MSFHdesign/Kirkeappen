import React, { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../models/FBconfig";
import style from "../style/warning.module.css";

interface Props {
  collectionName: string;
  cardId: string;
  onDelete?: () => void;
}

const DeleteButton: React.FC<Props> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <div>
          <h3>Are you sure you want to delete this card?</h3>
          <button onClick={handleDeleteConfirmed}>Yes</button>
          <button onClick={handleModalClose}>No</button>
        </div>
      ) : (
        <button onClick={handleDeleteClick}>Delete</button>
      )}
    </div>
  );
};

export default DeleteButton;
