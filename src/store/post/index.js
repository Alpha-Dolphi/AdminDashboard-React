import { LoadingStatuses } from "../../constants/loadingStatuses";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { selectPostIds } from "./selectors";
import axios from 'axios';

export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async (_, { getState, rejectWithValue }) => {

    if (selectPostIds(getState())?.length > 0) {
      return rejectWithValue(LoadingStatuses.earlyAdded);
    }

    try {
      const response = await axios.get(
        `${process.env.API_URL}/posts/`
      );
      return await response.data;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId, { getState, rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.API_URL}/posts/${postId}`
      );
      return postId;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  });

export const updatePost = createAsyncThunk(
    "post/updatePost",
    async ({title, body, postKey}, { getState, rejectWithValue }) => {
      try {
        const response = await axios.put(
          `${process.env.API_URL}/posts/${postKey}`,
          {title, body}
        );
        return response.data;
      } catch (error) {
        return rejectWithValue({ error: error.message });
      }
    }
)

const postEntityAdapter = createEntityAdapter();

export const postSlice = createSlice({
  name: "post",
  initialState: postEntityAdapter.getInitialState({
    status: LoadingStatuses.idle,
  }),
  extraReducers: (builder) =>
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        postEntityAdapter.addMany(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchPosts.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.earlyAdded
            ? LoadingStatuses.success
            : LoadingStatuses.failed;
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        postEntityAdapter.removeOne(state, payload);
      })
      .addCase(deletePost.rejected, () => {
        console.error("DELETION FAILED");
      })
      .addCase(updatePost.fulfilled, () => {
        console.log("UPDATE FULFILLED");
      })
      .addCase(updatePost.rejected, () => {
        console.error("UPDATE REJECTED");
      }),
});