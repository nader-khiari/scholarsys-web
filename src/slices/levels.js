import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setMessage } from "./message";

export const allLevels = createAsyncThunk(
  "levels/allLevels",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/niveaus"
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = { levels: [] };

const levelsSlice = createSlice({
  name: "levels",
  initialState,
  extraReducers: {
    [allLevels.fulfilled]: (state, action) => {
      state.levels = action.payload;
    },
    [allLevels.rejected]: (state, action) => {
      state.levels = [];
    },
  },
});

const { reducer } = levelsSlice;
export default reducer;
