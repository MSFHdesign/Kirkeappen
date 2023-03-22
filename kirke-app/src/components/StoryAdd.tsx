import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../models/FBconfig"; // import your Firebase config file

interface Props {
  collectionName: string;
}

const AddPostComponent: React.FC<Props> = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, props.collectionName), {
        title,
        content,
        timestamp: new Date(),
      });

      console.log("Document written with ID: ", docRef.id);

      // Reset the form inputs
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      <h2>Add a new post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPostComponent;
