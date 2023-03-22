import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../models/FBconfig"; // import your Firebase config file

interface Props {
  collectionName: string;
}

const FirebaseCollectionComponent: React.FC<Props> = (props) => {
  const [collectionData, setCollectionData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const subCollectionRef = collection(db, props.collectionName);
      const data = await getDocs(subCollectionRef);
      setCollectionData(data.docs.map((doc) => doc.data()));
    };
    fetchData();
  }, [props.collectionName]);

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
