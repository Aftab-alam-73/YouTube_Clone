import Leftbar from "../../components/leftbar/Leftbar";
import styles from './home.module.css';
import Card from "../../components/card/Card";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useParams } from "react-router-dom";
const Home = () => {
   const {type}=useParams()
   console.log("type: " , type)
  const {data,isError,isLoading}=useQuery({
    queryKey:["videos",type],
    queryFn:async() =>{
      return type=="subscriptions"? await makeRequest.get('/video/getsubscriptionvideos'): await makeRequest.get('/video/getvideos');
    }
  })

    // console.log("Home page",data?.data);
  return (
    <div className={styles.container}>
     <Leftbar  />
   
     <div className={styles.cards}>
    {
       isError? <div className={styles.custom}>
        <h1>Opps!</h1>
        <h2> Something went wrong...</h2>
        </div>:isLoading?<div className={styles.custom}>
        <h1>Please Wait</h1>
        <h2>Loading....</h2>
        </div>: 
       
      data?.data.map((video:any)=>{
        return  <Card video={video} key={video.id}/>
         
         
        
      })
    }
     
     </div>
    </div>
  )
}

export default Home
