import styles from "./video.module.css";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShareIcon from '@mui/icons-material/Share';
import Comments from "../../components/comments/Comments";
import SuggessionCard from "../../components/suggessionCard/SuggessionCard";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { addVideo } from "../../redux/videoSlice";
import { useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
const Video = () => {
  const queryClient=useQueryClient();
  const Dispatch=useDispatch();
  const {userId}=useSelector((state:any) => state.video);
  const {id}=useSelector((state:any) => state.user);
  const {videoId}=useParams()
  //  FETCHING A SINGLE VIDEOS
  const {data,isLoading,isError,isSuccess ,isFetched}=useQuery({
    queryKey:["video",videoId],
    queryFn:async()=>{
      return await makeRequest.get(`/video/getvideo/${videoId}`)
    }
  })
  // console.log("single video: " ,data?.data)
  useEffect(() => {
    if (isSuccess && isFetched && data?.data) {
     
      Dispatch(addVideo(data.data));
    }
    const handleview=()=>{
      if(id===0){
        return;
       }else if(viewQuery.isSuccess && !viewQuery.data?.data.includes(id)){
         viewMutation.mutate({userId:id,videoId:Number(videoId)})
       }
     }
     setTimeout(handleview, 5000)
  }, [isSuccess, isFetched, data]);
  //----------------------------------------------------------------
  // HANDLING LIKE AND DISLIKES VIDEO.
   const likeQuery=useQuery({
     queryKey:["likes",videoId],
     queryFn:async()=>{
       return await makeRequest.get(`/likes/getlikes/${videoId}`)
     }
   })

   const likeMutation=useMutation({
    mutationFn: async(state:LikeType) => {
      return state.action==="like"?await makeRequest.post('/likes/like',state.data):
     await makeRequest.delete(`/likes/dislike?userId=${state.data.userId}&videoId=${state.data.videoId}`);
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["likes"])
    },
    onError:()=>{
      console.log("Something went wrong in like and dislike request")
    }
   })
const handleLike=(e:any)=>{
  e.preventDefault();
  if(id===0) 
  {
   return toast("Please SingIn to like a video")
  }
  likeMutation.mutate({action:likeQuery.data?.data.includes(id)?"dislike":"like",data:{userId:Number(id),videoId:Number(videoId)}},)
}
const handleDislike=(e:any) => {
   e.preventDefault();
   
    if (likeQuery.data?.data.includes(id)) {
      likeMutation.mutate({
        action: "dislike",
        data: { userId: id, videoId: Number(videoId) },
      });
    
  };
}
 //----------------------------------------------------------------
 // HANDLING SUBSCRIBE AND UNSUBSCRIBE.

  const subsMutation=useMutation({
    mutationFn:async(state:any)=>{
    return  state.action==="subscribe"?await makeRequest.post('/subscribes/subscribe',state.data):await makeRequest.delete(`/subscribes/unsubscribe?subscriberId=${state.data.subscriberId}&&channelId=${state.data.channelId}`);
      
    },
    onSuccess:()=>{
       queryClient.invalidateQueries(["subscribers",userId])
       

    },
    onError:()=>{
      console.log("Something went wrong in subscribe or unsubscribe request");
      toast("Something went wrong in subscribe or unsubscribe request")
    }
  })
  const handleSubscribe=(e:any) => {
     e.preventDefault();
     if(id==0){
      toast("Please singin to subscribe")
     }
     else if(id===userId){
       toast("You can not subscribe your own channel");
     }else{
       subsMutation.mutate({action:subscribersQuery.data?.data.includes(id)?"unsubscribe":"subscribe",data:{subscriberId:id,channelId:userId}})
     }
  }

  //-----------------------------------------------------------------
  // FETCHING TOTAL NUMBER OF SUBSCRIBER OF SPECIFIC CHANNEL.
  const subscribersQuery=useQuery({
    queryKey:["subscribers",userId],
    queryFn:async()=>{
      return await makeRequest.get(`/subscribes/getsubscriber/${userId}`)
    }
  })
  // console.log("subscribers",subscribersQuery.data?.data.length)

  //------------------------------------------------------------------
  // HANDLING VIEWS.
   const viewQuery=useQuery({
    queryKey:["views",videoId],
    queryFn:async()=>{
      return await makeRequest.get(`/views/getview/${videoId}`)
    }
   })
   const viewMutation=useMutation({
    mutationFn:async(state:any)=>{
       return await makeRequest.post('/views/addview', state);
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["views",videoId]);
    }
   })

  //------------------------------------------------------------------
  const suggestionVideoquery=useQuery({
    queryKey:["Suggestionvideos",videoId],
    queryFn:async()=>{
      return await makeRequest.get(`/video/getsuggestonvideos/${videoId}`)
    }
  })
  // console.log("Suggestion videos: ",suggestionVideoquery.data?.data) 
  if(isLoading) return <div className={styles.custom}>
    <h1>Please Wait</h1>
    <h2>Loading....</h2>
  </div>
  if(isError) return <div className={styles.custom}>
    <h1>Opps!</h1>
    <h2>Something went wrong.....</h2>
    </div>
  
  
  return (
    
    <div className={styles.container}>
     
      <div className={styles.left}>
        <div className={styles.video}>
          <iframe
            width="100%"
            height="350px"
            src={isSuccess && data.data?.videoUrl}
            allowFullScreen
            
            style={{ borderRadius: "10px" }}
            className={styles.frame}
          ></iframe>
          <span className={styles.videoTitle}>{isSuccess && data.data?.title}</span>
        </div>
        <div className={styles.channelInfo}>
        <Link to={`/profile/${data?.data?.user.id}`} className={styles.link}>
         <div className={styles.channel}>
         {isSuccess && data.data?.user.profile===null?<AccountCircle style={{fontSize:"40px"}}/>: <img src={data.data.user.profile} alt="profile" className={styles.img} />}
           <div className={styles.channelText} title="Chnnel info">
            <span className={styles.channelName}>{isSuccess && data.data?.user.username}</span>
            <span className={styles.subscribers}>{subscribersQuery.isLoading?0: subscribersQuery.data?.data.length} subscribers</span>
           </div>
         </div>
         </Link>
        <div className={styles.subscribeBtn}>
         <button className={styles.btn1} title="Not Implemented">Join</button>
         <button className={styles.btn2} onClick={handleSubscribe}>{subscribersQuery.isLoading?"Subscribe": subscribersQuery.data?.data.includes(id)?"Subscribed":"Subscribe"}</button>
        </div>
        <div className={styles.buttons}>
          <div className={styles.likesBtn}>
           <button className={styles.like}
           title="I like this"
           onClick={handleLike}
           >{likeQuery.isLoading?<ThumbUpAltOutlinedIcon className={styles.icon} />: likeQuery.data?.data.includes(id)?<ThumbUpAltIcon className={styles.icon} />:<ThumbUpAltOutlinedIcon className={styles.icon} />}{likeQuery.isLoading?0: likeQuery.data?.data.length}</button>
           <button className={styles.dislike}
           title="I dislike this"
           onClick={handleDislike}
           ><ThumbDownAltOutlinedIcon
           className={styles.icon}
           /></button>
          </div>
         <button className={styles.share}
         title="Share video"
         ><ShareIcon/>Share</button>
        </div>
        </div>
        <div className={styles.desc}>
          <span className={styles.descSpan}>{viewQuery.isSuccess? viewQuery.data.data.length:0} views</span>
          <span className={styles.descSpan}>{moment(data.data.createdAt).fromNow()}</span>
           {data.data.description}
           
        </div>
        <div className={styles.BigScreenComments}>

        <Comments />
        </div>
        
      </div>

      <div className={styles.right}>
        <h1 className={styles.suggessionTitle}>More videos</h1>
        {
          
          suggestionVideoquery.isError?<h1>Someting went wrong</h1>:suggestionVideoquery.isSuccess && suggestionVideoquery.data?.data.map((suggession:any)=>{
            return  <SuggessionCard key={suggession.id} suggession={suggession}/>
          })
        }
       
       <div className={styles.responsiveComment}>
        <Comments/>
       </div>
       
      </div>
    
    </div>
  );
};

export default Video; 
