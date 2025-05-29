import React from 'react'
import axios from "axios";
import { useState, useEffect } from 'react';

const Agents = () => {
    const [agent, setAgent] = useState([]);
    const getAgents = async () => {
        const url = import.meta.env.VITE_APP_URL;
        const response = await axios.get(`${url}agent/getAgents`, { withCredentials: true })
        if (response.status === 200) {
            console.log("Agents fetched successfully!")
            setAgent(response.data)
        }
        else {
            console.log("Error in fetching Agents!")
        }
    }

    useEffect(() => {
        getAgents()
    }, [])

    return (
        <div className="bg-gray-900 bg-opacity-80 rounded-2xl shadow-2xl py-8 px-4 mb-8">
            <h2 className="text-3xl font-bold text-indigo-400 mb-8 text-center drop-shadow">Agents</h2>
            <div className="flex flex-wrap gap-8 justify-center">
                {agent.length === 0 ? (
                    <div className="w-full text-center text-gray-400">No agents found.</div>
                ) : (
                    agent.map((agents) => (
                        <div
                            key={agents._id}
                            className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-start hover:shadow-2xl transition-shadow m-2 min-w-[260px] max-w-xs flex-1 border border-indigo-700/30"
                        >
                            <h3 className="text-xl font-semibold text-indigo-400 mb-2">{agents.name}</h3>
                            <p className="text-gray-300 mb-1">
                                <span className="font-medium text-gray-400">Email:</span> {agents.email}
                            </p>
                            <p className="text-gray-300">
                                <span className="font-medium text-gray-400">Mobile:</span> {agents.mobile}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Agents