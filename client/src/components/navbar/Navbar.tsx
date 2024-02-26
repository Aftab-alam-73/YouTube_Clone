import styles from './navbar.module.css';
import logo from '../../assets/logo.png';
import Menu from '../menu/Menu';
import { SearchIcon,KeyboardVoiceSharpIcon,VideoCallSharpIcon,NotificationsSharpIcon,AccountCircleIcon,ListIcon } from '../../../data/icons';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import User from '../user/User';
import { addSearchInput } from '../../redux/darkmodeSlice';
import { useDispatch, useSelector } from 'react-redux'

const Navbar = () => {
const {id,username,profile}= useSelector((state: any) => state.user)

  const [open,setOpen]=useState<boolean>(false);
  const Dispath=useDispatch()
  const {mode}=useSelector((state:any) => state.darkMode)
  
  return (
    <div className={styles.container}>
      {open && <Menu setOpen={setOpen} />}
      {/* Left Container */}
      <div className={styles.leftContainer}>
          
        <span className={styles.moreContainer}>
       <ListIcon className={styles.more} onClick={()=>setOpen(!open)} />
        </span>
       <Link to='/' className={styles.link}>
       <div className={styles.logoContainer}>
       <img src={logo} alt="Youtube Logo" className={styles.logo}/>
       <span className={styles.logoTitle}>YouTube</span>
       </div>
       </Link>
      </div>
      {/* Middle Container */}
      <div className={styles.middleContainer}>
        <div className={styles.searchContainer}>
         <div className={styles.search}>
            <input type="text" onChange={(e:any)=>Dispath(addSearchInput({searchInput:e.target.value}))} placeholder='Search...' className={mode? styles.darkInput:styles.input}/>
         </div>
         <button className={mode?styles.darkSearchBtn:styles.searchBtn} title='Search' ><SearchIcon className={styles.searchIcon}/></button>
        </div>
        <div className={mode?styles.darkMike:styles.mike}>
         <KeyboardVoiceSharpIcon className={styles.mikeIcon}/>
        </div>
      </div>
      {/* Right Container */}
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
