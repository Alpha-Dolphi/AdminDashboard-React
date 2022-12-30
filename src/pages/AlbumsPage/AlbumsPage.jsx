import React from "react";
import { Albums } from "../../components/Albums/Albums";
import { Heading } from "../../components/Heading/Heading";

export const AlbumsPage = () => {
  return (
    <>
      <Heading name={"ALBUMS PAGE"} />
      <Albums />
    </>
  );
};
