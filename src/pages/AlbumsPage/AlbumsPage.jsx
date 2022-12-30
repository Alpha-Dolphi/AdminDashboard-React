import React from "react";
import { Albums } from "../../components/Albums/Albums";
import { Heading } from "../../components/Heading/Heading";

const AlbumsPage = () => {
  return (
    <>
      <Heading name={"ALBUMS PAGE"} />
      <Albums />
    </>
  );
};

export default AlbumsPage;
