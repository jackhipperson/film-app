import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./routes/App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./routes/RootLayout";
import LogIn from "./components/LogIn";
import Results from "./components/Results";
import Search from "./routes/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/search", element: <Search title="Search" /> },
      { path: "/login", element: <LogIn /> },
      { path: "/watchlist", element: <Results title="WatchList" enteredSearch="none" /> },
      { path: "/favourites", element: <Results title="Favourites" enteredSearch="none" /> },
      { path: "/recommended", element: <Results title="Recommended" enteredSearch="none" /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
