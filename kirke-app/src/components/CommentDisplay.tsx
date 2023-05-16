import React, { useEffect, useState } from "react";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "../models/FBconfig";
// components

import style from "../style/display.module.css";
import Skeletor from "./Skeleton";
// Costum Hooks
import { useLanguage } from "../components/LanguageContext";
import Navigationsbar from "./navigationbar";
import EditButton2 from "./UpdateCommentsButton";

// add sorting compontent

interface Props {
  collectionName: string;
  cardId?: string;
}

const DisplayComment: React.FC<Props> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [collectionData, setCollectionData] = useState<any[]>([]);
  //   const [collectionIndex, setCollectionIndex] = useState<any[]>([]);
  const [filteredCollectionData, setFilteredCollectionData] = useState<any[]>(
    []
  );
  // sorting
  const [visibleCount, setVisibleCount] = useState(5); // number of visible items
  const [selectValue, setSelectValue] = useState("5");

  // Text
  const { locale } = useLanguage();
  const story = locale.story;

  useEffect(() => {
    const subCollectionRef = collection(
      db,
      "ToApprove",
      props.collectionName,
      "Comments"
    );
    console.log(subCollectionRef);

    const unsubscribe = onSnapshot(subCollectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setCollectionData(data);
      setFilteredCollectionData(data); // set filtered data to initial data
      setIsLoading(false); // set isLoading to false when data is fetched
    });

    return () => unsubscribe();
  }, [props.collectionName]);

  //   useEffect(() => {
  //     const getCollectionIndex = collection(db, props.collectionName);

  //     const unsubscribe = onSnapshot(getCollectionIndex, (snapshot) => {
  //       const data = snapshot.docs.map((doc) => {
  //         return {
  //           ...doc.data(),
  //           id: doc.id,
  //         };
  //       });
  //       console.log(getCollectionIndex, hej);
  //       const q = query(
  //         getCollectionIndex,
  //         where("id", "==", "9ZebYQHOb9u65X6Z9DzR")
  //       );
  //       console.log(q, "med");
  //       setCollectionIndex(data);
  //     });

  //     return () => unsubscribe();
  //   }, [props.collectionName]);

  const handleCardDelete = (cardId: string) => {
    const updatedCollectionData = collectionData.filter(
      (item) => item.id !== cardId
    );
    setCollectionData(updatedCollectionData);
    setFilteredCollectionData(updatedCollectionData); // update filtered data when item is deleted
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + parseInt(selectValue, 10));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
    setVisibleCount(parseInt(e.target.value, 10));
  };
  const sortFunction = (data: any[]) => {
    return data;
  };

  return (
    <div>
      <Navigationsbar />
      <div className={style.selectWrapper}>
        <div className={style.selctionBar}>
          <label>{story.numberToShow} </label>
          <select
            className={style.value}
            value={selectValue}
            onChange={handleSelectChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <div className={style.selctionBar}>
            <label>{story.sort.sortBy}</label>

            <div className={style.buttons}></div>
          </div>
        </div>
      </div>
      <div className={style.collectionWrapper}>
        {isLoading ? (
          <Skeletor index={3} />
        ) : filteredCollectionData.length === 0 ? (
          <div>{story.error.show}</div>
        ) : (
          <>
            {sortFunction(filteredCollectionData)
              .slice(0, visibleCount)
              .map((item, index) => (
                <div key={index} className={style.cardWrapper}>
                  {item.comment}
                  <EditButton2
                    collectionName={props.collectionName}
                    cardId={item.storyID}
                    commentsValue={item.comment}
                    titleValue={item.title}
                  />
                </div>
              ))}

            {filteredCollectionData.length > visibleCount ? (
              <button
                className={style.loadMoreStories}
                onClick={handleShowMore}
              >
                {story.card.showMore.replace("{0}", String(visibleCount))}
              </button>
            ) : (
              <div className={style.loadMoreStories}>{story.card.showEnd}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DisplayComment;
