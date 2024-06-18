import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchFilms = async (search) => {
  let res = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${API_KEY}`
  );
  return res;
};
