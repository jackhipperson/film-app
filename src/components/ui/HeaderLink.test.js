import { render, screen } from "@testing-library/react";
import FilmContext from "../../contexts/FilmContext";
import HeaderLink from "./HeaderLink";
import { MemoryRouter, Route, Router, Routes } from "react-router-dom";

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test Page", route);
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
};

describe("HeaderLink component", () => {
  test("headerlink renders correctly", () => {
    renderWithRouter(
      <FilmContext.Provider value={{ smallScreen: false }}>
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
      <FilmContext.Provider value={{ smallScreen: true }}>
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
      <FilmContext.Provider value={{ smallScreen: false }}>
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
      <FilmContext.Provider value={{ smallScreen: true }}>
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
