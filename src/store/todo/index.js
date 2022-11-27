import { LoadingStatuses } from "../../constants/loadingStatuses";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { selectTodoIds } from "./selectors";

export const fetchTodos = createAsyncThunk(
  "todo/fetchTodos",
  async (_, { getState, rejectWithValue }) => {
    if (selectTodoIds(getState())?.length > 0) {
        return rejectWithValue(LoadingStatuses.earlyAdded);
    }

    const response = await fetch(
      `${process.env.API_URL}/todos`
    );
    return await response.json();
  }
);

const todoEntityAdapter = createEntityAdapter();

export const todoSlice = createSlice({
  name: "todo",
  initialState: todoEntityAdapter.getInitialState({
    status: LoadingStatuses.idle,
  }),
  extraReducers: (builder) =>
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchTodos.fulfilled, (state, { payload }) => {
        todoEntityAdapter.addMany(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchTodos.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.earlyAdded
            ? LoadingStatuses.success
            : LoadingStatuses.failed;
      }),
});
