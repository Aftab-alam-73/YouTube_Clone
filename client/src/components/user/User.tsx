import { Link } from 'react-router-dom';
import styles from './user.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
const User = () => {
  return (
    <div className={styles.container}>
      <AccountCircleIcon />
      <span>SignIn</span>
    </div>
  )
}

export default User
export interface channel{
  id:Number;
  username:string;
  profile:string;
}
export const Channel=({channeldata,setOpen}:any)=>{
  const {mode}=useSelector((state:any)=>state.darkMode)
  return <Link className={mode?styles.darkchannelContainer:styles.chnnelContainer} to={`/profile/${channeldata.id}`} onClick={() => setOpen(false)}>
    {channeldata.profile==null?<AccountCircleIcon style={{fontSize:"35px"}}/>:<img src={channeldata.profile} alt='img' className={styles.img}/>}
    <span>{channeldata.username}</span>
  </Link>
}