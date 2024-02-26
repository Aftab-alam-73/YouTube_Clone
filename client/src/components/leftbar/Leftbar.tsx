import styles from "./leftbar.module.css";
import { HomeIcon,SubscriptionsIcon,SlideshowIcon,VideoLibraryIcon,LogoutIcon} from "../../../data/icons";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useDispatch } from "react-redux";
import { removeUser } from "../../redux/userSlice";
const Leftbar = () => {

  const { id } = useSelector((state: any) => state.user);
  const { mode } = useSelector((state: any) => state.darkMode);
  const Dispatch = useDispatch();
  
  const mutaion = useMutation({
    mutationFn: () => {
      return makeRequest.post("/auth/logout");
    },
    onSuccess: () => {
      Dispatch(removeUser());
    },
  });
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <Link to={"/"} className={styles.Link}>
          <div className={mode ? styles.darkItem : styles.item}>
            <HomeIcon className={styles.icon}/>
            <span className={styles.title}>Home</span>
          </div>
        </Link>
        <div className={mode ? styles.darkItem : styles.item}>
          <SlideshowIcon className={styles.icon}/>
          <span className={styles.title}>Shorts</span>
        </div>
        <Link to={"/subscriptions"} className={styles.Link}>
          <div className={mode ? styles.darkItem : styles.item}>
            <SubscriptionsIcon className={styles.icon}/>
            <span className={styles.title}>Subscriptions</span>
          </div>
        </Link>
        <div className={mode ? styles.darkItem : styles.item}>
          <VideoLibraryIcon className={styles.icon}/>

          <span className={styles.title}>Library</span>
        </div>
        <div className={styles.responsiveLogout}>
        {id != 0 && (
            <div className={mode?styles.darkitem:styles.item} onClick={() => mutaion.mutate()}>
              <LogoutIcon className={styles.icon}/>
              <span>Logout</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
