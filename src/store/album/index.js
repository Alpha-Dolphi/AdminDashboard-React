import { LoadingStatuses } from "../../constants/loadingStatuses";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { selectAlbumIds } from "./selectors";
import axios from 'axios';

export const fetchAlbums = createAsyncThunk(
  "album/fetchAlbums",
  async (_, { getState, rejectWithValue }) => {
    if (selectAlbumIds(getState())?.length > 0) {
        return rejectWithValue(LoadingStatuses.earlyAdded);
    }

    try {
        const response = await axios.get(
          `${process.env.API_URL}/albums/`
        );
        return await response.data;
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
        albumEntityAdapter.addMany(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchAlbums.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.earlyAdded
            ? LoadingStatuses.success
            : LoadingStatuses.failed;
      }),
});
