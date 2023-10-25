import { createSlice } from "@reduxjs/toolkit";

const initialState={
    mode:false
}

const darkmodeSlice=createSlice({
    name: 'darkmode',
    initialState,
    reducers:{
      darkmode:(state)=>{
        state.mode = true;
      },
      lightmode:(state)=>{
        state.mode = false;
      }
    }
})

export default darkmodeSlice.reducer;
export const {darkmode, lightmode} = darkmodeSlice.actions;