import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import FilmContext, { FilmContextType } from "../contexts/FilmContext";
import FilmItem from "./FilmItem";
import { populate } from "dotenv";

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
  vote_average: 7.68,
  release_date: "2022-02-23",
  poster_path: "74xTEgt7R36Fpooo50r9T25onhq.jpg",
  popularity:5
};

// Mock App Context
const mockFilmContextValue = {
  favList: [],
  watchList: [],
  setSelectedFilmHandler: jest.fn(),
  toggleModal: jest.fn(),
  addWatchList: jest.fn(),
  addFavList: jest.fn(),
  smallScreen: false,
  selectedFilm: null,
  watchFilms: [],
  modalOpen: false,
  isLoading: false,
  apiError: null,
  setLoadingHandler: jest.fn(),
  setApiErrorHandler: jest.fn(),
  favFilms: [],
  recommendedFilms: []
};

describe("FilmItem Component", () => {
  const renderFilmItem = (
    film: typeof mockFilmData = mockFilmData,
    context: FilmContextType = mockFilmContextValue
  ) => {
    return render(
      <FilmContext.Provider value={context}>
        <FilmItem film={film} />
      </FilmContext.Provider>
    );
  };

  test("FilmItem renders correctly", () => {
    renderFilmItem();
    expect(
      screen.getByText(
        /Berserk: The Golden Age Arc II - The Battle for Doldrey/i
      )
    ).toBeInTheDocument();
    expect(screen.getByText("2022")).toBeInTheDocument();
    expect(
      screen.getByText(
        "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as ..."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(
        "Berserk: The Golden Age Arc II - The Battle for Doldrey"
      )
    ).toBeInTheDocument();
    expect(screen.getByAltText("Favourite")).toBeInTheDocument();
    expect(screen.getByAltText("Watch List")).toBeInTheDocument();
  });

  test("Renders correctly on small screen. Title and overview truncate correctly", () => {
    const smallScreenContext = {...mockFilmContextValue, smallScreen: true}
    renderFilmItem(mockFilmData, smallScreenContext);
    expect(
      screen.getByText(/Berserk: The Golden Age Arc II - The Battle for Do.../i)
    ).toBeInTheDocument();
    expect(screen.getByText(/(2022)/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while fa..."
      )
    ).toBeInTheDocument();
    expect(screen.getByAltText("Favourite")).toBeInTheDocument();
    expect(screen.getByAltText("Watch List")).toBeInTheDocument();
  });

  test("Clicking Favourite button calls the addFavList function", () => {
    renderFilmItem();
    const favButton = screen.getByAltText("Favourite");
    act(() => {
      fireEvent.click(favButton);
    });
    expect(mockFilmContextValue.addFavList).toHaveBeenCalledWith(
      mockFilmData.id
    );
  });

  test("Clicking Watch List button calls the addWatchList function", () => {
    renderFilmItem();
    const favButton = screen.getByAltText("Watch List");
    act(() => {
      fireEvent.click(favButton);
    });
    expect(mockFilmContextValue.addWatchList).toHaveBeenCalledWith(
      mockFilmData.id
    );
  });

  test("Clicking Title opens Modal", () => {
    renderFilmItem()
    const clickedItem = screen.getByText(/Berserk: The Golden Age Arc II - The Battle for Doldrey/i)
    act(() => {
        fireEvent.click(clickedItem)
    })
    expect(mockFilmContextValue.toggleModal).toHaveBeenCalled()
    expect(mockFilmContextValue.setSelectedFilmHandler).toHaveBeenCalledWith(mockFilmData)
  })

  test("Clicking Image opens Modal", () => {
    renderFilmItem()
    const clickedItem = screen.getByAltText(/Berserk: The Golden Age Arc II - The Battle for Doldrey/i)
    act(() => {
        fireEvent.click(clickedItem)
    })
    expect(mockFilmContextValue.toggleModal).toHaveBeenCalled()
    expect(mockFilmContextValue.setSelectedFilmHandler).toHaveBeenCalledWith(mockFilmData)
  })

  test("Clicking Overview opens Modal", () => {
    renderFilmItem()
    const clickedItem = screen.getByText(/In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as/i)
    act(() => {
        fireEvent.click(clickedItem)
    })
    expect(mockFilmContextValue.toggleModal).toHaveBeenCalled()
    expect(mockFilmContextValue.setSelectedFilmHandler).toHaveBeenCalledWith(mockFilmData)
  })
});
