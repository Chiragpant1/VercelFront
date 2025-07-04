import React, { useState } from "react";

function RoomJoin({ setRoomId }) {
  const [code, setCode] = useState("");

  const handleJoin = () => {
    if (code.trim().length >= 6) {
      setRoomId(code.trim()); // Set roomId in App to navigate
    } else {
      alert("Enter a valid room code (min 6 characters).");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-100"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0e7ff 0%, #f1f5f9 100%)",
      }}
    >
      <div className="flex flex-col items-center gap-4 bg-white p-8 rounded shadow-lg">
        <h1 className="text-2xl font-bold text-blue-700 drop-shadow">
          Join Collaborative Whiteboard
        </h1>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter Room Code"
          className="border border-blue-300 px-3 py-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow"
          style={{ background: "#fff" }}
        />
        <button
          onClick={handleJoin}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition font-semibold shadow"
          style={{ minWidth: "120px" }}
        >
          Join Room
        </button>
      </div>
    </div>
  );
}

export default RoomJoin;
