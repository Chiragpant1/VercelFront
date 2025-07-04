import React from "react";

function Toolbar({
  color,
  setColor,
  strokeWidth,
  setStrokeWidth,
  clearCanvas,
}) {
  return (
    <div className="fixed top-4 left-4 bg-white shadow rounded p-2 flex gap-2 items-center z-50">
      <select
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="border p-1 rounded"
      >
        <option value="black">Black</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
      </select>
      <input
        type="range"
        min="1"
        max="10"
        value={strokeWidth}
        onChange={(e) => setStrokeWidth(e.target.value)}
        className="w-24"
      />
      <button
        onClick={clearCanvas}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
      >
        Clear
      </button>
    </div>
  );
}

export default Toolbar;
