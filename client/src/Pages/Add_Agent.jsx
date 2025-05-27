import React, { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const Add_Agent = () => {
  const [phone, setPhone] = useState("");
  return (
    <div>
      <div>
        <form className="gap-4">
          <h1 className="text-3xl font-bold text-center mt-10">Add Agent</h1>
          <div className="max-w-md mx-auto mt-8 p-6 bg-gray-900 shadow-md rounded-lg">
            <label className="block mb-4">
              <span className="text-white">Name</span>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter name"
              />
            </label>
            <label className="block mb-4">
              <span className="text-white">Email</span>
              <input
                type="email"
                className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter email"
              />
            </label>
            <label className="block mb-4">
              <span className="text-white">Password</span>
              <input
                type="password"
                className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter password"
              />
            </label>
            <label className="block mb-4">
              <span className="text-white">Phone number</span>
              <PhoneInput
                defaultCountry="usa"
                value={phone}
                onChange={(phone) => setPhone(phone)}
                inputClassName="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </label>
            <button
              type="submit"
              className="w-full px-6 py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
            >
              Add Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add_Agent;
