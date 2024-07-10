import React from "react"
import { render, screen } from "@testing-library/react"
import HelpItem from "./HelpItem"

describe("HelpItem component", () => {
    test("helpitem renders correctly", () => {
        render(<HelpItem icon="search.svg" title="Search">This is the search item.</HelpItem>)
        expect(screen.getByText("Search")).toBeInTheDocument()
        expect(screen.getByAltText("Search")).toBeInTheDocument()
        expect(screen.getByText("This is the search item.")).toBeInTheDocument()
    })
})