import { LoadingStatuses } from "../../constants/loadingStatuses";

export const selectCommentsModuleState = (state) => state.comments;

export const selectCommentIds = (state) =>
  selectCommentsModuleState(state)?.ids;

export const selectCommentEntities = (state) =>
  selectCommentsModuleState(state)?.entities;

export const selectCommentsById = (state, { CommentsId }) =>
  selectCommentEntities(state)[CommentsId];

export const selectCommentsByPostId = (state, { postId }) =>
  Object.values(selectCommentEntities(state)).filter(
    (comment) => comment.postId === Number(postId)
  );

export const selectCommentsLoadingStatus = (state) =>
  selectCommentsModuleState(state)?.status;

export const selectAreCommentsLoading = (state) =>
  [LoadingStatuses.inProgress, LoadingStatuses.idle].includes(
    selectCommentsLoadingStatus(state)
  );
