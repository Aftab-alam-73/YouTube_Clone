import styles from './navbar.module.css';
import Menu from '../menu/Menu';
import ListIcon from '@mui/icons-material/List';
import logo from '../../assets/logo.png';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceSharpIcon from '@mui/icons-material/KeyboardVoiceSharp';
import VideoCallSharpIcon from '@mui/icons-material/VideoCallSharp';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import User from '../user/User';
import { useSelector } from 'react-redux'

const Navbar = () => {
const {id,username,profile}= useSelector((state: any) => state.user)

  const [open,setOpen]=useState<boolean>(false);
  const {mode}=useSelector((state:any) => state.darkMode)
 
  return (
    <div className={styles.container}>
      {open && <Menu setOpen={setOpen} />}
      <div className={styles.leftContainer}>
       <ListIcon className={styles.more} onClick={()=>setOpen(!open)} />
       <Link to='/' className={styles.link}>
       <div className={styles.logoContainer}>
       <img src={logo} alt="Youtube Logo" className={styles.logo}/>
       <span className={styles.logoTitle}>YouTube</span>
       </div>
       </Link>
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.searchContainer}>
         <div className={styles.search}>
            <input type="text"  placeholder='Search...' className={mode? styles.darkInput:styles.input}/>
         </div>
         <button className={mode?styles.darkSearchBtn:styles.searchBtn} title='Search'><SearchIcon/></button>
        </div>
        <div className={mode?styles.darkMike:styles.mike}>
         <KeyboardVoiceSharpIcon/>
        </div>
      </div>
      <div className={styles.rightContainer}>
        {id!=0 && <Link to={'/upload'} className={styles.link}>
       <div className={mode?styles.darkUpload:styles.upload}title='Upload a video'>
       <VideoCallSharpIcon/>
       </div>
        </Link>}
       <div className={mode?styles.darkNotification:styles.notifications} title='Notifications'>
       <NotificationsSharpIcon />
       <span className={styles.numberOfNotifications}>9</span>
       </div>
       {
        id==0?(<Link to={'/signin'} className={styles.link}>
        <User/>
        </Link>):( <div className={styles.users}>
      {profile!=null? (<img src={profile} alt="" className={styles.img}/>):(<AccountCircleIcon style={{fontSize:"35px"}}/>)}
       <span className={styles.username}>{username}</span>
       </div>)
      
       }
      </div>
    </div>
  )
}

export default Navbar
