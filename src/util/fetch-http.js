const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchFilms = async (search) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${API_KEY}`
  )

  const data = await res.json() 
  const status = res.status

  const results = {
    data: data,
    status: status
  }

  return results;
};