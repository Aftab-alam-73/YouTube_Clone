import styles from './comment.module.css'
import moment from 'moment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

const Comment = ({comment}:any) => {
  const queryClient=useQueryClient()
  const {id}=useSelector((state:any) => state.user)
  const deleteMutation=useMutation({
  mutationFn:async(state:any) =>{
    return await makeRequest.delete(`/comments/removecomment?id=${state.id}`)
  },
  onSuccess:()=>{
        queryClient.invalidateQueries(["comments"])
  }
 })
 const handledelete=(e:any)=>{
  e.preventDefault();
  deleteMutation.mutate({id:comment.id})
 }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
      {comment?.user?.profile===null?<AccountCircleIcon style={{fontSize:"40px"}}/>: <img src={comment.user.profile} alt="profile" className={styles.img} />}
      </div>
      <div className={styles.right}>
        <div className={styles.first}>
         <span className={styles.name}>{comment?.user?.username}</span>
         <span className={styles.time}>{moment(comment.createdAt).fromNow()} </span>
        {id==comment.userId && <button className={styles.delete} onClick={handledelete}>delete</button>}
        </div>
        <div className={styles.desc}>
         {comment.description}
        </div>
       
      </div>
    </div>
  )
}

export default Comment
