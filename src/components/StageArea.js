// StageArea.js
import React, { useState, useContext, useRef } from "react";
import Sprite from "./Sprite";
import AddSprite from "./SpriteSelector";
import SpriteInspector from "./SpriteInspector"; // ✅ Updated import name
import SpriteList from "./SpriteList";
import { Context } from "./Context";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const StageArea = ({ actions, setActions }) => {
  const { sprites, setSprites, selectedSpriteId, setSelectedSpriteId } = useContext(Context);
  const [isPlaying, setIsPlaying] = useState(false);
  const [draggingSpriteId, setDraggingSpriteId] = useState(null);
  const [showCollision, setShowCollision] = useState(false);
  const hasCollidedThisRun = useRef(false);

  const handleMouseDown = (e, id) => {
    setDraggingSpriteId(id);
  };

  const handleMouseMove = (e) => {
    if (draggingSpriteId) {
      const box = e.currentTarget.getBoundingClientRect();
      let x = e.clientX - box.left;
      let y = e.clientY - box.top;
      x = Math.max(0, Math.min(box.width - 50, x));
      y = Math.max(0, Math.min(box.height - 50, y));
      setSprites((prev) =>
        prev.map((sprite) =>
          sprite.id === draggingSpriteId ? { ...sprite, xPos: x, yPos: y } : sprite
        )
      );
    }
  };

  const handleMouseUp = () => {
    setDraggingSpriteId(null);
  };

  const isCollision = (a, b) => {
    const size = 50;
    return Math.abs(a.xPos - b.xPos) < size && Math.abs(a.yPos - b.yPos) < size;
  };

  const checkCollision = () => {
    if (hasCollidedThisRun.current) return;

    let collidedPairs = [];

    for (let i = 0; i < sprites.length; i++) {
      for (let j = i + 1; j < sprites.length; j++) {
        const sprite1 = sprites[i];
        const sprite2 = sprites[j];
        if (isCollision(sprite1, sprite2)) {
          collidedPairs.push([sprite1.id, sprite2.id]);
        }
      }
    }

    if (collidedPairs.length > 0) {
      hasCollidedThisRun.current = true;
      setShowCollision(true);
      setTimeout(() => setShowCollision(false), 1000);

      setSprites((prev) =>
        prev.map((sprite) => {
          const isCollided = collidedPairs.some(
            ([id1, id2]) => sprite.id === id1 || sprite.id === id2
          );
          return { ...sprite, collision: isCollided };
        })
      );

      setActions((prevActions) => {
        const updated = { ...prevActions };

        for (const [id1, id2] of collidedPairs) {
          const actions1 = prevActions[id1] || [];
          const actions2 = prevActions[id2] || [];

          updated[id1] = [...actions2];
          updated[id2] = [...actions1];

          console.log(`✅ Swapped actions between ${id1} and ${id2}`);
        }

        return updated;
      });
    }
  };

  const executeAction = async (spriteId, action) => {
    if (action.motionType === "MOVE") {
      setSprites((prev) =>
        prev.map((s) => {
          if (s.id !== spriteId) return s;

          const angleRad = (s.rotation * Math.PI) / 180;
          const dx = Math.cos(angleRad) * Number(action.value);
          const dy = Math.sin(angleRad) * Number(action.value);

          return {
            ...s,
            xPos: s.xPos + dx,
            yPos: s.yPos + dy,
          };
        })
      );
    } else if (action.motionType === "TURN") {
      setSprites((prev) =>
        prev.map((s) =>
          s.id === spriteId ? { ...s, rotation: s.rotation + Number(action.value) } : s
        )
      );
    } else if (action.motionType === "GOTO") {
      setSprites((prev) =>
        prev.map((s) =>
          s.id === spriteId ? { ...s, xPos: Number(action.value.x), yPos: Number(action.value.y) } : s
        )
      );
    } else if (action.motionType === "SAY" || action.motionType === "THINK") {
      const key = action.motionType === "SAY" ? "sayText" : "thinkText";
      setSprites((prev) =>
        prev.map((s) => (s.id === spriteId ? { ...s, [key]: action.value.text } : s))
      );
      await delay(action.value.seconds * 1000);
      setSprites((prev) => prev.map((s) => (s.id === spriteId ? { ...s, [key]: "" } : s)));
    }
  };

  const playAnimations = async () => {
    setIsPlaying(true);
    hasCollidedThisRun.current = false;

    const runSpriteActions = async (spriteId, steps) => {
      let history = [];

      const runSteps = async (actions) => {
        for (const action of actions) {
          if (action.motionType === "REPEAT") {
            for (let i = 0; i < action.value; i++) {
              await runSteps(history);
            }
          } else {
            await executeAction(spriteId, action);
            history.push(action);
            checkCollision();
            if (["MOVE", "TURN", "GOTO"].includes(action.motionType)) {
              await delay(50);
            }
          }
        }
      };

      await runSteps(steps);
    };

    const promises = Object.entries(actions).map(([id, steps]) => runSpriteActions(id, steps));
    await Promise.all(promises);
    setIsPlaying(false);
  };

  const addSprite = (sprite) => {
    setSprites((prev) => [...prev, { ...sprite, collision: false }]);
    setSelectedSpriteId(sprite.id);
  };

  const updateSprite = (id, field, value) => {
    setSprites((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              [field]: ["xPos", "yPos", "rotation"].includes(field) ? parseFloat(value) : value,
            }
          : s
      )
    );
  };

  const deleteSprite = (id) => {
    setSprites((prev) => prev.filter((s) => s.id !== id));
  };

  const selectSprite = (id) => {
    setSelectedSpriteId(id);
  };

  return (
    <div className="w-1/3" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <div className="h-2/4 bg-blue-100 p-4 relative overflow-hidden rounded-lg shadow-inner">
        <h2 className="text-xl font-bold mb-4 text-blue-800">Stage</h2>

        {showCollision && (
          <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded shadow animate-pulse">
            🚨 Collision Detected!
          </div>
        )}

        {sprites.map((sprite) => (
          <div
            key={sprite.id}
            onMouseDown={(e) => handleMouseDown(e, sprite.id)}
            style={{ position: "absolute", cursor: "grab" }}
          >
            <Sprite
              xPos={sprite.xPos}
              yPos={sprite.yPos}
              rotation={sprite.rotation}
              spriteName={sprite.spriteName}
              sayText={sprite.sayText}
              thinkText={sprite.thinkText}
              collision={sprite.collision}
            />
          </div>
        ))}
      </div>

      <div className="h-2/4">
        <SpriteInspector
          sprite={sprites.find((s) => s.id === selectedSpriteId)}
          onUpdateSprite={updateSprite}
        />
        <div className="flex justify-around pt-2">
          <AddSprite onAddSprite={addSprite} />
          <button
            onClick={playAnimations}
            className={`bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 ${
              isPlaying ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isPlaying}
          >
            {isPlaying ? "Playing..." : "Play"}
          </button>
        </div>
        <SpriteList
          sprites={sprites}
          onDeleteSprite={deleteSprite}
          onSelectSprite={selectSprite}
          selectedSpriteId={selectedSpriteId}
        />
      </div>
    </div>
  );
};

export default StageArea;
