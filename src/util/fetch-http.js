const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchFilms = async (search) => {
  let res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${API_KEY}`
  );
  console.log(res);
  return res;
};
