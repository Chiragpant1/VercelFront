import React from "react";
import DrawingCanvas from "./DrawingCanvas";

function Whiteboard({ roomId, socket }) {
  return <DrawingCanvas roomId={roomId} socket={socket} />;
}

export default Whiteboard;
