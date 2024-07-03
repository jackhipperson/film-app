import searchIcon from "./icons/search.svg";
import watchListIcon from "./icons/list.svg";
import favIcon from "./icons/fav0.svg";
import recommendedIcon from "./icons/thumb.svg";
import loginIcon from "./icons/login.svg";
import HeaderLink from "./ui/HeaderLink";

const Header = () => {

  return (
    <div className="sticky top-0 bg-yellow-500 border-b-2 border-yellow-900">
      <div className="flex content-stretch m-auto max-w-6xl">
        <div className="p-4">
          <h1 className="text-md md:text-2xl">Film App</h1>
        </div>
        <div className="flex ml-auto items-center text-right text-sm">
          <HeaderLink
            link="/search"
            icon={searchIcon}
            title="Search"
          />
          <HeaderLink
            link="/watchlist"
            icon={watchListIcon}
            title="Watch List"
          />
          <HeaderLink
            link="/favourites"
            icon={favIcon}
            title="Favourites"
          />
          <HeaderLink
            link="/recommended"
            icon={recommendedIcon}
            title="Recommended"
          />
          <HeaderLink
            link="/login"
            icon={loginIcon}
            title="Log In"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
