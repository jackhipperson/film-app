import FilmItem from "./FilmItem";

const Results = ({ searchResults }) => {
  return (
    <ul>
      {searchResults.length > 0 &&
        searchResults.map((item) => {
          return <FilmItem film={item} />;
        })}
    </ul>
  );
};

export default Results;
