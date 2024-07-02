import { MemoryRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import { act, fireEvent, render, screen } from "@testing-library/react";

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
    fireEvent(window, new Event("resize"));
    expect(screen.getByText("Film App")).toBeInTheDocument();
    expect(screen.getByAltText("Search")).toBeInTheDocument();
    expect(screen.getByAltText("Watch List")).toBeInTheDocument();
    expect(screen.getByAltText("Favourites")).toBeInTheDocument();
    expect(screen.getByAltText("Recommended")).toBeInTheDocument();
    expect(screen.getByAltText("Log In")).toBeInTheDocument();
  });

  test("Renders with icons on smaller screens", () => {
    window.innerWidth = 500;
    renderHeader();
    expect(screen.getByText("Film App")).toBeInTheDocument();
    expect(screen.getByAltText("Search")).toBeInTheDocument();
    expect(screen.getByAltText("Watch List")).toBeInTheDocument();
    expect(screen.getByAltText("Favourites")).toBeInTheDocument();
    expect(screen.getByAltText("Recommended")).toBeInTheDocument();
    expect(screen.getByAltText("Log In")).toBeInTheDocument();
  });

  test("Links have correct paths", () => {
    renderHeader();
    expect(screen.getByText("Search").parentElement).toHaveAttribute(
      "href",
      "/search"
    );
    expect(screen.getByText("Watch List").parentElement).toHaveAttribute(
      "href",
      "/watchlist"
    );
    expect(screen.getByText("Favourites").parentElement).toHaveAttribute(
      "href",
      "/favourites"
    );
    expect(screen.getByText("Recommended").parentElement).toHaveAttribute(
      "href",
      "/recommended"
    );
    expect(screen.getByText("Log In").parentElement).toHaveAttribute(
      "href",
      "/login"
    );
  });

  test("Active class works correctly", () => {
    renderHeader();
    // Check none have the active class first
    expect(screen.getByText("Search").parentElement).not.toHaveClass(
      "bg-yellow-600"
    );
    expect(screen.getByText("Watch List").parentElement).not.toHaveClass(
      "bg-yellow-600"
    );
    expect(screen.getByText("Favourites").parentElement).not.toHaveClass(
      "bg-yellow-600"
    );
    expect(screen.getByText("Recommended").parentElement).not.toHaveClass(
      "bg-yellow-600"
    );
    expect(screen.getByText("Log In").parentElement).not.toHaveClass(
      "bg-yellow-600"
    );
    act(() => {
      fireEvent.click(screen.getByText("Search"));
    });
    expect(screen.getByText("Search").parentElement).toHaveClass(
      "bg-yellow-600"
    );
    act(() => {
      fireEvent.click(screen.getByText("Watch List"));
    });
    expect(screen.getByText("Watch List").parentElement).toHaveClass(
      "bg-yellow-600"
    );
    act(() => {
      fireEvent.click(screen.getByText("Favourites"));
    });
    expect(screen.getByText("Favourites").parentElement).toHaveClass(
      "bg-yellow-600"
    );
    act(() => {
      fireEvent.click(screen.getByText("Recommended"));
    });
    expect(screen.getByText("Recommended").parentElement).toHaveClass(
      "bg-yellow-600"
    );
    act(() => {
      fireEvent.click(screen.getByText("Log In"));
    });
    expect(screen.getByText("Log In").parentElement).toHaveClass(
      "bg-yellow-600"
    );
  });
});
