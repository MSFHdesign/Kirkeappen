import React, { useEffect, useState } from "react";
import { doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../models/FBconfig";
import style from "../style/edit.module.css";
import warning from "../style/warning.module.css";

interface Props {
  collectionName: string;
  cardId: string;
  commentsValue: string;
  titleValue: string;
  onDelete: () => void;
  firstName: string;
  lastName: string;
}

interface Section {
  title: string;
  comment: string;
}

const EditButton2: React.FC<Props> = (props) => {
  const [titleValue, setTitleValue] = useState(props.titleValue);
  const [commentsValue, setCommentsValue] = useState(props.commentsValue);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, props.collectionName, props.cardId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const comments = data?.comments || [];

          // Retrieve the latest comment values from the comments array
          const latestComment = comments[comments.length - 1] || {};

          setTitleValue(latestComment.title || "");
          setCommentsValue(latestComment.comment || "");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [props.collectionName, props.cardId]);

  const handleSaveClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newComment: Section = {
      title: titleValue,
      comment: commentsValue,
    };

    try {
      const docRef = doc(db, props.collectionName, props.cardId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const comments = data?.comments || [];

        const updatedComments = [...comments, newComment];

        const toApproveDocRef = doc(
          db,
          "ToApprove",
          props.collectionName,
          "Comments",
          props.cardId
        );

        await updateDoc(docRef, {
          comments: updatedComments,
        });

        props.onDelete(); // Call the onDelete function to update the parent component's state
      }
    } catch (error) {
      console.error("Error updating card: ", error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      const toApproveDocRef = doc(
        db,
        "ToApprove",
        props.collectionName,
        "Comments",
        props.cardId
      );

      await deleteDoc(toApproveDocRef); // Delete the comment

      props.onDelete(); // Call the onDelete function to update the parent component's state
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSaveClick}>
        <p>
          Denne historie er skrevet til {props.firstName + " "}
          {props.lastName}
        </p>
        <label>Titel:</label>
        <span className={style.sectionBoxComment}>
          <input
            type="text"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />
        </span>
        <label>Historie:</label>
        <textarea
          value={commentsValue}
          onChange={(e) => setCommentsValue(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <button className={style.editButton} type="submit">
            Godkend
          </button>
          <button
            className={warning["delete-button"]}
            type="button"
            onClick={handleDeleteClick}
          >
            Slet
          </button>
        </div>
      </form>
    </>
  );
};

export default EditButton2;
