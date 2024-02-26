import styles from './card.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment'
import { Link } from 'react-router-dom'
import { makeRequest } from '../../axios';
const Card = ({video}:any) => {
  const viewQuery=useQuery({
    queryKey:["views",video.id],
    queryFn:async()=>{
      return await makeRequest.get(`/views/getview/${video.id}`);
    }
  })

 
  return (
    <div>
      <Link to={`/video/${video.id}`} className={styles.link}>
    <div className={styles.container} >
     <img src={video.imgUrl} alt="thumbnail"  className={styles.img}/>
     <div className={styles.channelInfo}>
      {video?.user?.profile===null?<AccountCircleIcon style={{fontSize:"35px"}}/>:<img src={video?.user?.profile} alt="Channel Image" className={styles.channelImg} />}
      <span className={styles.videoTitle}>{video.title} </span>
     </div>
     <div className={styles.videoInfo}>
      <span className={styles.channelName}>{video.user?.username}</span>
     <span>{viewQuery.isSuccess?viewQuery.data?.data.length:0} views. {moment(video.createdAt).fromNow()} </span>
     </div>
     </div>
     </Link>
    </div>
  )
}

export default Card
