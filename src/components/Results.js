import FilmItem from "./FilmItem";

const Results = ({ searchResults }) => {
  return (
    <ul>
      {searchResults.length > 0 &&
        searchResults.map((item) => {
          return <FilmItem key={item.id} film={item} />;
        })}
    </ul>
  );
};

export default Results;
