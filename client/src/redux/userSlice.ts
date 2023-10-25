import {createSlice} from '@reduxjs/toolkit'

const initialState={
    id:0,
    username:"",
    profile:"",
}

const userSlice=createSlice({
    name:"userSlice",
    initialState,
    reducers:{
        addUser:(state,action)=>{
            console.log("action: ",action)
            state.id=action.payload.id;
            state.username=action.payload.username;
            state.profile=action.payload.profile;
        },
        removeUser:(state)=>{
           state.id=0;
           state.username="";
           state.profile=""; 
        },
        setProfile:(state,action)=>{
            state.profile=action.payload.profile;
        }
    }
})
export default userSlice.reducer
export const {addUser, removeUser,setProfile} =userSlice.actions;