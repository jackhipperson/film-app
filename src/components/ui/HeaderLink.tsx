import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import FilmContext from "../../contexts/FilmContext";

interface headerProps { link: string, icon: string, title: string }

const HeaderLink: React.FC<headerProps> = ({link, icon, title}) => {
  const { smallScreen } = useContext(FilmContext);
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        isActive
          ? "p-2 cursor-pointer bg-yellow-600 rounded-sm"
          : "p-2 cursor-pointer hover:bg-yellow-600 rounded-sm"
      }
    >
      {smallScreen ? (
        <img src={icon} alt={title} title={title} width="40px" />
      ) : (
        <p>{title}</p>
      )}
    </NavLink>
  );
};

export default HeaderLink;
