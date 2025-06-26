import React from 'react';
import CatSprite from "./CatSprite";
import SvgIcon from './SvgIcon';

const Sprite = ({ xPos, yPos, rotation, spriteName, sayText, thinkText, size = 50 }) => {
  return (
    <div
      className="absolute"
      style={{
        left: `${xPos}px`,
        top: `${yPos}px`,
        transform: `rotate(${rotation}deg)`,
        transition: 'left 0.3s, top 0.3s, transform 0.3s',
      }}
    >
      {/* SAY Bubble */}
      {sayText && (
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-max max-w-[180px] animate-fade-in">
          <div className="relative bg-white text-gray-800 px-3 py-2 rounded-xl border border-gray-300 shadow-md text-sm font-medium">
            💬 {sayText}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-white border-l border-b border-gray-300" />
          </div>
        </div>
      )}

      {/* THINK Bubble */}
      {thinkText && (
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-max max-w-[180px] animate-fade-in">
          <div className="relative bg-blue-200/90 text-blue-900 px-3 py-2 rounded-xl border border-blue-400 shadow-lg text-sm italic font-medium backdrop-blur-sm">
            💭 {thinkText}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-200 border border-blue-400"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-200 border border-blue-400"></span>
              <span className="w-1 h-1 rounded-full bg-blue-200 border border-blue-400"></span>
            </div>
          </div>
        </div>
      )}

      {/* Sprite Graphic */}
      {spriteName === "cat" ? (
        <CatSprite size={size} />
      ) : (
        <SvgIcon name={spriteName} size={size} className="text-green-600 mx-2" />
      )}
    </div>
  );
};

export default Sprite;
