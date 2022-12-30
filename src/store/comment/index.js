import { LoadingStatuses } from "../../constants/loadingStatuses";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { selectCommentIds } from "./selectors";
import axios from "axios";
import { notify } from "../../utils/notify";

export const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async (_, { getState, rejectWithValue }) => {
    if (selectCommentIds(getState())?.length > 0) {
      return rejectWithValue(LoadingStatuses.earlyAdded);
    }

    try {
      const response = await axios.get(`${window.API_URL}/comments/`);
      return await response.data;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const fetchComment = createAsyncThunk(
  "comment/fetchComment",
  async (postId, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${window.API_URL}/posts/${postId}/comments`
      );
      return await response.data;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (commentId, { getState, rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${window.API_URL}/comments/${commentId}`
      );
      return commentId;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async ({ id, changes }, { getState, rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${window.API_URL}/comments/${id}`,
        changes
      );
      return await response.data;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const addComment = createAsyncThunk(
  "comment/addComment",
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(`${window.API_URL}/comments`, data);
      return await response.data;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

const commentEntityAdapter = createEntityAdapter({
  selectId: (comments) => comments.id,
});

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
      })
      .addCase(fetchComment.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchComment.fulfilled, (state, { payload }) => {
        commentEntityAdapter.addMany(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchComment.rejected, (state) => {
        state.status = LoadingStatuses.failed;
      })
      .addCase(updateComment.fulfilled, (state, { payload }) => {
        commentEntityAdapter.updateOne(state, {
          id: payload.id,
          changes: payload,
        });
        notify({ message: "Comment updated", type: "success" });
      })
      .addCase(updateComment.rejected, () => {
        notify({ message: "Couldn't update the comment", type: "error" });
      })
      .addCase(deleteComment.fulfilled, (state, { payload }) => {
        commentEntityAdapter.removeOne(state, payload);
        notify({ message: "Comment deleted", type: "success" });
      })
      .addCase(deleteComment.rejected, () => {
        notify({ message: "Couldn't delete the comment", type: "error" });
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        commentEntityAdapter.setOne(state, payload);
        notify({ message: "Comment added", type: "success" });
      })
      .addCase(addComment.rejected, () => {
        notify({ message: "Couldn't add the comment", type: "error" });
      }),
});
