import React, { useState } from "react";
import RoomJoin from "./components/RoomJoin.jsx";
import Whiteboard from "./components/Whiteboard.jsx";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_SERVER_URL);

function App() {
  const [roomId, setRoomId] = useState(null);

  return (
    <div className="w-full h-full">
      {roomId ? (
        <Whiteboard roomId={roomId} socket={socket} />
      ) : (
        <RoomJoin setRoomId={setRoomId} />
      )}
    </div>
  );
}

export default App;
