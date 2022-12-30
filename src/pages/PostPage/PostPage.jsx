import React from "react";
import "./styles.css";
import { Heading } from "../../components/Heading/Heading";
import { PostPageContent } from "../../components/PostPageContent/PostPageContent";

export const PostPage = () => {
  return (
    <>
      <Heading name={"POST PAGE"} searchOption={false} />
      <PostPageContent />
    </>
  );
};
