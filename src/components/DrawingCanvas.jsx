import React, { useEffect, useRef, useState } from "react";
import Toolbar from "./Toolbar.jsx";

function DrawingCanvas({ roomId, socket }) {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("black");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [isDrawing, setIsDrawing] = useState(false);
  const prevPoint = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    socket.emit("join-room", { roomId });

    const handleDraw = (drawData) => {
      console.log("Received draw event", drawData);
      drawLine(
        ctx,
        drawData.x0,
        drawData.y0,
        drawData.x1,
        drawData.y1,
        drawData.color,
        drawData.strokeWidth
      );
    };

    socket.on("draw", handleDraw);

    socket.on("clear", () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    return () => {
      socket.off("draw", handleDraw);
      socket.off("clear");
    };
  }, [roomId, socket]);

  const drawLine = (ctx, x0, y0, x1, y1, color, strokeWidth) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = strokeWidth;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    prevPoint.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const { x: prevX, y: prevY } = prevPoint.current;

    if (prevX !== null && prevY !== null) {
      // Draw locally
      drawLine(ctx, prevX, prevY, x, y, color, strokeWidth);
      // Emit to server
      socket.emit("draw", {
        roomId,
        data: { x0: prevX, y0: prevY, x1: x, y1: y, color, strokeWidth },
      });
    }
    prevPoint.current = { x, y };
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    prevPoint.current = { x: null, y: null };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit("clear", roomId);
  };

  return (
    <>
      <Toolbar
        color={color}
        setColor={setColor}
        strokeWidth={strokeWidth}
        setStrokeWidth={setStrokeWidth}
        clearCanvas={clearCanvas}
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full bg-white"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ display: "block" }}
      />
    </>
  );
}

export default DrawingCanvas;
