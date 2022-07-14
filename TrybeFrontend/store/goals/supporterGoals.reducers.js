import { createSlice } from "@reduxjs/toolkit";
import {
  supporterLoadGoals,
  uploadGoal,
  removeGoal,
  editGoal,
} from "./supporterGoals.actions";

const initialState = [];

const supporterGoalSlice = createSlice({
  name: "supporterGoals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Load goals success
      .addCase(supporterLoadGoals.fulfilled, (state, action) => {
        // console.log("test");
        // console.log("payload", action.payload);
        return (state = action.payload.goals);
      });
    // // Upload goal success
    // .addCase(uploadGoal.fulfilled, (state, action) => {
    //   state.push(action.payload);
    // })
    // // Delete goal success
    // .addCase(removeGoal.fulfilled, (state, action) => {
    //   return state.filter((goal) => goal.id !== action.payload.id);
    // })
    // // Edit goal success
    // .addCase(editGoal.fulfilled, (state, action) => {
    //   const index = state.findIndex((goal) => goal.id === action.payload.id);
    //   state[index] = action.payload;
    //   return state;
    // });
  },
});

export default supporterGoalSlice.reducer;
