import styles from "./comments.module.css";
import SortIcon from "@mui/icons-material/Sort";
import profile from "../../assets/profile.gif";
import Comment from "../comment/Comment";
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import {useState} from 'react'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Comments = () => {
    const queryClient=useQueryClient();
    const {videoId}=useSelector((state:any) => state.video)
    const {mode}=useSelector((state:any) => state.darkMode)
    const {id}=useSelector((state:any) => state.user)
    const [comment,setComment]=useState<any>("")
    const [onfocus,setFocus]=useState<Boolean>(false)
    
    const {data,isError,isLoading}=useQuery({
      queryKey:["comments",videoId],
      queryFn:async()=>{
          return await makeRequest.get(`/comments/getcomment/${videoId}`)
      }
    })

    const commentMutation=useMutation({
      mutationFn:async(state:any)=>{
         return await makeRequest.post('/comments/addcomment',state);
      },
      onSuccess:(data)=>{
       
         queryClient.invalidateQueries(["comments",videoId]);
         if(data.data.success){
           setComment("");

         }
      }
    })
    const handleComment=(e:any)=>{
      e.preventDefault();
      if(id===0){
        return toast("Please SignIn to comment");
      }
      else if(comment=="")return;
      commentMutation.mutate({description:comment,userId:id,videoId:videoId})
    }
    
  return (
    <div className={styles.container}>
        <div className={styles.sortoption}>
      <span className={styles.commentTitle}>{data?.data.length} comments</span>
      <div className={styles.options} title="Sort comments">
        <SortIcon />
        Sort by
      </div>
    </div>
      <div className={styles.addCommentContainer}>
        <img src={profile} alt="profile" className={styles.img} />
        <input
          type="text"
          placeholder="Add a commment..."
          className={mode?styles.darkInput:styles.input}
          onChange={(e)=>setComment(e.target.value)}
          onFocus={()=>setFocus(true)}
          value={comment}
        />
      </div>
    
      {

     onfocus && <div className={styles.addBtn}>
        <EmojiEmotionsOutlinedIcon className={styles.emogi} />
      
        <div className={styles.butContainer}>
            <button className={styles.btn1} onClick={()=>setFocus(false)}>Cancel</button>
            <button className={comment!="" ?styles.blueBtn:styles.btn2}
            onClick={handleComment}
            >Comment</button>

        </div>
      </div>
      }
      <div className={styles.comments}>
        {
          isError?<span>Something went wrong!</span>:isLoading?<span>Loading comments...</span>:data.data.map((comment:any)=>{
                     return <Comment key={comment.id} comment={comment} />

          })
        }
        
       
      </div>
    </div>
  );
};

export default Comments;
