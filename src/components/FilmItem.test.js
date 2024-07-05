import { act, render, screen } from "@testing-library/react";
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
  title: "Berserk: The Golden Age Arc II - The Battle for Doldrey",
  overview:
    "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
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

describe("FilmItem Component", () => {
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

  beforeEach(() => {
    act(() => {
      global.innerWidth = "1024";
      global.dispatchEvent(new Event("resize"));
    });
  });

  test("FilmItem renders correctly", () => {
    renderFilmItem();
    expect(
      screen.getByText(
        /Berserk: The Golden Age Arc II - The Battle for Doldrey/i
      )
    ).toBeInTheDocument();
    expect(screen.getByText("2022")).toBeInTheDocument()
    expect(
      screen.getByText(
        "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as ..."
      )
    ).toBeInTheDocument();
    expect(screen.getByAltText("Berserk: The Golden Age Arc II - The Battle for Doldrey")).toBeInTheDocument();
    expect(screen.getByAltText("Favourite")).toBeInTheDocument();
    expect(screen.getByAltText("Watch List")).toBeInTheDocument();
  });

  test("Title and overview truncate correctly", () => {
    act(() => {
      global.innerWidth = 600;
      global.dispatchEvent(new Event("resize"));
    });
    renderFilmItem();
    expect(
      screen.getByText(/Berserk: The Golden Age Arc II - The Battle for Do.../i)
    ).toBeInTheDocument();
    expect(screen.getByText(/(2022)/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while fa..."
      )
    ).toBeInTheDocument();
  });
});
