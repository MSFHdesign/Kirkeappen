import style from "../style/styleSkeletor.module.css";

const Skeletor: React.FC = (props) => {
  return (
    <div className={style.skeletonWrapper}>
      <div className={style.imgSkeleton} />
      <div className={style.contentWrapper}>
        <div className={style.topBoxes}>
          <div className={style.nameSkeleton} />

          <div className={style.dodSkeleton} />
        </div>
        <div className={style.midBox}>
          <div className={style.contentSkeleton}>
            <span></span>
          </div>
        </div>
        <div className={style.bottomBoxes}>
          <div className={style.btnSkeleton} />
          <div className={style.btnSkeleton} />
        </div>
      </div>
    </div>
  );
};

export default Skeletor;
