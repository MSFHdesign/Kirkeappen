import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../models/FBconfig";

interface Props {
  collectionName: string;
  cardId: string;
}

const EditButton: React.FC<Props> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
    setNewTitle("");
    setNewContent("");
  };

  const handleSaveClick = async () => {
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
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <br />
          <textarea
            placeholder="Content"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <br />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
    </div>
  );
};

export default EditButton;
