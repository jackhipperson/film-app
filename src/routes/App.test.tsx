import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  test("app component renders with help", () => {
    render(<App />);
    const sectionTitles: string[] = [
      "Search",
      "Favourites",
      "Watch List",
      "Recommended",
    ];
    expect(screen.getByText("Film App!")).toBeInTheDocument();
    expect(screen.getAllByText("Search").length).toBeGreaterThan(0);
    sectionTitles.forEach((title) => {
      expect(screen.getAllByText(title).length).toBeGreaterThan(0);
    });
    expect(
      screen.getByText(
        "Welcome to the Film App! You can Search for films, save the films you love to your Favourites, get suggestions based on your Favourites and save them in your WatchList for later!"
      )
    ).toBeInTheDocument();
  });
});
