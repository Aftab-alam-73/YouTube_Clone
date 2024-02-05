import styles from "./menu.module.css";
import ListIcon from "@mui/icons-material/List";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SlowMotionVideoOutlinedIcon from "@mui/icons-material/SlowMotionVideoOutlined";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ContentCutOutlinedIcon from "@mui/icons-material/ContentCutOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import AudiotrackOutlinedIcon from "@mui/icons-material/AudiotrackOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import CellTowerOutlinedIcon from "@mui/icons-material/CellTowerOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import DryCleaningOutlinedIcon from "@mui/icons-material/DryCleaningOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Channel } from "../user/User";
import { useDispatch, useSelector } from "react-redux";

interface ChildProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
import { darkmode, lightmode } from "../../redux/darkmodeSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { removeUser } from "../../redux/userSlice";
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
      <div className={mode ? styles.darkContainer : styles.menu}>
        <div className={mode ? styles.darkTest : styles.test}>
          <div
            className={mode ? styles.darklogoContainer : styles.logoContainer}
          >
            <ListIcon onClick={() => setOpen(false)} className={styles.more} />
            <Link to={"/"} className={styles.link}>
              <div className={styles.logoSubContainer}>
                <img src={Logo} alt="Logo" className={styles.logo} />
                <span className={styles.logo}>YouTube</span>
              </div>
            </Link>
          </div>
        </div>

        <div className={styles.items}>
          <Link to={"/"} className={styles.link}>
            <div className={mode ? styles.darkitem : styles.item}>
              <HomeIcon />
              <span>Home</span>
            </div>
          </Link>
          <div className={mode ? styles.darkitem : styles.item}>
            <SlowMotionVideoOutlinedIcon />
            <span>Shorts</span>
          </div>
          <Link to={'/subscriptions'} className={styles.link}>
            <div className={mode ? styles.darkitem : styles.item}>
              <SubscriptionsIcon />
              <span>Subscriptions</span>
            </div>
          </Link>
          <hr />
          <div className={mode ? styles.darkitem : styles.item}>
            <VideoLibraryOutlinedIcon />
            <span>Library</span>
          </div>
          <div className={mode ? styles.darkitem : styles.item}>
            <HistoryOutlinedIcon />
            <span>History</span>
          </div>
          <div className={mode ? styles.darkitem : styles.item}>
            <SlideshowOutlinedIcon />
            <span>Your videos</span>
          </div>
          <div className={mode ? styles.darkitem : styles.item}>
            <WatchLaterOutlinedIcon />
            <span>Watch later</span>
          </div>
          <div className={mode ? styles.darkitem : styles.item}>
            <ContentCutOutlinedIcon />
            <span>Your clips</span>
          </div>
          <div className={mode ? styles.darkitem : styles.item}>
            <ThumbUpOutlinedIcon />
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
          <div className={mode ? styles.darkitem : styles.item}>
            <WhatshotOutlinedIcon />
            <span>Trendig</span>
          </div>
          <div className={mode ? styles.darkitem : styles.item}>
            <LocalMallOutlinedIcon />
            <span>Shopping</span>
          </div>
          <div className={mode ? styles.darkitem : styles.item}>
            <AudiotrackOutlinedIcon />
            <span>Musics</span>
          </div>
          <div className={mode ? styles.darkitem : styles.item}>
            <MovieOutlinedIcon />
            <span>Films</span>
          </div>
          <div className={mode ? styles.darkitem : styles.item}>
            <CellTowerOutlinedIcon />
            <span>Live</span>
          </div>
          <div className={mode ? styles.darkitem : styles.item}>
            <SportsEsportsOutlinedIcon />
            <span>Gaming</span>
          </div>
          <div className={mode ? styles.darkitem : styles.item}>
            <ArticleOutlinedIcon />
            <span>News</span>
          </div>
          <div className={mode ? styles.darkitem : styles.item}>
            <EmojiEventsOutlinedIcon />
            <span>Sports</span>
          </div>
          <div className={mode ? styles.darkitem : styles.item}>
            <LightbulbOutlinedIcon />
            <span>Learning</span>
          </div>
          <div className={mode ? styles.darkitem : styles.item}>
            <DryCleaningOutlinedIcon />
            <span>Fashion & Beauty</span>
          </div>
          <hr />
          <p>More from YouTube</p>
          <div className={mode ? styles.darkitem : styles.item}>
            <SettingsOutlinedIcon />
            <span>Settings</span>
          </div>
          {id != 0 && (
            <Link
              to={`/profile/${id}`}
              className={styles.link}
              onClick={() => setOpen(false)}
            >
              <div className={mode ? styles.darkitem : styles.item}>
                <AccountBoxIcon />
                <span>Your channel</span>
              </div>
            </Link>
          )}
          <div className={mode ? styles.darkitem : styles.item}>
            <FlagOutlinedIcon />
            <span>Report History</span>
          </div>
          <div className={mode ? styles.darkitem : styles.item}>
            <HelpOutlineOutlinedIcon />
            <span>Help</span>
          </div>
          <div className={mode ? styles.darkitem : styles.item}>
            <FeedbackOutlinedIcon />
            <span>Send feedback</span>
          </div>
          {mode === true ? (
            <div className={mode ? styles.darkitem : styles.item} onClick={() => Dispatch(lightmode())}>
              <Brightness4Icon />
              <span>Light mode</span>
            </div>
          ) : (
            <div className={mode ? styles.darkitem : styles.item} onClick={() => Dispatch(darkmode())}>
              <NightsStayIcon />
              <span>Dark mode</span>
            </div>
          )}
          {id != 0 && (
            <div className={mode ? styles.darkitem : styles.item} onClick={() => mutaion.mutate()}>
              <LogoutIcon />
              <span>Logout</span>
            </div>
          )}
          <hr />
          <div className={styles.info}>
            <h2 className={styles.developer}>Developed by: Er Aftab Alam</h2>
            <span>Copyright @ 2023</span>
          </div>
        </div>
      </div>
      <div className={styles.blank} onClick={() => setOpen(false)}></div>
    </div>
  );
};

export default Menu;
