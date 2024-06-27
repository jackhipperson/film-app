import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div className="sticky top-0 bg-yellow-500 border-b-2 border-yellow-900">
            <div className="flex content-stretch m-auto max-w-6xl">
                <div className="p-4">
                    <h1 className="text-2xl">Film App</h1>
                </div>
                <div className="flex ml-auto items-center text-right">
                    <Link to="/" className="p-2 cursor-pointer hover:bg-yellow-600 rounded-sm"><p>Search</p></Link>
                    <Link to="/watchlist" className="p-2 cursor-pointer hover:bg-yellow-600 rounded-sm"><p>Watch List</p></Link>
                    <Link to="/favourites" className="p-2 cursor-pointer hover:bg-yellow-600 rounded-sm"><p>Favourites</p></Link>
                    <Link to="/recommended" className="p-2 cursor-pointer hover:bg-yellow-600 rounded-sm"><p>Recommended</p></Link>
                    <Link to="/login" className="p-2 cursor-pointer hover:bg-yellow-600 rounded-sm"><p>Log In</p></Link>
                </div>
            </div>
        </div>
    )
}

export default Header