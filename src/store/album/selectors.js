import { LoadingStatuses } from "../../constants/loadingStatuses";

export const selectAlbumsModuleState = (state) => state.albums;

export const selectAlbumIds = (state) => selectAlbumsModuleState(state)?.ids;

export const selectAlbumEntities = (state) =>
  selectAlbumsModuleState(state)?.entities;

export const selectAlbumsById = (state, { AlbumsId }) =>
  selectAlbumEntities(state)[AlbumsId];

export const selectAlbumsLoadingStatus = (state) =>
  selectAlbumsModuleState(state)?.status;

export const selectAreAlbumsLoading = (state) =>
[LoadingStatuses.inProgress, LoadingStatuses.idle].includes(
  selectAlbumsLoadingStatus(state))
