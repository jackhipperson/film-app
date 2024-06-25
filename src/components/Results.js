import FilmItem from "./FilmItem";

const Results = ({ searchResults, toggleModal }) => {
  return (
    <ul>
      {searchResults.length > 0 &&
        searchResults.map((item) => {
          return <FilmItem key={item.id} film={item} toggleModal={toggleModal} />;
        })}
    </ul>
  );
};

export default Results;
