import React from "react";

const SpriteInspector = ({ sprite, onUpdateSprite }) => {
  const handleInputChange = (e, spriteId, field) => {
    const { value } = e.target;
    onUpdateSprite(spriteId, field, value);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md transition-all duration-300">
      {sprite === undefined ? (
        <p className="text-gray-400 italic text-center">No sprites added</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Sprite Name
            </label>
            <input
              type="text"
              value={sprite.spriteName}
              onChange={(e) => handleInputChange(e, sprite.id, "spriteName")}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="e.g., Cat"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              X
            </label>
            <input
              type="number"
              value={sprite.xPos}
              onChange={(e) => handleInputChange(e, sprite.id, "xPos")}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="e.g., 100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
               Y  
            </label>
            <input
              type="number"
              value={sprite.yPos}
              onChange={(e) => handleInputChange(e, sprite.id, "yPos")}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="e.g., 200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Sprite Direction
            </label>
            <input
              type="number"
              value={sprite.rotation}
              onChange={(e) => handleInputChange(e, sprite.id, "rotation")}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="e.g., 90"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SpriteInspector;
