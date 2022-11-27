import { LoadingStatuses } from "../../constants/loadingStatuses";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { selectCommentIds } from "./selectors";
import axios from 'axios';

export const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async (_, { getState, rejectWithValue }) => {
    if (selectCommentIds(getState())?.length > 0) {
        return rejectWithValue(LoadingStatuses.earlyAdded);
    }

    try {
        const response = await axios.get(
          `${process.env.API_URL}/comments/`
        );
        return await response.data;
    } catch (error) {
        return rejectWithValue({ error: error.message });
    }
  }
);

const commentEntityAdapter = createEntityAdapter();

export const commentSlice = createSlice({
  name: "comment",
  initialState: commentEntityAdapter.getInitialState({
    status: LoadingStatuses.idle,
  }),
  extraReducers: (builder) =>
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchComments.fulfilled, (state, { payload }) => {
        commentEntityAdapter.addMany(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchComments.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.earlyAdded
            ? LoadingStatuses.success
            : LoadingStatuses.failed;
      }),
});
