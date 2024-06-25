import { createContext } from "react"

const FilmContext = createContext({
    selectedFilm:'',
    setSelectedFilmItem: (id) => {}
})

export default FilmContext