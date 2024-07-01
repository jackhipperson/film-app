import search from "./icons/search.svg";
import list from "./icons/list.svg";
import fav0 from "./icons/fav0.svg";
import thumb from "./icons/thumb.svg";
import login from "./icons/login.svg";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const smallScreen = screenWidth <= "640";


  return (
    <div className="sticky top-0 bg-yellow-500 border-b-2 border-yellow-900">
      <div className="flex content-stretch m-auto max-w-6xl">
        <div className="p-4">
          <h1 className="text-md md:text-2xl">Film App</h1>
        </div>
        <div className="flex ml-auto items-center text-right text-sm">
          <NavLink
            to="/search"
            className={({isActive}) => isActive ? "p-2 cursor-pointer bg-yellow-600 rounded-sm" : "p-2 cursor-pointer hover:bg-yellow-600 rounded-sm"}
          >
            {smallScreen ? (
              <img src={search} alt="Search" title="Search" width="40px" />
            ) : (
              <p>Search</p>
            )}
          </NavLink>
          <NavLink
            to="/watchlist"
            className={({isActive}) => isActive ? "p-2 cursor-pointer bg-yellow-600 rounded-sm" : "p-2 cursor-pointer hover:bg-yellow-600 rounded-sm"}
          >
            {smallScreen ? (
              <img src={list} alt="WatchList" title="WatchList" width="40px" />
            ) : (
              <p>Watch List</p>
            )}
          </NavLink>
          <NavLink
            to="/favourites"
            className={({isActive}) => isActive ? "p-2 cursor-pointer bg-yellow-600 rounded-sm" : "p-2 cursor-pointer hover:bg-yellow-600 rounded-sm"}
          >
            {smallScreen ? (
              <img
                src={fav0}
                alt="Favourites"
                title="Favourites"
                width="40px"
              />
            ) : (
              <p>Favourites</p>
            )}
          </NavLink>
          <NavLink
            to="/recommended"
            className={({isActive}) => isActive ? "p-2 cursor-pointer bg-yellow-600 rounded-sm" : "p-2 cursor-pointer hover:bg-yellow-600 rounded-sm"}
          >
            {smallScreen ? (
              <img
                src={thumb}
                alt="Recommended"
                title="Recommended"
                width="40px"
              />
            ) : (
              <p>Recommended</p>
            )}
          </NavLink>
          <NavLink
            to="/login"
            className={({isActive}) => isActive ? "p-2 cursor-pointer bg-yellow-600 rounded-sm" : "p-2 cursor-pointer hover:bg-yellow-600 rounded-sm"}
          >
            {smallScreen ? (
              <img src={login} alt="Log In" title="Log In" width="40px" />
            ) : (
              <p>Log In</p>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
