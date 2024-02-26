import moment from 'moment'
import styles from './suggession.module.css'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { makeRequest } from '../../axios'
const SuggessionCard = ({suggession}:any) => {
  const viewQuery=useQuery({
    queryKey:["views",suggession.id],
    queryFn:async()=>{
      return await makeRequest.get(`/views/getview/${suggession.id}`)
    }
   })
  return (
    <Link to={`/video/${suggession.id}`} className={styles.link}>
    <div className={styles.container}>
      <div className={styles.left}>
      <img src={suggession.imgUrl} alt="Thubnail" className={styles.img}/>
      </div>
      <div className={styles.right}>
       <span className={styles.title}>{suggession?.title}...</span>
       <span className={styles.channelName}>{suggession?.user.username}</span>
       <span className={styles.time}>{viewQuery.isSuccess ? viewQuery.data.data.length:0} views .{moment(suggession.createdAt).fromNow()}</span>
      </div>
    </div>
    </Link>
  )
}

export default SuggessionCard
