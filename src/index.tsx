import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./routes/App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./routes/RootLayout";
import Help from "./components/Help";
import Results from "./components/Results";
import Search from "./components/Search";

interface RouteConfig {
  path: string,
  element: JSX.Element
  children?: RouteConfig[]
}

const routerConfig: RouteConfig[] =[
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/search", element: <Search /> },
      { path: "/help", element: <Help /> },
      { path: "/watchlist", element: <Results title="WatchList" enteredSearch="none" searchResults={[]} /> },
      { path: "/favourites", element: <Results title="Favourites" enteredSearch="none" searchResults={[]}  /> },
      { path: "/recommended", element: <Results title="Recommended" enteredSearch="none" searchResults={[]}  /> },
    ],
  }
]
const router = createBrowserRouter(routerConfig)

const rootElement = document.getElementById('root')

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
root.render(<RouterProvider router={router} />);
} else {
  console.log("Root element with id 'root' not found.");
  
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
