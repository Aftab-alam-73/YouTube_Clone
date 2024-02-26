import Leftbar from '../leftbar/Leftbar'
import styles from './profile.module.css'
import Banner from '../../assets/banner.jpg'
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AccountCircle from '@mui/icons-material/AccountCircle'
import { makeRequest } from '../../axios'
import Card from '../card/Card'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { storage } from '../../firebase';
import { setProfile } from '../../redux/userSlice';
const Profile = () => {
    const Dispatch=useDispatch();
    const {id}=useSelector((state:any) => state.user)
    const queryClient=useQueryClient()
    const {profileId}=useParams()
    const [image,setImage]=useState(null)
    const [profileUrl,setProfileUrl]=useState("");
// ----------------------------------------------------------------
// Profile upload functionality.
    const profileMutation=useMutation({
      mutationFn:async(state:any) => {
        return await makeRequest.put("/auth/setprofile",state)
      },
      onSuccess:()=>{
         queryClient.invalidateQueries(["channelvideos"])
        
      }
    })
    const uploadFile = (file:any) => {
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, ""+fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          
         
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error.message);
        },
        () => {
         
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               profileMutation.mutate({id:profileId,profile:downloadURL})
               setProfileUrl(downloadURL);
            });
          });
     
    };
   useEffect(()=>{
    image && uploadFile(image);
   },[image])
  useEffect(()=>{
    if(profileUrl!==""){
      Dispatch(setProfile({profile:profileUrl}));

    }
  },[profileUrl])
   //----------------------------------------------------------------
   // Fetching all the channel's videos 
    const {data,isError,isLoading,isSuccess}=useQuery({
        queryKey:["channelvideos",profileId],
        queryFn:() =>{
          return makeRequest.get(`/video/getchannelvideos/${profileId}`);
        }
      })
      console.log("data ",data?.data);
    //----------------------------------------------------------------
    // Fetching the number of subscribers of the channel.  
      const subscribersQuery=useQuery({
        queryKey:["subscribers",profileId],
        queryFn:async()=>{
          return await makeRequest.get(`/subscribes/getsubscriber/${profileId}`)
        }
      })

     // ----------------------------------------------------------------
     // Video deletion functionality.
     const Mutation=useMutation({
        mutationFn:async(id:any)=>{
            return await makeRequest.delete(`video/deletevideo/${id}`)
        },
        onSuccess:()=>{
            queryClient.invalidateQueries(["channelvideos"])
        }
     })
      const handledelete=(id:any)=>{
        Mutation.mutate(id)
      }
      
  return (
    <div className={styles.container}>
    
     <Leftbar/>
     
     <div className={styles.right}>
      <img src={Banner} alt="Banner" className={styles.banner} />
     <div className={styles.channelInfo}>
      <label title='Edit profile'>
      {isSuccess && data?.data[0]?.user?.profile===null?<AccountCircle style={{fontSize:"100px"}}/>: <img src={data?.data[0]?.user?.profile} alt="Profile" className={styles.img}/>}
     { profileId==id && <input type="file" accept='image/*' style={{display:"none"}} onChange={(e:any)=>setImage(e.target.files[0])}/>}
      </label>
       <div className={styles.info}>
       <span>Channel Name:<span className={styles.bold}> {isSuccess && data.data[0]?.user?.username}</span></span>
       <span>Total Number Of Subscribers:<span className={styles.bold}> {subscribersQuery.isSuccess && subscribersQuery.data.data.length}</span> </span>
       <span>Total Number Of Videos Uploaded: <span className={styles.bold}> {isSuccess && data.data.length} videos</span></span>
       </div>
       

     </div>
       <hr />
       <h2>Your videos</h2>
       <div className={styles.videos}>
        {
            
                isError? <div className={styles.custom}>
                 <h1>Opps!</h1>
                 <h2> Something went wrong...</h2>
                 </div>:isLoading?<div className={styles.custom}>
                 <h1>Please Wait</h1>
                 <h2>Loading....</h2>
                 </div>: 
                
               data?.data.map((video:any)=>{
                 return <div key={video.id} className={styles.videoCard}>
                    <Card video={video} />
                   {profileId==id && <button className={styles.btn}
                   onClick={()=>handledelete(video.id)}
                   >delete</button>}
                 </div> 
               })
             
        }
        
       </div>
     </div>
    </div>
  )
}

export default Profile
