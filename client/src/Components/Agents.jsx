import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Agents = () => {
  const [agent, setAgent] = useState([]);
  const getAgents = async () => {
    const url = import.meta.env.VITE_APP_URL;
    const response = await axios.get(`${url}agent/getAgents`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      console.log("Agents fetched successfully!");
      setAgent(response.data);
    } else {
      console.log("Error in fetching Agents!");
    }
  };

  useEffect(() => {
    getAgents();
  }, []);

  return (
    <div className="bg-gray-900 bg-opacity-80 rounded-2xl shadow-2xl py-6 md:py-8 px-3 md:px-4 mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-indigo-400 mb-6 md:mb-8 text-center drop-shadow">
        Agents
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {agent.length === 0 ? (
          <div className="w-full col-span-full text-center text-gray-400">
            No agents found.
          </div>
        ) : (
          agent.map((agents) => (
            <div
              key={agents._id}
              className="bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 flex flex-col items-start hover:shadow-2xl transition-shadow border border-indigo-700/30 h-full"
            >
              <h3 className="text-lg md:text-xl font-semibold text-indigo-400 mb-2">
                {agents.name}
              </h3>
              <p className="text-gray-300 mb-1 text-sm md:text-base">
                <span className="font-medium text-gray-400">Email:</span>{" "}
                <span className="break-all">{agents.email}</span>
              </p>
              <p className="text-gray-300 text-sm md:text-base">
                <span className="font-medium text-gray-400">Mobile:</span>{" "}
                {agents.mobile}
              </p>
              <ul className="w-full mt-4 bg-gray-900 bg-opacity-70 rounded-lg p-2 md:p-3">
                {agents.tasks.length === 0 ? (
                  <li className="text-gray-400 italic text-sm">No tasks assigned.</li>
                ) : (
                  agents.tasks.map((item, i) => {
                    let taskObj = {};
                    try {
                      taskObj = JSON.parse(item);
                    } catch {
                      taskObj = {};
                    }
                    return (
                      <li
                        key={i}
                        className="text-gray-200 py-2 px-2 md:px-3 rounded hover:bg-indigo-800/40 transition-colors mb-2 border-l-4 border-indigo-500 flex flex-col gap-1 text-sm md:text-base"
                      >
                        <span>
                          <span className="font-semibold text-indigo-300">
                            Name:
                          </span>{" "}
                          {taskObj.data?.name || "N/A"}
                        </span>
                        <span>
                          <span className="font-semibold text-indigo-300">
                            Mobile:
                          </span>{" "}
                          {taskObj.data?.phone || "N/A"}
                        </span>
                        <span>
                          <span className="font-semibold text-indigo-300">
                            Note:
                          </span>{" "}
                          {taskObj.data?.note || "N/A"}
                        </span>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Agents;