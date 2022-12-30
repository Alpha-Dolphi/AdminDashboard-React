import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectAlbumEntities,
  selectAreAlbumsLoading,
} from "../../store/album/selectors";
import { Album } from "../Album/Album";
import styles from "./styles.module.css";
import { fetchAlbums } from "../../store/album";
import { useRef } from "react";

export const Albums = () => {
  const dispatch = useDispatch();

  const [scrolling, setScrolling] = useState(false);
  const albums = useSelector(selectAlbumEntities);
  const areLoadingAlbums = useSelector(selectAreAlbumsLoading);
  const areLoading = useRef(areLoadingAlbums);
  const [currentPage, setCurrentPage] = useState(1);
  const albumsLength = useRef(Number.MAX_VALUE);
  const currentAlbumsLength = useRef(0);
  const [fetch, setFetch] = useState(true);

  useEffect(() => {
    if (fetch) {
      dispatch(fetchAlbums({ limit: 8, page: currentPage }))
        .then(({ payload }) => {
          setCurrentPage((prevPage) => prevPage + 1);

          albumsLength.current = Number(payload.headers["x-total-count"]);

          currentAlbumsLength.current = Object.values(albums).length;
        })
        .finally(() => {
          areLoading.current = areLoadingAlbums;
          setFetch(false);
        });
    }
  }, [fetch]);

  useEffect(() => {
    const scrollHandler = () => {
      if (
        document.body.scrollHeight -
          (document.body.scrollTop + window.innerHeight) <
          100 &&
        currentAlbumsLength.current < albumsLength.current
      ) {
        if (!fetch) {
          setFetch(true);
        }
      }
      setScrolling(!scrolling);
    };

    window.addEventListener("scroll", scrollHandler);
    return function () {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [scrolling]);

  return (
    <>
      <div id="albumsWrap" className={styles.root}>
        {Object.values(albums).map((album) => (
          <div key={album.id} className={styles.album}>
            <Album album={album} />
          </div>
        ))}
      </div>
    </>
  );
};
