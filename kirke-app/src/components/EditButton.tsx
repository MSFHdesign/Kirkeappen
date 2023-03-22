import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../models/FBconfig";
import style from "../style/edit.module.css";

interface Props {
  collectionName: string;
  cardId: string;
  firstName: string;
  lastName: string;
  born: string;
  death: string;
  graveId: string;
  sections: {
    title: string;
    description: string;
  }[];
}

const EditButton: React.FC<Props> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newFirstName, setNewFirstName] = useState(props.firstName);
  const [newLastName, setNewLastName] = useState(props.lastName);
  const [newBorn, setNewBorn] = useState(props.born);
  const [newDeath, setNewDeath] = useState(props.death);
  const [newGraveId, setNewGraveId] = useState(props.graveId);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const docRef = doc(db, props.collectionName, props.cardId);

      await updateDoc(docRef, {
        firstName: newFirstName,
        lastName: newLastName,
        born: newBorn,
        death: newDeath,
        graveId: newGraveId,
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
        <label>Name</label>
        <input
          type="text"
          placeholder="Title"
          value={newFirstName}
          onChange={(e) => setNewFirstName(e.target.value)}
        />
        <label>Last Name</label>
        <input
          type="text"
          placeholder="Last Name"
          value={newLastName}
          onChange={(e) => setNewLastName(e.target.value)}
        />
        <label>Born</label>
        <input
          type="text"
          placeholder="Born"
          value={newBorn}
          onChange={(e) => setNewBorn(e.target.value)}
        />
        <label>Death</label>
        <input
          type="text"
          placeholder="Death"
          value={newDeath}
          onChange={(e) => setNewDeath(e.target.value)}
        />
        <label>Grave ID</label>
        <input
          type="text"
          placeholder="Grave ID"
          value={newGraveId}
          onChange={(e) => setNewGraveId(e.target.value)}
        />
        {props.sections.map((section, index) => (
          <div key={index}>
            <label>{section.title}</label>
            <input
              type="text"
              placeholder={section.description}
              value={section.description}
              onChange={(e) => {
                const newSections = [...props.sections];
                newSections[index] = {
                  title: section.title,
                  description: e.target.value,
                };
                props.setSections(newSections);
              }}
            />
          </div>
        ))}
        <button type="submit">Save</button>
      </form>
    ) : (
      <button className={style["edit-button"]} onClick={handleEditClick}>
        Edit
      </button>
    )}
  </div>
);


export default EditButton;
