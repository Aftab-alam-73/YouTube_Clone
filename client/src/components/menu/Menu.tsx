import styles from "./menu.module.css";
 import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import {ListIcon,HomeIcon,SlowMotionVideoOutlinedIcon,SubscriptionsIcon,VideoLibraryOutlinedIcon,ThumbUpOutlinedIcon,ContentCutOutlinedIcon,WatchLaterOutlinedIcon,SlideshowOutlinedIcon,HistoryOutlinedIcon,WhatshotOutlinedIcon,LocalMallOutlinedIcon,AudiotrackOutlinedIcon,MovieOutlinedIcon,CellTowerOutlinedIcon,SportsEsportsOutlinedIcon,ArticleOutlinedIcon,EmojiEventsOutlinedIcon,LightbulbOutlinedIcon,DryCleaningOutlinedIcon,SettingsOutlinedIcon,FlagOutlinedIcon,HelpOutlineOutlinedIcon,FeedbackOutlinedIcon,NightsStayIcon,Brightness4Icon,LogoutIcon,AccountBoxIcon} from '../../../data/icons'

import { Channel } from "../user/User";
import { useDispatch, useSelector } from "react-redux";
import { darkmode, lightmode } from "../../redux/darkmodeSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { removeUser } from "../../redux/userSlice";

interface ChildProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu = ({ setOpen }: ChildProps) => {
  const { mode } = useSelector((state: any) => state.darkMode);
  const Dispatch = useDispatch();
  const { id } = useSelector((state: any) => state.user);
  const channelQuery = useQuery({
    queryKey: ["channels", id],
    queryFn: async () => {
      return await makeRequest.get("/subscribes/getsubscribedchannels");
    },
  });
  // console.log("channels", channelQuery.data?.data);
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
      <div className={mode ? styles.darkMenu : styles.menu}>
        <div className={mode ? styles.darkTest : styles.test}>
          <div
            className={mode ? styles.darklogoContainer : styles.logoContainer}
          >
            <ListIcon onClick={() => setOpen(false)} className={styles.more} />
            <Link to={"/"} className={styles.link}>
              <div className={styles.logoSubContainer}>
                <img src={Logo} alt="Logo" className={styles.logo} />
                <span className={styles.logoTitle}>YouTube</span>
              </div>
            </Link>
          </div>
        </div>

