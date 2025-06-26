// ActionPanel.js
import React, { useContext, useState } from "react";
import { useDrop, useDrag } from "react-dnd";
import { Context } from "./Context";

const ActionPanel = ({ actions, setActions, showCollision }) => {
  const { sprites, selectedSpriteId, setSelectedSpriteId } = useContext(Context);

  const [, drop] = useDrop({
    accept: "MOTION",
    drop: (item) => {
      addMotion(item);
    },
  });

  const addMotion = (motion) => {
    setActions((prev) => {
      const current = prev[selectedSpriteId] || [];
      return { ...prev, [selectedSpriteId]: [...current, motion] };
    });
  };

  const clearMidArea = () => {
    setActions((prev) => ({ ...prev, [selectedSpriteId]: [] }));
  };

  const deleteAction = (index) => {
    setActions((prev) => {
      const current = prev[selectedSpriteId] || [];
      const updated = current.filter((_, i) => i !== index);
      return { ...prev, [selectedSpriteId]: updated };
    });
  };

  const swapActions = (fromIndex, toIndex) => {
    setActions((prev) => {
      const updated = [...(prev[selectedSpriteId] || [])];
      const [movedItem] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, movedItem);
      return { ...prev, [selectedSpriteId]: updated };
    });
  };

  const actionsOfIndividual = actions[selectedSpriteId] || [];

  const ActionItem = ({ action, index }) => {
    const [{ isDragging }, dragRef] = useDrag({
      type: "ACTION",
      item: { index },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    });

    const [, dropRef] = useDrop({
      accept: "ACTION",
      hover: (item) => {
        if (item.index !== index) {
          swapActions(item.index, index);
          item.index = index;
        }
      },
    });

    const motionColor = {
      SAY: "bg-violet-100 text-violet-800",
      THINK: "bg-violet-100 text-violet-800",
      MOVE: "bg-blue-100 text-blue-800",
      TURN: "bg-blue-100 text-blue-800",
      GOTO: "bg-blue-100 text-blue-800",
      REPEAT: "bg-orange-100 text-orange-800",
    }[action.motionType] || "bg-gray-100 text-gray-800";

    return (
      <div
        ref={(node) => dragRef(dropRef(node))}
        className={`p-2 rounded mb-2 flex justify-between items-center gap-2 cursor-move transition-opacity ${motionColor} ${
          isDragging ? "opacity-50" : "opacity-100"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-xs font-bold shadow">
            {{
              SAY: "💬",
              THINK: "💭",
              MOVE: "➡️",
              TURN: "🔄",
              GOTO: "📍",
              REPEAT: "🔁",
            }[action.motionType] || "❓"}
          </span>
          <span>
            {action.motionType} -
            {(() => {
              if (action.motionType === "SAY" || action.motionType === "THINK") {
                return ` "${action.value.text}" for ${action.value.seconds}s`;
              } else if (typeof action.value === "object") {
                return ` x: ${action.value.x}, y: ${action.value.y}`;
              } else {
                return ` ${action.value}`;
              }
            })()}
          </span>
        </div>
        <button
          onClick={() => deleteAction(index)}
          className="ml-2 w-6 h-6 flex items-center justify-center rounded-full bg-red-500 text-white text-xs shadow hover:bg-red-600 transition-transform hover:scale-110"
        >
          ✕
        </button>
      </div>
    );
  };

  return (
    <div className="w-1/2 h-full bg-gray-50 p-4 rounded-lg shadow-inner relative" ref={drop}>
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {(() => {
          const selected = sprites.find((s) => s.id === selectedSpriteId);
          if (!selected) return "Action Sequence for Sprite: None";
          const emoji =
            selected.spriteName === "cat"
              ? "🐱"
              : selected.spriteName === "ghost"
              ? "👻"
              : selected.spriteName === "robot"
              ? "🤖"
              : selected.spriteName === "dog"
              ? "🐕"
              : "🎭";
          return `Selected Actions for Sprite: ${emoji} ${selected.spriteName}`;
        })()}
      </h2>

      <div className="flex mb-4 flex-wrap gap-2">
        {sprites.map((sprite) => (
          <button
            key={sprite.id}
            className={`px-4 py-2 rounded shadow-md transition font-semibold ${
              selectedSpriteId === sprite.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedSpriteId(sprite.id)}
          >
            {sprite.spriteName}
          </button>
        ))}
      </div>

      <div className="overflow-y-auto max-h-[60vh] pr-2">
        {actionsOfIndividual.map((action, index) => (
          <ActionItem key={index} action={action} index={index} />
        ))}
      </div>

      {showCollision && (
        <div className="absolute top-5 right-5 px-4 py-2 bg-red-100 text-red-700 border border-red-300 rounded shadow-md animate-pulse">
          🚨 Collision Detected!
        </div>
      )}

      <button
        onClick={clearMidArea}
        className="absolute bottom-5 left-5 bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Remove Actions
      </button>
    </div>
  );
};

export default ActionPanel;
