import React from "react";
import CatSprite from "./CatSprite";
import SvgIcon from "./SvgIcon";

const SpriteList = ({ sprites, onDeleteSprite, onSelectSprite, selectedSpriteId }) => {
  return (
    <div className="flex flex-wrap gap-6 mt-6 px-4">
      {sprites.map((sprite, index) => (
        <div
          key={sprite.id}
          tabIndex={0}
          className={`relative flex flex-col items-center justify-between w-28 h-36 p-4 rounded-2xl border-2 shadow-sm transition-transform duration-200 group cursor-pointer ${
            sprite.id === selectedSpriteId
              ? "border-blue-500 bg-blue-50 scale-105"
              : "border-gray-300 bg-white hover:shadow-md hover:border-blue-300"
          }`}
          onClick={(e) => {
            onSelectSprite(sprite.id);
            e.currentTarget.focus();
          }}
        >
          {/* Delete Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteSprite(sprite.id);
            }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow hover:bg-red-600 transition-transform hover:scale-110"
            title="Delete Sprite"
          >
            ✕
          </button>

          {/* Sprite Icon */}
          <div className="mt-1">
            {sprite.spriteName === "cat" ? (
              <CatSprite size={42} />
            ) : (
              <SvgIcon name={sprite.spriteName} size={42} className="text-green-600" />
            )}
          </div>

          {/* Sprite Name */}
          <div className="mt-2 text-sm font-medium text-gray-800 capitalize text-center">
            {sprite.spriteName}
          </div>

          {/* Sprite Number Badge */}
          <div className="mt-2 text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-700 rounded-full shadow-sm">
            Sprite {index + 1}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpriteList;
