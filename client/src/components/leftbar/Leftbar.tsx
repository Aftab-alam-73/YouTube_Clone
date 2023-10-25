import styles from "./leftbar.module.css";
import HomeIcon from "@mui/icons-material/Home";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Leftbar = () => {
  const { mode } = useSelector((state: any) => state.darkMode);
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <Link to={"/"} className={styles.Link}>
          <div className={mode ? styles.darkItem : styles.item}>
            <HomeIcon />
            <span className={styles.title}>Home</span>
          </div>
        </Link>
        <div className={mode ? styles.darkItem : styles.item}>
          <SlideshowIcon />
          <span className={styles.title}>Shorts</span>
        </div>
        <Link to={"/subscriptions"} className={styles.Link}>
          <div className={mode ? styles.darkItem : styles.item}>
            <SubscriptionsIcon />
            <span className={styles.title}>Subscriptions</span>
          </div>
        </Link>
        <div className={mode ? styles.darkItem : styles.item}>
          <VideoLibraryIcon />

          <span className={styles.title}>Library</span>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
