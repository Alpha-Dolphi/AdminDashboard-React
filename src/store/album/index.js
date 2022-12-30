import { LoadingStatuses } from "../../constants/loadingStatuses";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAlbums = createAsyncThunk(
  "album/fetchAlbums",
  async ({ limit, page }, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${window.API_URL}/albums?_limit=${limit}&_page=${page}`
      );
      const data = await response.data;
      return response;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

const albumEntityAdapter = createEntityAdapter();

export const albumSlice = createSlice({
  name: "album",
  initialState: albumEntityAdapter.getInitialState({
    status: LoadingStatuses.idle,
  }),
  extraReducers: (builder) =>
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchAlbums.fulfilled, (state, { payload }) => {
        albumEntityAdapter.addMany(state, payload.data);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchAlbums.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.earlyAdded
            ? LoadingStatuses.success
            : LoadingStatuses.failed;
      }),
});
