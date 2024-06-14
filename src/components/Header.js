const Header = () => {
    return (
        <div className="sticky top-0 bg-yellow-500 border-b-2 border-yellow-900">
            <div className="flex content-stretch m-auto max-w-6xl">
                <div className="p-4">
                    <h1 className="text-2xl">Film App</h1>
                </div>
                <div className="flex ml-auto items-center text-right">
                    <p className="p-2">Log In</p>
                </div>
            </div>
        </div>
    )
}

export default Header