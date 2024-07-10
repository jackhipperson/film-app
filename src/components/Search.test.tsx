import React from "react";
const {
  act,
  screen,
  render,
  fireEvent,
  waitFor,
} = require("@testing-library/react");
import Search from "./Search";

import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ApiResponse, fetchFilms } from "../util/fetch-http";

jest.mock("../util/fetch-http");

describe("Search Component", () => {
  const renderSearch = (initialEntries: string[] = ["/search"]) => {
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="*" element={<Search />} />
        </Routes>
      </MemoryRouter>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("searchbar renders", () => {
    renderSearch();
    const inputElement = screen.getByPlaceholderText(/Enter a film search.../i);
    expect(inputElement).toBeInTheDocument();
  });

  test("input updates on value change", async () => {
    renderSearch();
    const inputElement = screen.getByPlaceholderText(/Enter a film search.../i);
    act(() => {
      fireEvent.change(inputElement, { target: { value: "Batman" } });
    });
    await waitFor(() => {
      expect(inputElement.value).toBe("Batman");
    });
  });

  test("results render on sucessful API call", async () => {
    const mockApiResponse: ApiResponse = {
      status: 200,
      data: [
        {
          id: 272,
          overview:
            "Driven by tragedy, billionaire Bruce Wayne dedicates his life to uncovering and defeating the corruption that plagues his home, Gotham City. Unable to work within the system, he instead creates a new identity, a symbol of fear for the criminal underworld - The Batman.",
          popularity: 111.408,
          poster_path: "/4MpN4kIEqUjW8OPtOQJXlTdHiJV.jpg",
          release_date: "2005-06-10",
          title: "Batman Begins",
          vote_average: 7.707,
        },
      ],
    };

    (fetchFilms as jest.Mock).mockResolvedValueOnce(mockApiResponse);
    renderSearch();
    const inputElement = screen.getByPlaceholderText(/Enter a film search.../i);
    act(() => {
      fireEvent.change(inputElement, { target: { value: "Batm" } });
    });
    await waitFor(() => {
      expect(screen.getByText(/batman begins/i)).toBeInTheDocument();
    });
  });
});
