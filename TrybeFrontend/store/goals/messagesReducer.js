import { createSlice } from "@reduxjs/toolkit";
import { loadMessages, sendMessage } from "./messages.actions";

const initialState = [];

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Load messages success
      .addCase(loadMessages.fulfilled, (state, action) => {
        return (state = action.payload);
      })
      // Create message success
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});

export default messagesSlice.reducer;
