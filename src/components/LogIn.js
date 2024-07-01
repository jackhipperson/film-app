const LogIn = () => {
  return (
    <div className="flex flex-col my-12 max-w-[90%] lg:max-w-lg mx-auto border border-yellow-800 rounded-xl text-center bg-white">
      <div>
        <h2 className="text-xl p-4">Welcome Back! Log In</h2>
      </div>
      <form>
        <div className="p-2">
          <label className="p-2">Username:</label>
          <input
            className="p-2 rounded-md border border-yellow-800"
            type="text"
          />
        </div>
        <div>
          <label className="p-2">Password:</label>
          <input
            className="p-2 rounded-md border border-yellow-800"
            type="password"
          />
        </div>
        <button>
          <div className="bg-yellow-600 px-4 py-2 m-4 rounded-md">
            <p>Log In</p>
          </div>
        </button>
      </form>
      <div>
        <p className="p-2">Not got an account? Register Here</p>
      </div>
    </div>
  );
};

export default LogIn;
