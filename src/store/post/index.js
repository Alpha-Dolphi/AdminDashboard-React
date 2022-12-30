import { LoadingStatuses } from "../../constants/loadingStatuses";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { selectPostIds } from "./selectors";
import { notify } from "../../utils/notify";
import axios from "axios";

export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async (_, { getState, rejectWithValue }) => {
    if (selectPostIds(getState())?.length > 1) {
      return rejectWithValue(LoadingStatuses.earlyAdded);
    }

    try {
      const response = await axios.get(`${window.API_URL}/posts/`);
      return await response.data;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const fetchPost = createAsyncThunk(
  "post/fetchPost",
  async (id, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(`${window.API_URL}/posts/${id}`);
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
      const response = await axios.delete(`${window.API_URL}/posts/${postId}`);
      return postId;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ id, changes }, { getState, rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${window.API_URL}/posts/${id}`,
        changes
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

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
      .addCase(fetchPost.fulfilled, (state, { payload }) => {
        postEntityAdapter.addOne(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchPost.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchPost.rejected, (state) => {
        state.status = LoadingStatuses.failed;
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        postEntityAdapter.removeOne(state, payload);
        notify({ message: "Post deleted", type: "success" });
      })
      .addCase(deletePost.rejected, () => {
        notify({ message: "Couldn't delete the post", type: "error" });
      })
      .addCase(updatePost.fulfilled, (state, { payload }) => {
        postEntityAdapter.updateOne(state, {
          id: payload.id,
          changes: payload,
        });
        notify({ message: "Post updated", type: "success" });
      })
      .addCase(updatePost.rejected, () => {
        notify({ message: "Couldn't update the post", type: "error" });
      }),
});
