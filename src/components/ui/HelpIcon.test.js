import { render, screen } from "@testing-library/react"
import HelpIcon from "./HelpIcon"


describe("HelpIcon component", () => {
    test("helpicon renders correctly", () => {
        render(<HelpIcon icon="search.svg" title="Search" />)
        expect(screen.getByAltText("Search")).toBeInTheDocument()
        expect(screen.getByTitle("Search")).toBeInTheDocument()
    })
})