const {
  screen,
  render,
  fireEvent,
  waitFor,
} = require("@testing-library/react");
const { default: Search } = require("./Search");
import { fetchFilms } from "../util/fetch-http";

jest.mock("../util/fetch-http");

describe("Search Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("searchbar renders", () => {
    render(<Search />);
    const inputElement = screen.getByPlaceholderText(/Enter a film name.../i);
    expect(inputElement).toBeInTheDocument();
  });

  test("input updates on value change", () => {
    render(<Search />);
    const inputElement = screen.getByPlaceholderText(/Enter a film name.../i);
    fireEvent.change(inputElement, { target: { value: "Batman" } });
    expect(inputElement.value).toBe("Batman");
  });

  test("shows loading screen whilst searching", async () => {
    fetchFilms.mockResolvedValueOnce({ status: 200, data: { results: [] } });
    render(<Search />);
    const inputElement = screen.getByPlaceholderText(/Enter a film name.../i);
    fireEvent.change(inputElement, { target: { value: "Bat" } });
    await waitFor(() =>
      expect(screen.getByText(/Loading.../)).toBeInTheDocument()
    );
  });

  test("results render on sucessful API call", async () => {
    fetchFilms.mockResolvedValueOnce({
      status: 200,
      data: { results: [{ title: "Batman" }, { title: "Batman Returns" }] },
    });
    render(<Search />);
    const inputElement = screen.getByPlaceholderText(/Enter a film name.../i);
    fireEvent.change(inputElement, { target: { value: "Batm" } });
    await waitFor(() => {
      expect(screen.getByText(/batman returns/i)).toBeInTheDocument();
    });
  });
});
