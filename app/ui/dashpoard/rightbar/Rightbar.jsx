import Image from "next/image";
import styles from "./rightbar.module.css";
import { MdPlayCircleFilled } from "react-icons/md";
const Rightar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image
            src="/astronaut.png"
            alt="astronaut"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.bg}
          />
        </div>
        <div className={styles.text}>
          <span className={styles.notification}>Available Now</span>
          <h3 className={styles.title}>
            How to use the new version of the admin dashboard?
          </h3>
          <span className={styles.subtitle}>Takes 4 minute to learn</span>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            minus, cupiditate qui distinctio voluptatum, modi labore non
            inventore et amet vitae ducimus, hic totam. Quos laboriosam ducimus
            aliquid facere enim!
          </p>
          <button className={styles.button}>
            <MdPlayCircleFilled />
            Watch
          </button>
        </div>
      </div>
      {/* 2 */}
      <div className={styles.item}>
       
        <div className={styles.text}>
          <span className={styles.notification}>Available Now</span>
          <h3 className={styles.title}>
            How to use the new version of the admin dashboard?
          </h3>
          <span className={styles.subtitle}>Takes 4 minute to learn</span>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            minus, cupiditate qui distinctio voluptatum, modi labore non
            inventore et amet vitae ducimus, hic totam. Quos laboriosam ducimus
            aliquid facere enim!
          </p>
          <button className={styles.button}>
            <MdPlayCircleFilled />
            Watch
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rightar;
