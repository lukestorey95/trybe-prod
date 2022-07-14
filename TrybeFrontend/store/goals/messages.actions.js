import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchMessages from "../../src/functions/fetchMessages";
import postMessage from "../../src/functions/postMessage";

export const loadMessages = createAsyncThunk(
  "messages/loadMessages",
  async ({ token, id }, thunkAPI) => {
    try {
      // console.log("redux action id", id);
      const response = await fetchMessages(token, id);
      return response;
    } catch (err) {
      throw err;
    }
  }
);

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ token, id, text }, thunkAPI) => {
    try {
      const response = await postMessage(token, id, text);
      return response;
    } catch (err) {
      throw err;
    }
  }
);

// export const removeGoal = createAsyncThunk(
//   "supporterGoals/removeGoal",
//   async ({ token, id }, thunkAPI) => {
//     try {
//       console.log("token", token);
//       console.log("id", id);
//       const response = await deleteGoal(token, id);
//       return response;
//     } catch (err) {
//       throw err;
//     }
//   }
// );

// export const editGoal = createAsyncThunk(
//   "supporterGoals/updateGoal",
//   async ({ token, id, goal_description }, thunkAPI) => {
//     try {
//       const response = await updateGoal(token, id, goal_description);
//       return response;
//     } catch (err) {
//       throw err;
//     }
//   }
// );
