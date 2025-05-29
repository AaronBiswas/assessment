import Agents from "../Components/Agents.jsx";

const Home = ({ loggedIn }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-400 mb-4 drop-shadow-lg">Home Page</h1>
        <p className="text-center mt-2 mb-8 text-gray-300 text-lg">
          Welcome to the home page! This is where you can find the latest updates and information.
        </p>

        {loggedIn && (
          <div className="mb-12">
            <div className="max-w-lg mx-auto p-8 bg-gray-800 shadow-xl rounded-2xl flex flex-col items-center">
              <h2 className="text-2xl text-white font-semibold mb-4">Add Agents</h2>
              <a
                href="/add-agent"
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                + Add Agent
              </a>
            </div>
          </div>
        )}

        {loggedIn && (
          <div>
            <Agents />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;