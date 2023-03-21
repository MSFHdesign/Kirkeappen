import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../models/FBconfig"; // import your Firebase config file

interface Props {
  collectionName: string;
  subCollectionName: string; // new prop to target sub-collection
}

const FirebaseCollectionComponent: React.FC<Props> = (props) => {
  const [collectionData, setCollectionData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // query the sub-collection within the "Historier" collection
      const parentDoc = await getDoc(
        doc(db, props.collectionName, "parentDocId")
      );
      const data = await getDocs(
        query(
          collection(parentDoc.ref, props.subCollectionName),
          where("someField", "==", "someValue")
        )
      );
      setCollectionData(data.docs.map((doc) => doc.data()));
    };
    fetchData();
  }, [props.collectionName, props.subCollectionName]);

  return (
    <div>
      {collectionData.map((item, index) => (
        <div key={index}>
          <h2>{item.title}</h2>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default FirebaseCollectionComponent;
