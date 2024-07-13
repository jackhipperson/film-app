import searchIcon from "./icons/search.svg";
import watchListIcon from "./icons/list.svg";
import favIcon from "./icons/fav0.svg";
import recommendedIcon from "./icons/thumb.svg";
import HelpItem from "./ui/HelpItem";
import HelpIcon from "./ui/HelpIcon";
import githubLogo from './icons/github.svg'
import React from "react";

const Help: React.FC = () => {
  return (
    <div className="flex flex-col my-12 max-w-[90%] p-16 lg:max-w-4xl mx-auto border border-yellow-800 rounded-xl text-center bg-white">
      <div>
        <h2 className="text-3xl p-4">Film App!</h2>
      </div>

      <div className="p-2">
        <p className="text-base ">
          Welcome to the Film App! You can Search for films, save the films you
          love to your Favourites, get suggestions based on your Favourites and
          save them in your WatchList for later!
        </p>
      </div>
      <div className="flex flex-col mt-10 mx-auto items-center text-sm">
        <HelpItem icon={searchIcon} title="Search">
          Search for films by entering at least 3 characters into the search
          bar. You can save to favourites by clicking the heart
          <HelpIcon icon={favIcon} title="Heart" /> icon or add to your
          WatchList by clicking the list
          <HelpIcon icon={watchListIcon} title="List" /> icon
        </HelpItem>
        <HelpItem icon={favIcon} title="Favourites">
          You can add or remove any film from your favourites list by clicking
          the heart <HelpIcon icon={favIcon} title="Heart" /> icon. This will
          help populate your Recommended films, see these by clicking
          Recommended <HelpIcon icon={recommendedIcon} title="Recommended" />
        </HelpItem>
        <HelpItem icon={recommendedIcon} title="Recommended">
          Recommendations are based on the films that you have saved in your
          Favourites <HelpIcon icon={favIcon} title="Heart" /> list. Browse
          through films and add any that are interesting to your Watch List by
          clicking the list <HelpIcon icon={watchListIcon} title="List" />
        </HelpItem>

        <HelpItem icon={watchListIcon} title="Watch List">
          You can add or remove any film from your watch list by clicking the
          list <HelpIcon icon={watchListIcon} title="List" /> icon. Once you
          have watched the film you can remove by clicking the icon again, and
          don't forget to click the heart
          <HelpIcon icon={favIcon} title="Heart" /> icon to add it to your
          Favourites and make your recommendations better!
        </HelpItem>
      </div>
      <div className="mt-4">
        <p>Created by Jack Hipperson</p>
        <a className="flex justify-center pt-2" href="https://github.com/jackhipperson" target="_blank"><img src={githubLogo} width="50px" alt="Visit my Github" title="Visit my Github" /></a>
      </div>
    </div>
  );
};

export default Help;
