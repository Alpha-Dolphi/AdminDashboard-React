import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Albums } from "../../components/Albums/Albums";
import { fetchAlbums } from "../../store/album";
import { selectAreAlbumsLoading } from "../../store/album/selectors";
import { fetchPhotos } from "../../store/photo";
import { selectArePhotosLoading } from "../../store/photo/selectors";

export const AlbumsPage = () => {
    const dispatch = useDispatch();
    const isLoadingAlbums = useSelector(selectAreAlbumsLoading);


    useEffect(() => {
        dispatch(fetchAlbums());
    }, []);

    if (isLoadingAlbums) {
      return <div>Loading...</div>;
    }

    return (
        <>
            <Albums />
            <Outlet />
        </>
    )
}
