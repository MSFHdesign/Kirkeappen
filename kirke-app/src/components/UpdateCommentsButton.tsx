import React, { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../models/FBconfig";
import style from "../style/edit.module.css";

interface Props {
  [x: string]: any;
  collectionName: string;
  cardId: string;
  commentsValue: string;
  titleValue: string;
}
interface Section {
  title: string;
  comment: string;
}

const EditButton2: React.FC<Props> = (props) => {
  const [updatedComments, setUpdatedComments] = useState<Section[]>([]);
  const [commentsValue, setCommentsValue] = useState(props.commentsValue);
  const [titleValue, setTitleValue] = useState(props.titleValue);

  const addComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUpdatedComments([
      ...updatedComments,
      { title: titleValue, comment: commentsValue },
    ]);
  };

  // useEffect(() => {
  //   setUpdatedComments(props.comments);
  // }, [props.comments]);

  const handleSaveClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUpdatedComments([
      ...updatedComments,
      { title: titleValue, comment: commentsValue },
    ]);
    console.log(setUpdatedComments);

    try {
      const docRef = doc(db, props.collectionName, props.cardId);

      await updateDoc(docRef, {
        comments: updatedComments,
      });
    } catch (e) {
      console.error("Error updating card: ", e);
    }
  };
  console.log(updatedComments, 2);
  return (
    <>
      <form onSubmit={handleSaveClick}>
        <span className={style.sectionBox}>
          <input
            type="text"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />
        </span>
        <textarea
          value={commentsValue}
          onChange={(e) => setCommentsValue(e.target.value)}
        />
        <button>godkend</button>
      </form>
    </>
  );
};
export default EditButton2;