        <div className={styles.items}>
          <Link to={"/"} className={styles.link}>
            <div className={mode?styles.darkitem:styles.item}>
              <HomeIcon className={styles.icon}/>
              <span>Home</span>
            </div>
          </Link>
          <div className={mode?styles.darkitem:styles.item}>
            <SlowMotionVideoOutlinedIcon className={styles.icon}/>
            <span>Shorts</span>
          </div>
          <Link to={'/subscriptions'} className={styles.link}>
          <div className={mode?styles.darkitem:styles.item}>
            <SubscriptionsIcon className={styles.icon}/>
            <span>Subscriptions</span>
          </div>
          </Link>
          <hr />
          <div className={mode?styles.darkitem:styles.item}>
            <VideoLibraryOutlinedIcon className={styles.icon}/>
            <span>Library</span>
          </div>
          <div className={mode?styles.darkitem:styles.item}>
            <HistoryOutlinedIcon className={styles.icon}/>
            <span>History</span>
          </div>
          <div className={mode?styles.darkitem:styles.item}>
            <SlideshowOutlinedIcon className={styles.icon}/>
            <span>Your videos</span>
          </div>
          <div className={mode?styles.darkitem:styles.item}>
            <WatchLaterOutlinedIcon className={styles.icon}/>
            <span>Watch later</span>
          </div>
          <div className={mode?styles.darkitem:styles.item}>
            <ContentCutOutlinedIcon className={styles.icon}/>
            <span>Your clips</span>
          </div>
          <div className={mode?styles.darkitem:styles.item}>
            <ThumbUpOutlinedIcon className={styles.icon}/>
            <span>Liked videos</span>
          </div>
          {channelQuery.data?.data.length != 0 && id != 0 && (
            <>
              <hr />
              <p>Subscriptions</p>
              <div className={styles.itemsss}>
                {channelQuery.isSuccess &&
                  id != 0 &&
                  channelQuery.data.data.map((channeldata: any) => {
                    return (
                      <Channel
                        setOpen={setOpen}
                        channeldata={channeldata}
                        key={channeldata.id}
                      />
                    );
                  })}
              </div>
            </>
          )}
          <hr />
          <p>Explore</p>
          <div className={mode?styles.darkitem:styles.item}>
            <WhatshotOutlinedIcon className={styles.icon}/>
            <span>Trendig</span>
          </div>
          <div className={mode?styles.darkitem:styles.item}>
            <LocalMallOutlinedIcon className={styles.icon}/>
            <span>Shopping</span>
          </div>
          <div className={mode?styles.darkitem:styles.item}>
            <AudiotrackOutlinedIcon className={styles.icon}/>
            <span>Musics</span>
          </div>
          <div className={mode?styles.darkitem:styles.item}>
            <MovieOutlinedIcon className={styles.icon}/>
            <span>Films</span>
          </div>
          <div className={mode?styles.darkitem:styles.item}>
            <CellTowerOutlinedIcon className={styles.icon}/>
            <span>Live</span>
          </div>
          <div className={mode?styles.darkitem:styles.item}>
            <SportsEsportsOutlinedIcon className={styles.icon}/>
            <span>Gaming</span>
          </div>
          <div className={mode?styles.darkitem:styles.item}>
            <ArticleOutlinedIcon className={styles.icon}/>
            <span>News</span>
          </div>
          <div className={mode?styles.darkitem:styles.item}>
            <EmojiEventsOutlinedIcon className={styles.icon}/>
            <span>Sports</span>
          </div>
          <div className={mode?styles.darkitem:styles.item}>
            <LightbulbOutlinedIcon className={styles.icon}/>
            <span>Learning</span>
          </div>
          <div className={mode?styles.darkitem:styles.item}>
            <DryCleaningOutlinedIcon className={styles.icon}/>
            <span>Fashion & Beauty</span>
          </div>
          <hr />
          <p>More from YouTube</p>
          <div className={mode?styles.darkitem:styles.item}>
            <SettingsOutlinedIcon className={styles.icon}/>
            <span>Settings</span>
          </div>
          {id != 0 && (
            <Link
              to={`/profile/${id}`}
              className={styles.link}
              onClick={() => setOpen(false)}
            >
              <div className={mode?styles.darkitem:styles.item}>
                <AccountBoxIcon className={styles.icon}/>
                <span>Your channel</span>
              </div>
            </Link>
          )}
          <div className={mode?styles.darkitem:styles.item}>
            <FlagOutlinedIcon className={styles.icon}/>
            <span>Report History</span>
          </div>
          <div className={mode?styles.darkitem:styles.item}>
            <HelpOutlineOutlinedIcon className={styles.icon}/>
            <span>Help</span>
          </div>
          <div className={mode?styles.darkitem:styles.item}>
            <FeedbackOutlinedIcon className={styles.icon}/>
            <span>Send feedback</span>
          </div>
          {mode === true ? (
            <div className={mode?styles.darkitem:styles.item} onClick={() => Dispatch(lightmode())}>
              <Brightness4Icon className={styles.icon}/>
              <span>Light mode</span>
            </div>
          ) : (
            <div className={mode?styles.darkitem:styles.item} onClick={() => Dispatch(darkmode())}>
              <NightsStayIcon className={styles.icon}/>
              <span>Dark mode</span>
            </div>
          )}
          {id != 0 && (
            <div className={mode?styles.darkitem:styles.item} onClick={() => mutaion.mutate()}>
              <LogoutIcon className={styles.icon}/>
              <span>Logout</span>
            </div>
          )}
          <hr />
          <div className={styles.info}>
            <h2 className={styles.developer}>Developed by: Aftab Alam</h2>
            <span>Copyright @ 2023</span>
          </div>
        </div>
      </div>
      <div className={styles.blank} onClick={() => setOpen(false)}></div>
    </div>
  );
};

export default Menu;
