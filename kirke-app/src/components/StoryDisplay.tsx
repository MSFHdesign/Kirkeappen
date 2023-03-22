import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../models/FBconfig";
import EditButton from "./EditButton";

interface Props {
  collectionName: string;
  cardId?: string;
}

const FirebaseCollectionComponent: React.FC<Props> = (props) => {
  const [collectionData, setCollectionData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const subCollectionRef = collection(db, props.collectionName);
      const data = await getDocs(subCollectionRef);
      setCollectionData(
        data.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        })
      );
    };
    fetchData();
  }, [props.collectionName]);

  const filteredCollectionData = props.cardId
    ? collectionData.filter((item) => item.id === props.cardId)
    : collectionData;

  return (
    <div>
      {filteredCollectionData.map((item, index) => (
        <div key={index}>
          <h2>{item.title}</h2>
          <p>{item.content}</p>
          <EditButton collectionName={props.collectionName} cardId={item.id} />
        </div>
      ))}
    </div>
  );
};

export default FirebaseCollectionComponent;
