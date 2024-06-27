import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import FilmProvider from "../contexts/FilmProvider";

const RootLayout = () => {
  return (
    <FilmProvider>
      <Header />
      <Outlet />
    </FilmProvider>
  );
};

export default RootLayout
