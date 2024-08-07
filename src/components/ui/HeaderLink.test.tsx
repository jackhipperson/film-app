import React from "react";
import { render, screen } from "@testing-library/react";
import FilmContext, {FilmContextType} from "../../contexts/FilmContext";
import HeaderLink from "./HeaderLink";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const renderWithRouter = (ui: React.ReactElement, { route = "/" } = {}) => {
  window.history.pushState({}, "Test Page", route);
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
};

describe("HeaderLink component", () => {
  test("headerlink renders correctly", () => {
    renderWithRouter(
      <FilmContext.Provider value={{ smallScreen: false } as FilmContextType}>
        <HeaderLink link="/test-link" icon="test-icon.svg" title="Test Title" />
      </FilmContext.Provider>
    );
    const navLink = screen.getByText("Test Title").closest("a");
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.queryByAltText("Test Title")).not.toBeInTheDocument();
    expect(screen.queryByTitle("Test Title")).not.toBeInTheDocument();
    expect(navLink).toHaveClass("hover:bg-yellow-600");
  });

  test("headerlink renders correctly on small screen", () => {
    renderWithRouter(
      <FilmContext.Provider value={{ smallScreen: true } as FilmContextType}>
        <HeaderLink link="/test-link" icon="test-icon.svg" title="Test Title" />
      </FilmContext.Provider>
    );
    const navLink = screen.getByTitle("Test Title").closest("a");
    expect(screen.getByAltText("Test Title")).toBeInTheDocument();
    expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
    expect(screen.getByTitle("Test Title")).toBeInTheDocument();
    expect(navLink).toHaveClass("hover:bg-yellow-600");
  });

  test("active headerlink renders correctly", () => {
    renderWithRouter(
      <FilmContext.Provider value={{ smallScreen: false } as FilmContextType}>
        <Routes>
          <Route
            path="/test-link"
            element={
              <HeaderLink
                link="/test-link"
                icon="test-icon.svg"
                title="Test Title"
              />
            }
          />
        </Routes>
      </FilmContext.Provider>,
      { route: "/test-link" }
    );
    const navLink = screen.getByText("Test Title").closest("a");
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.queryByAltText("Test Title")).not.toBeInTheDocument();
    expect(screen.queryByTitle("Test Title")).not.toBeInTheDocument();
    expect(navLink).toHaveClass("bg-yellow-600");
  });

  test("active headerlink renders correctly on small screen", () => {
    renderWithRouter(
      <FilmContext.Provider value={{ smallScreen: true } as FilmContextType}>
        <Routes>
          <Route
            path="/test-link"
            element={
              <HeaderLink
                link="/test-link"
                icon="test-icon.svg"
                title="Test Title"
              />
            }
          />
        </Routes>
      </FilmContext.Provider>,
      { route: "/test-link" }
    );
    const navLink = screen.getByAltText("Test Title").closest("a");
    expect(screen.getByAltText("Test Title")).toBeInTheDocument();
    expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
    expect(screen.getByTitle("Test Title")).toBeInTheDocument();
    expect(navLink).toHaveClass("bg-yellow-600");
  });
});
