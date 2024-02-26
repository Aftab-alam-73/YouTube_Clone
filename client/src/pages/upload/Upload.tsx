import styles from "./upload.module.css";
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import {storage} from '../../firebase'
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface videotype{
videoUrl: string;
imageUrl: string;
videoTitle: string;
videoDesc:string;
userId:Number;
}
const Upload = () => {
  const {id}=useSelector((state:any) => state.user)
  const {mode}=useSelector((state:any)=>state.darkMode)
  const navigate=useNavigate();
  const [image, setImage] = useState<any>(null);
  const [video, setVideo] = useState<any>(null);
  const [imagepercent, setImagepercent] = useState<any>(0);
  const [videopercent, setVideopercent] = useState<any>(0);
  const [videodata, setVideodata] = useState<videotype>({
    videoUrl:"",
    imageUrl:"",
    videoTitle:"",
    videoDesc:"",
    userId:id
  });
  const isUploadable=():boolean=>{
     if(videodata.imageUrl=="" || videodata.videoUrl=="" || videodata.videoTitle=="" || videodata.videoDesc==""){
      return true;
     }
     return false;
  }
  const mutation=useMutation({
    mutationFn:(state:videotype)=>{
      return makeRequest.post("/video/addvideo",state);
    },
    onSuccess:(data)=>{
      console.log(data.data)
      if(data.data.success){
           navigate('/');
      }
    }
  })
  const handleUpload=(e:any) => {
    e.preventDefault();
    if(videodata.imageUrl=="" || videodata.videoUrl=="" || videodata.userId==0){
      return;
    }else{
      console.log(videodata)
      mutation.mutate(videodata);
    }
  }
// console.log(videodata)
 const uploadFile = (file:any, urlType:string) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, ""+fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);


    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setImagepercent(Math.round(progress)) : setVideopercent(Math.round(progress));
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
        setVideopercent("successfully uploaded!")
        setImagepercent("successfully uploaded!")
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
           urlType==="imgUrl"? setVideodata({...videodata, imageUrl:downloadURL}):setVideodata({...videodata,videoUrl:downloadURL})
          });
        });
   
  };

  useEffect(() => {
    video && uploadFile(video , "videoUrl");
  }, [video]);

  useEffect(() => {
    image && uploadFile(image, "imgUrl");
  }, [image]);
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <h1>Upload A New Video</h1>
        <form className={styles.form}>
          <span>video: {video && <span style={{color:"green"}}>{videopercent}{typeof imagepercent=="string"? "":"%"}</span>}</span>
          <input
            type="file"
            accept="video/*"
            placeholder="choose a video"
            className={mode?styles.darkinput:styles.input}
            onChange={(e: any) => {
             setVideo(e.target.files[0])
             require
            }}
          />
          <input type="text" placeholder="Title"  className={mode?styles.darkinput:styles.input} onChange={(e:any)=>setVideodata({...videodata,videoTitle:e.target.value})} required/>
          <textarea
            placeholder="Description"
            className={mode?styles.darkdesc:styles.desc}
            onChange={(e:any)=>setVideodata({...videodata,videoDesc:e.target.value})}
            required
          ></textarea>
          <span>image: {image && <span style={{color:"green"}}>{imagepercent}{typeof imagepercent=="string"? "":"%"}</span>}</span>
          <input
            type="file"
            accept="image/*"
            className={mode?styles.darkinput:styles.input}
            onChange={(e: any) => {
              setImage(e.target.files[0])
             
            }}
          />
          <button disabled={ isUploadable()} className={mode?styles.darkbtn:styles.btn} onClick={handleUpload}>Upload</button>
        </form>
     
      </div>
    </div>
  );
};

export default Upload;
