import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../pages/Loading";

const MainPage = lazy(() => import("../pages/MainPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const ListPage = lazy(() => import("../pages/ListPage"));
const AddPage = lazy(() => import("../pages/AddPage"));

const Root = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <MainPage />
      </Suspense>
    ),
  },
  {
    path: "/about",
    element: (
      <Suspense fallback={<Loading />}>
        <AboutPage />
      </Suspense>
    ),
  },
  {
    path: "/todo/list",
    element: (
      <Suspense fallback={<Loading />}>
        <ListPage />
      </Suspense>
    ),
  },
  {
    path: "/todo/add",
    element: (
      <Suspense fallback={<Loading />}>
        <AddPage />
      </Suspense>
    ),
  },
]);
export default Root;
