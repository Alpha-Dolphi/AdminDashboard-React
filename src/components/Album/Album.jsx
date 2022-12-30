import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos } from "../../store/photo";
import { selectPhotosByAlbumId } from "../../store/photo/selectors";
import { ImageSlide } from "../ImageSlide/ImageSlide";

export const Album = ({ album }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPhotos(album.id));
  }, []);

  const photos = useSelector((state) => selectPhotosByAlbumId(state, album.id));
  return (
    <>
      <ImageSlide photos={photos} />
    </>
  );
};
