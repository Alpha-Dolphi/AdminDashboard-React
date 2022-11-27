import { LoadingStatuses } from "../../constants/loadingStatuses";

export const selectPostsModuleState = (state) => state.post;

export const selectPostIds = (state) => selectPostsModuleState(state)?.ids;

export const selectPostEntities = (state) =>
  selectPostsModuleState(state)?.entities;

export const selectPostsById = (state, { PostsId }) =>
  selectPostEntities(state)[PostsId];

export const selectPostsLoadingStatus = (state) =>
  selectPostsModuleState(state)?.status;

export const selectArePostsLoading = (state) =>
[LoadingStatuses.inProgress, LoadingStatuses.idle].includes(
  selectPostsLoadingStatus(state))
