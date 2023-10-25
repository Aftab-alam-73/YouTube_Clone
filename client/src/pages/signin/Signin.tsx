import { useMutation } from '@tanstack/react-query';
import styles from './signin.module.css'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { makeRequest } from '../../axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../redux/userSlice';
import { useState } from 'react';
interface user{
  username: string;
  email:string;
  profile:string;
}
interface signuptype{
  username:string;
  email:string;
  password:string;
}
interface signintype{
  username:string;
  password:string;
}
const Signin = () => {
  const navigate=useNavigate();
  const Dispatch=useDispatch();
  const {mode} =useSelector((state:any) => state.darkMode)
  const [error,setError]=useState<Boolean>(false);
  const [successMessage,setSuccessMessage]=useState<Boolean>(false);
  const [errorMessage,setErrorMessage]=useState<String>("");
  const [singupData,setSignupData] =useState<signuptype>({username: "", email: "", password: "",});
  const [singinData,setSinginData] =useState<signintype>({username: "", password: ""});
// Handling singin
 const singinMutation=useMutation({
  mutationFn:(state:signintype)=>{
    return makeRequest.post('/auth/signin',state)
  },
  onSuccess:(res)=>{
    console.log("from singin",res.data.data);
    console.log("success",res.data.success);
    if(res.data.success){
      Dispatch(addUser(res.data.data));
      navigate('/')
    }else{
      setError(true);
      console.log("ErrorMessage",res.data.message);
      setErrorMessage(res.data.message);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  },
  onError: (data:any)=>{
    console.log("from error",data.response.data.success)
    setError(true);
    setErrorMessage(data.response.data.message);
    setTimeout(() => {
      setError(false);
    }, 2000); 
  }
 })
 const handleSingin=(e:any)=>{
  e.preventDefault();
  if(singinData.username==""){
    setError(true);
    setErrorMessage("Please enter a username");
    setTimeout(() => {
      setError(false);
    }, 2000);
  }
  else if(singinData.password==""){
    setError(true);
    setErrorMessage("Please enter a password");
    setTimeout(() => {
      setError(false);
    }, 2000);
  }else{
    singinMutation.mutate(singinData)
  }
 }
// Handling signup
 const signupMutation=useMutation({
  mutationFn:(state:signuptype)=>{
    return makeRequest.post("/auth/signup",state)
  },
  onSuccess:(res)=>{
    if(res.data.success){
      setSuccessMessage(true);
      setSignupData({username:"",email:"",password:""})
    }else{
      setError(true);
    setErrorMessage(res.data.message);
    setTimeout(() => {
      setError(false);
    }, 2000);
    }
    
  },
  onError:(response:any)=>{
    setError(true);
    setErrorMessage(response.data.message);
    setTimeout(() => {
      setError(false);
    }, 2000);
  }
 })
 const handleSingup=(e:any)=>{
  e.preventDefault();
  if(singupData.username=="" ||singupData.password=="" ||singupData.email==""){
     setError(true);
     setErrorMessage("Please enter all required fields")
     setTimeout(() => {
      setError(false);
    }, 2000);
  }else{
    signupMutation.mutate(singupData)
  }
 }
// Handling signInWithGoogle data.
 const singinWithGoogleMutation= useMutation({
   mutationFn:(state:user)=>{
     return makeRequest.post("/auth/googlesignin",state)
   },
   onSuccess:(res)=>{
    console.log("On success: " , res.data.data);
    Dispatch(addUser(res.data.data));
    navigate("/")
   }
 })
 // SignIn with Google functionality
  const siginInWithGoogle=()=>{
    const auth=getAuth();
    auth.languageCode = 'it';
    const provider=new GoogleAuthProvider();
    signInWithPopup(auth,provider).then((result)=>{
      // console.log("result: ",result.user.photoURL,result.user.displayName,result.user.email);
      singinWithGoogleMutation.mutate({
        username:result.user.displayName!,
        email:result.user.email!,
        profile:result.user.photoURL!
      })
     
    }).catch((error)=>{
      console.log("error: ",error);
    })
  }

  return (
    <div className={mode?styles.darkContainer:styles.container}>
     {successMessage && <h1 className={styles.successMess}>singup successful please login</h1>}
      <div className={mode?styles.darkfirst:styles.first}>
       <h1>Sign In</h1>
       <p>to continue to YouTube</p>
       <input type="text" placeholder='Username...' className={mode?styles.darkinput:styles.input}
       onChange={(e:any) => setSinginData({...singinData, username: e.target.value})}
        />
       <input type="password" placeholder='Password...' className={mode?styles.darkinput:styles.input}
       onChange={(e:any) => setSinginData({...singinData, password: e.target.value})}
        />
       <button className={mode?styles.darkbtn:styles.btn} onClick={handleSingin}>SignIn</button>
       <p>or</p>
       <button onClick={siginInWithGoogle} className={mode?styles.darkbtn:styles.btn}>SingIn with Google</button>
       <p>or</p>
       <input type="text" placeholder='Username...' className={mode?styles.darkinput:styles.input}
       value={singupData.username}
       onChange={(e:any) => setSignupData({...singupData,username:e.target.value})}
        />
       <input type="email" placeholder='Email...' className={mode?styles.darkinput:styles.input}
       value={singupData.email}
       onChange={(e:any) => setSignupData({...singupData,email:e.target.value})} />
     
       <input type="password" placeholder='Password...' className={mode?styles.darkinput:styles.input}
       value={singupData.password}
       onChange={(e:any) => setSignupData({...singupData,password:e.target.value})} />
  
       <button className={mode?styles.darkbtn:styles.btn} onClick={handleSingup}>Sign Up</button>
      </div>
      <div className={styles.second}>
        <span>English(USA)</span>
        <div className={styles.text}>
          <span className={styles.item}>Help</span>
          <span className={styles.item}>Pirvicy</span>
          <span className={styles.item}>Terms</span>
        </div>
      </div>
     {error && <h1 className={styles.errorMess}>{errorMessage}</h1>}
    </div>
  )
}

export default Signin
