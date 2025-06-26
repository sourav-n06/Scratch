import React, { useState } from "react";

const SpriteSelector = ({ onAddSprite }) => {
  const [selectedSprite, setSelectedSprite] = useState("cat");

  const availableSprites = ["cat", "robot", "ghost", "dog"];

  const handleAddSprite = () => {
    const newSprite = {
      id: Math.random() + "sprite",
      xPos: parseInt(40 + 10 * Math.random()),
      yPos: parseInt(50 + 50 * Math.random()),
      rotation: 0,
      spriteName: selectedSprite,
    };
    onAddSprite(newSprite);
  };

  return (
    <div className="flex items-center space-x-4">
      <label
        htmlFor="sprite-select"
        className="text-sm font-semibold text-gray-700 px-2"
      >
        Choose a sprite:
      </label>

      <div className="relative w-40">
        <select
          id="sprite-select"
          value={selectedSprite}
          onChange={(e) => setSelectedSprite(e.target.value)}
          className="w-full appearance-none px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition"
        >
          {availableSprites.map((sprite) => (
            <option key={sprite} value={sprite} className="text-gray-700">
              {sprite.charAt(0).toUpperCase() + sprite.slice(1)}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400">
          ▼
        </div>
      </div>

      <button
        onClick={handleAddSprite}
        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold px-4 py-2 rounded-md shadow hover:scale-105 transition-all duration-200"
      >
        Add
      </button>
    </div>
  );
};

export default SpriteSelector;
