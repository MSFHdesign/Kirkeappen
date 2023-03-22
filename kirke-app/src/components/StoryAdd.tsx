import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../models/FBconfig";
import style from "../style/add.module.css"; // import your CSS module

interface Props {
  collectionName: string;
}

const AddPostComponent: React.FC<Props> = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if fields are not empty
    if (!title.trim()) {
      setTitleError("Title is required");
      return;
    }
    if (!content.trim()) {
      setContentError("Content is required");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, props.collectionName), {
        title,
        content,
        timestamp: new Date(),
      });

      console.log("Document written with ID: ", docRef.id);

      // Reset the form inputs and errors
      setTitle("");
      setContent("");
      setTitleError("");
      setContentError("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className={style.addPostContainer}>
      <h2>Add a new post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={style.addPostInput}
          />
          {titleError && <div className={style.error}>{titleError}</div>}
        </label>
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={style.addPostTextArea}
          />
          {contentError && <div className={style.error}>{contentError}</div>}
        </label>
        <button type="submit" className={style.addPostButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPostComponent;
