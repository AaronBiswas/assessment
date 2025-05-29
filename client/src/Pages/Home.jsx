import Agents from "../Components/Agents.jsx";
import { Link } from "react-router-dom"; // Add this import

const Home = ({ loggedIn }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-400 mb-4 drop-shadow-lg">
          Home Page
        </h1>
        <p className="text-center mt-2 mb-8 text-gray-300 text-lg">
          Welcome to the home page! This is where you can find the latest
          updates and information.
        </p>

        {loggedIn && (
          <div className="mb-12">
            <div className="max-w-lg mx-auto p-8 bg-gray-800 shadow-xl rounded-2xl flex flex-col items-center">
              <h2 className="text-2xl text-white font-semibold mb-4">
                Manage agents
              </h2>
              <nav
                className="flex flex-row gap-4 w-full items-center justify-center"
                aria-label="Main actions"
              >
                <Link
                  to="/add-agent"
                  className="w-full max-w-xs text-center px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  aria-label="Add a new agent"
                >
                  + Add Agent
                </Link>
                <Link
                  to="/file/upload"
                  className="w-full max-w-xs text-center px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  aria-label="Upload a file"
                >
                  Upload File
                </Link>
              </nav>
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
