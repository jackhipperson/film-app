import { BrowserRouter } from "react-router-dom";
import FilmContext from "../contexts/FilmContext";
import Results from "./Results";
import { render, screen } from "@testing-library/react";

const mockFilmContext = {
  isLoading: false,
  apiError: null,
  watchList: [],
  watchFilms: [],
  favList: [],
  favFilms: [],
  recommendedFilms: [],
  modalOpen: false,
};

const dummyFilms1 = [
  {
    id: 1,
    title: "Inception",
    overview:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    rating: 8.8,
    release_date: "2010-07-16",
    poster_path: "qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
  },
  {
    id: 2,
    title: "The Dark Knight",
    overview:
      "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
    rating: 9.0,
    release_date: "2008-07-18",
    poster_path: "qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    id: 3,
    title: "Interstellar",
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    rating: 8.6,
    release_date: "2014-11-07",
    poster_path: "gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
];

const dummyFilms2 = [
  {
    id: 1,
    title: "Parasite",
    overview:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    rating: 8.6,
    release_date: "2019-11-08",
    poster_path: "7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
  },
  {
    id: 2,
    title: "Joker",
    overview:
      "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime.",
    rating: 8.4,
    release_date: "2019-10-04",
    poster_path: "udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
  },
  {
    id: 3,
    title: "Avengers: Endgame",
    overview:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    rating: 8.4,
    release_date: "2019-04-26",
    poster_path: "or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  },
];

const dummyFilms3 = [
  {
    id: 1,
    title: "The Matrix",
    overview:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    rating: 8.7,
    release_date: "1999-03-31",
    poster_path: "f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  },
  {
    id: 2,
    title: "Pulp Fiction",
    overview:
      "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    rating: 8.9,
    release_date: "1994-10-14",
    poster_path: "dM2w364MScsjFf8pfMbaWUcWrR.jpg",
  },
  {
    id: 3,
    title: "The Godfather",
    overview:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    rating: 9.2,
    release_date: "1972-03-24",
    poster_path: "3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
  },
];

const dummyFilms4 = [
  {
    id: 10,
    title: "Forrest Gump",
    overview:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    rating: 8.8,
    release_date: "1994-07-06",
    poster_path: "h5J4W4veyxMXDMjeNxZI46TsHOb.jpg",
  },
  {
    id: 11,
    title: "The Shawshank Redemption",
    overview:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    rating: 9.3,
    release_date: "1994-09-22",
    poster_path: "q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
  },
  {
    id: 12,
    title: "Fight Club",
    overview:
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    rating: 8.8,
    release_date: "1999-10-15",
    poster_path: "a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg",
  },
];

// Mock the modal to test opening
jest.mock("./ui/Modal", () => () => <div data-testid="modal" />);

const renderResults = (contextValue, props) => {
  return render(
    <FilmContext.Provider value={contextValue}>
      <BrowserRouter>
        <Results {...props} />
      </BrowserRouter>
    </FilmContext.Provider>
  );
};

describe("Results Component", () => {
  // General Testing
  test("check modal opens", () => {
    const contextValue = { ...mockFilmContext, modalOpen: true };
    renderResults(contextValue, {
      searchResults: [],
      enteredSearch: "abc",
      title: "Search",
    });
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  // Search screen results
  test("search help text renders when entered search under 3 characters", () => {
    renderResults(mockFilmContext, {
      searchResults: [],
      enteredSearch: "ab",
      title: "Search",
    });
    expect(
      screen.getByText("Type 3 letters to start search")
    ).toBeInTheDocument();
  });

  test("search help text removed when entered search hits 3 characters", () => {
    renderResults(mockFilmContext, {
      searchResults: [],
      enteredSearch: "abc",
      title: "Search",
    });
    expect(screen.queryByText("Type 3 letters to start search")).toBeNull();
  });

  test("loading renders correctly", () => {
    const contextValue = { ...mockFilmContext, isLoading: true };
    renderResults(contextValue, {
      searchResults: [],
      enteredSearch: "",
      title: "Search",
    });
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("error renders correctly", () => {
    const contextValue = { ...mockFilmContext, apiError: "There was an error" };
    renderResults(contextValue, {
      searchResults: [],
      enteredSearch: "abc",
      title: "Search",
    });
    expect(screen.getByText("Error: There was an error"));
  });

  test("no results renders correctly", () => {
    renderResults(mockFilmContext, {
      searchResults: [],
      enteredSearch: "abc",
      title: "Search",
    });
    expect(screen.getByText("No results!")).toBeInTheDocument();
  });

  test("search results renders correctly", () => {
    const contextValue = {
      ...mockFilmContext,
      favFilms: dummyFilms1,
      watchFilms: dummyFilms2,
      recommendedFilms: dummyFilms4,
    };
    renderResults(contextValue, {
      searchResults: dummyFilms3,
      enteredSearch: "abc",
      title: "Search",
    });
    expect(screen.getByText(/The Matrix/)).toBeInTheDocument;
    expect(screen.getByText(/Pulp Fiction/)).toBeInTheDocument;
    expect(screen.getByText(/The Godfather/)).toBeInTheDocument;
    expect(screen.queryByText("Type 3 letters to start search")).toBeNull();
    expect(screen.queryByText("No results!")).toBeNull();
  });

  // Favourites screen tests
  test("loading renders correctly", () => {
    const contextValue = {
      ...mockFilmContext,
      isLoading: true,
      favFilms: dummyFilms1,
    };
    renderResults(contextValue, {
      searchResults: [],
      enteredSearch: "none",
      title: "Favourites",
    });
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("error renders correctly", () => {
    const contextValue = { ...mockFilmContext, apiError: "There was an error" };
    renderResults(contextValue, {
      searchResults: [],
      enteredSearch: "none",
      title: "Favourites",
    });
    expect(screen.getByText("Error: There was an error"));
  });

  test("no results renders correctly", () => {
    renderResults(mockFilmContext, {
      searchResults: [],
      enteredSearch: "none",
      title: "Favourites",
    });
    expect(screen.getByText("No results!")).toBeInTheDocument();
  });

  test("favourites results renders correctly", () => {
    const contextValue = {
      ...mockFilmContext,
      favFilms: dummyFilms1,
      watchFilms: dummyFilms2,
      recommendedFilms: dummyFilms4,
    };
    renderResults(contextValue, {
      searchResults: dummyFilms3,
      enteredSearch: "abc",
      title: "Favourites",
    });
    expect(screen.getByText(/Favourites/)).toBeInTheDocument;
    expect(screen.getByText(/Inception/)).toBeInTheDocument;
    expect(screen.getByText(/The Dark Knight/)).toBeInTheDocument;
    expect(screen.getByText(/Interstellar/)).toBeInTheDocument;
    expect(screen.queryByText("Type 3 letters to start search")).toBeNull();
    expect(screen.queryByText("No results!")).toBeNull();
  });

  // Watch List screen tests
  test("loading renders correctly", () => {
    const contextValue = {
      ...mockFilmContext,
      isLoading: true,
      watchFilms: dummyFilms1,
    };
    renderResults(contextValue, {
      searchResults: [],
      enteredSearch: "none",
      title: "WatchList",
    });
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("error renders correctly", () => {
    const contextValue = { ...mockFilmContext, apiError: "There was an error" };
    renderResults(contextValue, {
      searchResults: [],
      enteredSearch: "none",
      title: "WatchList",
    });
    expect(screen.getByText("Error: There was an error"));
  });

  test("no results renders correctly", () => {
    renderResults(mockFilmContext, {
      searchResults: [],
      enteredSearch: "none",
      title: "WatchList",
    });
    expect(screen.getByText("No results!")).toBeInTheDocument();
  });

  test("watch list results renders correctly", () => {
    const contextValue = {
      ...mockFilmContext,
      favFilms: dummyFilms1,
      watchFilms: dummyFilms2,
      recommendedFilms: dummyFilms4,
    };
    renderResults(contextValue, {
      searchResults: dummyFilms3,
      enteredSearch: "abc",
      title: "WatchList",
    });
    expect(screen.getByText(/WatchList/)).toBeInTheDocument;
    expect(screen.getByText(/Parasite/)).toBeInTheDocument;
    expect(screen.getByText(/Joker/)).toBeInTheDocument;
    expect(screen.getByText(/Avengers: Endgame/)).toBeInTheDocument;
    expect(screen.queryByText("Type 3 letters to start search")).toBeNull();
    expect(screen.queryByText("No results!")).toBeNull();
  });

  // Recommended screen tests
  test("loading renders correctly", () => {
    const contextValue = {
      ...mockFilmContext,
      isLoading: true,
      recommendedFilms: dummyFilms1,
    };
    renderResults(contextValue, {
      searchResults: [],
      enteredSearch: "none",
      title: "Recommended",
    });
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("error renders correctly", () => {
    const contextValue = { ...mockFilmContext, apiError: "There was an error" };
    renderResults(contextValue, {
      searchResults: [],
      enteredSearch: "none",
      title: "Recommended",
    });
    expect(screen.getByText("Error: There was an error"));
  });

  test("no results renders correctly", () => {
    renderResults(mockFilmContext, {
      searchResults: [],
      enteredSearch: "none",
      title: "Recommended",
    });
    expect(screen.getByText("No results!")).toBeInTheDocument();
  });

  test("recommended results renders correctly", () => {
    const contextValue = {
      ...mockFilmContext,
      favFilms: dummyFilms1,
      watchFilms: dummyFilms2,
      recommendedFilms: dummyFilms4,
    };
    renderResults(contextValue, {
      searchResults: dummyFilms3,
      enteredSearch: "abc",
      title: "Recommended",
    });
    expect(screen.getByText(/Recommended/)).toBeInTheDocument;
    expect(screen.getByText(/Forrest Gump/)).toBeInTheDocument;
    expect(screen.getByText(/The Shawshank Redemption/)).toBeInTheDocument;
    expect(screen.getByText(/Fight Club/)).toBeInTheDocument;
    expect(screen.queryByText("Type 3 letters to start search")).toBeNull();
    expect(screen.queryByText("No results!")).toBeNull();
  });
});
