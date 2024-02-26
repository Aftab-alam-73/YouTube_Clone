import { createSlice } from "@reduxjs/toolkit";

const initialState={
    videoId: 0,
    userId:0
}
const videoslice=createSlice({
    name: "videoslice",
    initialState,
    reducers:{
        addVideo:(state, action)=>{
          state.videoId=action.payload.id;
          state.userId=action.payload.user.id;
        }   
    }
})
export const {addVideo} = videoslice.actions;

export default videoslice.reducer;