import { LoadingStatuses } from "../../constants/loadingStatuses";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { selectTodoIds } from "./selectors";
import { notify } from "../../utils/notify";
import axios from "axios";

export const fetchTodos = createAsyncThunk(
  "todo/fetchTodos",
  async (_, { getState, rejectWithValue }) => {
    if (selectTodoIds(getState())?.length > 0) {
      return rejectWithValue(LoadingStatuses.earlyAdded);
    }

    const response = await fetch(`${window.API_URL}/todos`);
    return await response.json();
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (todoId, { getState, rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${window.API_URL}/Todos/${todoId}`
      );
      return todoId;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async ({ id, changes }, { getState, rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${window.API_URL}/todos/${id}`,
        changes
      );
      return await response.data;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
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
      })
      .addCase(deleteTodo.fulfilled, (state, { payload }) => {
        todoEntityAdapter.removeOne(state, payload);
        notify({ message: "Task deleted", type: "success" });
      })
      .addCase(deleteTodo.rejected, () => {
        notify({ message: "Couldn't delete the task", type: "error" });
      })
      .addCase(updateTodo.fulfilled, (state, { payload }) => {
        todoEntityAdapter.setOne(state, payload);
        notify({ message: "Todo updated", type: "success" });
      })
      .addCase(updateTodo.rejected, () => {
        notify({ message: "Couldn't update the todo", type: "error" });
      }),
});
