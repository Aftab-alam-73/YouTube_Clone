import { createSlice } from "@reduxjs/toolkit";

const initialState={
    mode:false,
    searchInput:""
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
      },
      addSearchInput:(state,actions)=>{
        state.searchInput=actions.payload.searchInput;
      }
    }
})

export default darkmodeSlice.reducer;
export const {darkmode, lightmode,addSearchInput} = darkmodeSlice.actions;