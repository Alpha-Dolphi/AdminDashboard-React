import { LoadingStatuses } from "../../constants/loadingStatuses";

export const selectPostsModuleState = (state) => state.post;

export const selectPostIds = (state) => selectPostsModuleState(state)?.ids;

export const selectPostEntities = (state) =>
  selectPostsModuleState(state)?.entities;

export const selectPostsById = (state, { postId }) =>
  selectPostEntities(state)[postId];

export const selectPostsLoadingStatus = (state) =>
  selectPostsModuleState(state)?.status;

export const selectArePostsLoading = (state) =>
  [LoadingStatuses.inProgress, LoadingStatuses.idle].includes(
    selectPostsLoadingStatus(state)
  );

export const selectIsPostLoading = (state) =>
  LoadingStatuses.inProgress === selectPostsLoadingStatus(state);
