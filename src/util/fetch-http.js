

const API_KEY = process.env.REACT_APP_API_KEY

export const fetchFilms = async (search) => {
  let results = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}?query=${search}`);

  return results.json();
};
