import { LoadingStatuses } from "../../constants/loadingStatuses";

export const selectTodosModuleState = (state) => state.todos;

export const selectTodoIds = (state) => selectTodosModuleState(state)?.ids;

export const selectTodoEntities = (state) =>
  selectTodosModuleState(state)?.entities;

export const selectTodosById = (state, { TodosId }) =>
  selectTodoEntities(state)[TodosId];

export const selectTodosLoadingStatus = (state) =>
  selectTodosModuleState(state)?.status;

export const selectAreTodosLoading = (state) =>
  [LoadingStatuses.inProgress, LoadingStatuses.idle].includes(
    selectTodosLoadingStatus(state)
  );
