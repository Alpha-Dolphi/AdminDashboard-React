import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { NotFound } from "./pages/NotFound/NotFound";
import { PostsPage } from "./pages/PostsPage/PostsPage";
import { TodosPage } from "./pages/TodosPage/TodosPage";
import { AlbumsPage } from "./pages/AlbumsPage/AlbumsPage";
import { store } from "./store";
import styles from "./styles.module.css";

const App = () => {
    useEffect(() => {
        document.body.classList.add(styles.default);
      }, []);

    return <BrowserRouter>
        <Provider store={store}>
            <div>
                <Layout>
                    <Routes>
                        <Route index path="/posts" element={<PostsPage />}></Route>
                        <Route path="/todos" element={<TodosPage />}></Route>
                        <Route path="/albums" element={<AlbumsPage />}></Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Layout>
            </div>
        </Provider>
    </BrowserRouter>
};

export default App;