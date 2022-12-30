import { LoadingStatuses } from "../../constants/loadingStatuses";

export const selectPhotosModuleState = (state) => state.photos;

export const selectPhotoIds = (state) => selectPhotosModuleState(state)?.ids;

export const selectPhotoEntities = (state) =>
  selectPhotosModuleState(state)?.entities;

export const selectPhotosByAlbumId = (state, albumId) =>
  Object.values(selectPhotoEntities(state)).filter(
    (photo) => photo.albumId === albumId
  );

export const selectPhotosLoadingStatus = (state) =>
  selectPhotosModuleState(state)?.status;

export const selectArePhotosLoading = (state) =>
  [LoadingStatuses.inProgress, LoadingStatuses.idle].includes(
    selectPhotosLoadingStatus(state)
  );
