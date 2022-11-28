import React from "react";
import { useSelector } from "react-redux";
import { selectAlbumEntities, selectAreAlbumsLoading } from "../../store/album/selectors";
import { Album } from "../Album/Album";
import styles from "./styles.module.css";

export const Albums = () => {
    const isLoadingAlbums = useSelector(selectAreAlbumsLoading);

    if (isLoadingAlbums) {
        return <div>Loading</div>;
    }

    const albums = useSelector(selectAlbumEntities);

  return (
    <div id="albumsWrap" className={styles.root}>
        {Object.values(albums).map(album =>
                <div key={album.id}>
                    <Album album={album}/>
                </div>
        )}
    </div>
  )
}

