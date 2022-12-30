import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { NotFound } from "./pages/NotFound/NotFound";
import { PostsPage } from "./pages/PostsPage/PostsPage";
import { TodosPage } from "./pages/TodosPage/TodosPage";
import { AlbumsPage } from "./pages/AlbumsPage/AlbumsPage";
import { store } from "./store";
import styles from "./styles.module.css";
import { PostPage } from "./pages/PostPage/PostPage";
import { HomePage } from "./pages/HomePage/HomePage";

const App = () => {
  useEffect(() => {
    document.body.classList.add(styles.default);
  }, []);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Layout>
          <Routes>
            <Route index path="/" element={<HomePage />}></Route>
            <Route path="/posts" element={<PostsPage />}></Route>
            <Route path="/posts/:postId" element={<PostPage />} />
            <Route path="/todos" element={<TodosPage />}></Route>
            <Route path="/albums" element={<AlbumsPage />}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
