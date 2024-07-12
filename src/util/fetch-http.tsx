import { filmObject } from "../contexts/FilmContext";
const API_KEY = process.env.REACT_APP_API_KEY;

export interface ApiResponse {
  data: filmObject[];
  status: number;
  message?: string;
}

export const fetchFilms = async (search: string) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${API_KEY}`
    );

    const status: number = res.status;
    if (status !== 200){
      throw new Error(`http error: status ${status}`)
    }

    const data: any = await res.json();

    const filmResults: filmObject[] = [];

    (data.results || []).forEach((film: filmObject) => {
      filmResults.push({
        id: film.id,
        title: film.title,
        overview: film.overview,
        poster_path: film.poster_path,
        release_date: film.release_date,
        vote_average: film.vote_average,
        popularity: film.popularity,
      });
    });

    const results: ApiResponse = {
      data: filmResults,
      status: status,
    };

    return results;
  } catch (error: any) {
    throw new Error(error);
  }
};

const fetchMovieData = async (id: number) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data for movie ID ${id}:`, error);
    return null;
  }
};

export const getMoviesData = async (ids: number[]) => {
  const promises = ids.map((id) => fetchMovieData(id));
  const moviesData = await Promise.all(promises);
  return moviesData
    .filter((movie) => movie !== null)
    .sort((a, b) => b.popularity - a.popularity);
};

const fetchRecommendData = async (id: number) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data for movie ID ${id}:`, error);
    return null;
  }
};

export const getRecommendData = async (ids: number[]) => {
  const numResults = 30 / ids.length || "30";
  const promises = ids.map((id) => fetchRecommendData(id));
  const moviesData = await Promise.all(promises);
  const filteredFilms = new Set();
  const favFilms = new Set(ids);
  const resultsOnly = moviesData
    .flatMap((obj) => obj.results?.slice(0, numResults))
    .filter((item) => {
      if (filteredFilms.has(item.id)) {
        return false;
      } else {
        filteredFilms.add(item.id);
        return true;
      }
    })
    .filter((item) => item !== null)
    .filter((item) => {
      if (favFilms.has(item.id)) {
        return false;
      } else {
        return true;
      }
    });

  return resultsOnly.sort((a, b) => b.popularity - a.popularity);
};
