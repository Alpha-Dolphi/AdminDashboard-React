import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos } from "../../store/photo";
import { selectPhotosByAlbumId } from "../../store/photo/selectors";
import { capitilizeFirstLetter } from "../../utils/capitilizeFirstLetter";
import { ImageSlide } from "../ImageSlide/ImageSlide";
import styles from "./styles.module.css";

export const Album = ({ album }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPhotos(album.id));
    }, []);

    const photos = useSelector(state => selectPhotosByAlbumId(state, album.id));
  return (
    <>
      <h1 className={styles.header}> {capitilizeFirstLetter(album.title)}</h1>
      <ImageSlide photos={photos}/>
    </>
  );
};
