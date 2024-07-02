import { MemoryRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import { fireEvent, render, screen } from "@testing-library/react";

// mock header icons
jest.mock("./icons/search.svg", () => "search-icon");
jest.mock("./icons/list.svg", () => "list-icon");
jest.mock("./icons/fav0.svg", () => "fav-icon");
jest.mock("./icons/thumb.svg", () => "thumb-icon");
jest.mock("./icons/login.svg", () => "login-icon");

describe("Header Component", (initialEntries = ["/"]) => {
  const renderHeader = () => {
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="*" element={<Header />} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    // reset window size before each test
    window.innerWidth = 1024;
  });

  test("Header renders with title and text links (1024px)", () => {
    renderHeader();
    expect(screen.getByText("Film App")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Watch List")).toBeInTheDocument();
    expect(screen.getByText("Favourites")).toBeInTheDocument();
    expect(screen.getByText("Recommended")).toBeInTheDocument();
    expect(screen.getByText("Log In")).toBeInTheDocument();
  });

  test("Title and links still there on resize", () => {
    renderHeader();
    expect(screen.getByText("Film App")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Watch List")).toBeInTheDocument();
    expect(screen.getByText("Favourites")).toBeInTheDocument();
    expect(screen.getByText("Recommended")).toBeInTheDocument();
    expect(screen.getByText("Log In")).toBeInTheDocument();
    window.innerWidth = 500;
    fireEvent(window, new Event('resize'))
    expect(screen.getByText("Film App")).toBeInTheDocument();
    expect(screen.getByAltText("Search")).toBeInTheDocument();
    expect(screen.getByAltText("Watch List")).toBeInTheDocument();
    expect(screen.getByAltText("Favourites")).toBeInTheDocument();
    expect(screen.getByAltText("Recommended")).toBeInTheDocument();
    expect(screen.getByAltText("Log In")).toBeInTheDocument();
  });

  test("Renders with icons on smaller screens", () => {
    window.innerWidth = 500
    renderHeader()
    expect(screen.getByText("Film App")).toBeInTheDocument();
    expect(screen.getByAltText("Search")).toBeInTheDocument();
    expect(screen.getByAltText("Watch List")).toBeInTheDocument();
    expect(screen.getByAltText("Favourites")).toBeInTheDocument();
    expect(screen.getByAltText("Recommended")).toBeInTheDocument();
    expect(screen.getByAltText("Log In")).toBeInTheDocument();
  })

  test("Links have correct paths")
});

