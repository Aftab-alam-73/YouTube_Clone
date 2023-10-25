import { createSlice } from "@reduxjs/toolkit";

const initialState={
    videoId: 0,
    title:"",
    views:0,
    userId:0
}
const videoslice=createSlice({
    name: "videoslice",
    initialState,
    reducers:{
        addVideo:(state, action)=>{
        
          state.videoId=action.payload.id;
          state.title=action.payload.title;
          state.views=action.payload.views;
          state.userId=action.payload.userId;
        }   
    }
})
export const {addVideo} = videoslice.actions;

export default videoslice.reducer;