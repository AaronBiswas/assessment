

const Home = () => {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-center mt-10">Home Page</h1>
        <p className="text-center mt-4 text-gray-600">
          Welcome to the home page! This is where you can find the latest
          updates and information.
        </p>

        <div>
          <div className="max-w-md mx-auto mt-8 p-6 bg-gray-900 shadow-md rounded-lg">
            <h2 className="text-2xl text-white font-semibold">Add Agents</h2>
            <button>
              <a
                href="/add-agent"
                className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
              >
                Add Agent
              </a>
            </button>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Home;
