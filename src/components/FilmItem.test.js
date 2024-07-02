import { render, screen } from "@testing-library/react";
import FilmContext from "../contexts/FilmContext";
import FilmItem from "./FilmItem";

// Mock the icons
jest.mock("./icons/add.svg", () => "add.svg");
jest.mock("./icons/fav0.svg", () => "fav0.svg");
jest.mock("./icons/fav1.svg", () => "fav1.svg");
jest.mock("./icons/rem.svg", () => "rem.svg");

// Mock film data
const mockFilmData = {
  id: 1,
  title: "A Movie",
  overview:
    "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.. In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
  rating: 7.68,
  release_date: "2022-02-23",
  poster_path: "74xTEgt7R36Fpooo50r9T25onhq.jpg",
};

// Mock App Context
const mockFilmContextValue = {
  favList: [],
  watchList: [],
  setSelectedFilmHandler: jest.fn(),
  toggleModal: jest.fn(),
  addWatchList: jest.fn(),
  addFavList: jest.fn(),
};

const renderFilmItem = (
  film = mockFilmData,
  context = mockFilmContextValue
) => {
  return render(
    <FilmContext.Provider value={context}>
      <FilmItem film={film} />
    </FilmContext.Provider>
  );
};

describe("FilmItem Component", () => {
  test("FilmItem renders correctly", () => {
    renderFilmItem();
    expect(screen.getByText(/A Movie/i)).toBeInTheDocument();
    expect(screen.getByText(/(2022)/i)).toBeInTheDocument();
    expect(
      screen.getByText(/In his second year of fighting crime,/i)
    ).toBeInTheDocument();
    const img = screen.getByAltText(/A Movie/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg"
    );
  });
});
