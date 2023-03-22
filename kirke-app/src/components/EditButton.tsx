import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../models/FBconfig";
import style from "../style/edit.module.css";

interface Props {
  collectionName: string;
  cardId: string;
  title: string;
  content: string;
}

const EditButton: React.FC<Props> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(props.title);
  const [newContent, setNewContent] = useState(props.content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const docRef = doc(db, props.collectionName, props.cardId);

      await updateDoc(docRef, {
        title: newTitle,
        content: newContent,
      });
      setIsEditing(false);
    } catch (e) {
      console.error("Error updating card: ", e);
    }
  };

  return (
    <div className={style["edit-container"]}>
      {isEditing ? (
        <form
          className={style["edit-form"]}
          onSubmit={(event) => handleSaveClick(event)}
        >
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <button className={style["edit-button"]} onClick={handleEditClick}>
          Edit
        </button>
      )}
    </div>
  );
};

export default EditButton;
