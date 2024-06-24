import add from './icons/add.svg'
import fav0 from './icons/fav0.svg'
import fav1 from './icons/fav1.svg'
import rem from './icons/rem.svg'


const FilmItem = ({ film }) => {

    const maxLength = 150
    const longDesc = film.overview.length > maxLength

  return (
    <li
      key={film.id}
      className="bg-white mx-auto my-4 w-[90%] border-4 border-yellow-600 rounded-md"
    >
      <div className="flex-row flex">
        <div className="flex-none">
          {film.poster_path && <img src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`} alt={film.title} height="100px" width="100px" className="overflow-hidden" />}
        </div>

        <div className="flex-col flex-1">
          <p className="font-bold p-2">{film.title} - {film.release_date.slice(0,4)}</p>
          <p className="text-sm p-2">{film.overview.slice(0,maxLength)} {longDesc && "..."}</p>
          <div className="flex justify-end p-2">
            <img src={fav0} alt="Add to Favourites" title="Add to Favourites" width='30px' />
            <img src={add} alt="Add to Wishlist" title="Add to Wishlist" width='30px' />
          </div>
        </div>
      </div>
    </li>
  );
};

export default FilmItem;
