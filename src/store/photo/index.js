import { LoadingStatuses } from "../../constants/loadingStatuses";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { selectPhotoIds, selectPhotosByAlbumId } from "./selectors";

export const fetchPhotos = createAsyncThunk(
  "photo/fetchPhotos",
  async (albumId, { getState, rejectWithValue }) => {
    if (selectPhotosByAlbumId(getState(), albumId).length > 0) {
      return rejectWithValue(LoadingStatuses.earlyAdded);
    }

    try {
      const response = await axios.get(
        `${window.API_URL}/albums/${albumId}/photos`
      );
      return await response.data;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

const photoEntityAdapter = createEntityAdapter();

export const photoSlice = createSlice({
  name: "photo",
  initialState: photoEntityAdapter.getInitialState({
    status: LoadingStatuses.idle,
  }),
  extraReducers: (builder) =>
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchPhotos.fulfilled, (state, { payload }) => {
        photoEntityAdapter.addMany(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchPhotos.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.earlyAdded
            ? LoadingStatuses.success
            : LoadingStatuses.failed;
      }),
});
