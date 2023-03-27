import style from "../style/styleSkeletor.module.css";

interface Props {
  index: number;
}

const Skeletor: React.FC<Props> = ({ index }) => {
  const skeletons = [];

  for (let i = 0; i < index; i++) {
    skeletons.push(
      <div className={style.skeletonWrapper} key={i}>
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
  }

  return <>{skeletons}</>;
};

export default Skeletor;
