import { render, screen } from "@testing-library/react";
import FilmContext from "../contexts/FilmContext";
import Modal from "./Modal";
import ReactDOM from "react-dom";

const mockFilmContext = {
  toggleModal: true,
  favList: [],
  watchList: [],
  selectedFilm: [
    {
      id: 1,
      title: "Inception",
      overview:
        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
      rating: 8.8,
      release_date: "2010-07-16",
      poster_path: "qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
    },
  ],
  toggleModal: jest.fn,
  addWatchList: jest.fn,
  addFavList: jest.fn,
  setApiErrorHandler: jest.fn,
  setLoadingHandler: jest.fn
};

ReactDOM.createPortal = jest.fn((element, node) => element)

const renderModal = (contextValue) => {
    render(
        <FilmContext.Provider value={contextValue} >
            <Modal />
        </FilmContext.Provider>
    )
}

describe("Modal Component", () => {
    test("modal renders correctly", () => {
        renderModal(mockFilmContext)
        expect(screen.getByText("Inception")).toBeInTheDocument()
    })
})
