import React from "react";
import { render, screen } from "@testing-library/react";
import Help from "./Help";

describe("Help component", () => {
  test("check help renders correctly", () => {
    render(<Help />)
    expect(screen.getByText("Film App!")).toBeInTheDocument();
    expect(screen.getAllByText("Search").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Favourites").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Watch List").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Recommended").length).toBeGreaterThan(0);
    expect(
      screen.getByText(
        "Welcome to the Film App! You can Search for films, save the films you love to your Favourites, get suggestions based on your Favourites and save them in your WatchList for later!"
      )
    ).toBeInTheDocument();
    expect(screen.getAllByAltText("Search").length).toBeGreaterThan(0);
    expect(screen.getAllByAltText("Favourites").length).toBeGreaterThan(0);
    expect(screen.getAllByAltText("Watch List").length).toBeGreaterThan(0);
    expect(screen.getAllByAltText("Recommended").length).toBeGreaterThan(0);
  });
});
