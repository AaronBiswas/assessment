import React, { useState } from "react";
import axios from "axios";

const Upload = ({setData}) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a file first.");
      return;
    }
    setStatus("Uploading...");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const url = import.meta.env.VITE_APP_URL;
      const res = await axios.post(
        `${url.endsWith("/") ? url : url + "/"}file/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      setStatus("Upload successful!");
      console.log(res.data);
      setData(res.data);
    } catch (err) {
      setStatus("Upload failed.");
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-900 bg-opacity-90 rounded-2xl shadow-2xl p-6 md:p-8 mx-3">
        <h1 className="text-2xl md:text-3xl font-extrabold text-center text-indigo-400 mb-6 md:mb-8 drop-shadow-lg">Upload File</h1>
        <div className="mb-5 md:mb-6">
          <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="file">
            Select File
          </label>
          <input
            id="file"
            type="file"
            className="block w-full text-gray-200 bg-gray-800 border border-indigo-700/30 rounded py-2 md:py-3 px-3 md:px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button
          onClick={handleUpload}
          className="w-full py-2 md:py-3 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4"
        >
          Upload
        </button>
        {status && (
          <p
            className={`text-center mt-2 font-semibold text-sm md:text-base ${
              status === "Upload successful!"
                ? "text-green-400"
                : status === "Uploading..."
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default Upload;