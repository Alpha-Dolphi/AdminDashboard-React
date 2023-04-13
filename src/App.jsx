import React, { Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { NotFound } from "./pages/NotFound/NotFound";
import { store } from "./store";
import styles from "./styles.module.css";
import { HomePage } from "./pages/HomePage/HomePage";

const App = () => {
  useEffect(() => {
    document.body.classList.add(styles.default);
  }, []);

  const PostsPage = React.lazy(() => import("./pages/PostsPage/PostsPage"));
  const PostPage = React.lazy(() => import("./pages/PostPage/PostPage"));
  const TodosPage = React.lazy(() => import("./pages/TodosPage/TodosPage"));
  const AlbumsPage = React.lazy(() => import("./pages/AlbumsPage/AlbumsPage"));

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Layout>
          <Suspense
            fallback={<div style={{ width: "100%", height: "100%" }}></div>}
          >
            <Routes>
              <Route index path="/" element={<HomePage />}></Route>
              <Route path="/posts" element={<PostsPage />}></Route>
              <Route path="/posts/:postId" element={<PostPage />} />
              <Route path="/todos" element={<TodosPage />}></Route>
              <Route path="/albums" element={<AlbumsPage />}></Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
