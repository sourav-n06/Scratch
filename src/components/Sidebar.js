import React from "react";
import MotionAndLookBlock from "./MotionAndLookBlock";

const Sidebar = () => {
  const motionCategories = [
    {
      id: 1,
      type: "MOVE",
      label: "Move",
      defaultValue: 10,
      label2: "steps",
      className:
        "flex items-center justify-between bg-blue-500 text-white px-4 py-2 my-2 rounded-lg shadow-md hover:bg-blue-600 transition",
    },
    {
      id: 2,
      type: "TURN",
      label: "Turn",
      defaultValue: 15,
      label2: "degree",
      className:
        "flex items-center justify-between bg-blue-500 text-white px-4 py-2 my-2 rounded-lg shadow-md hover:bg-blue-600 transition",
    },
    {
      id: 3,
      type: "GOTO",
      label: "GoTo",
      defaultValue: { x: 10, y: 15 },
      label2: "",
      className:
        "flex items-center justify-between bg-blue-500 text-white px-4 py-2 my-2 rounded-lg shadow-md hover:bg-blue-600 transition",
    },
    {
      id: 4,
      type: "REPEAT",
      label: "Repeat",
      defaultValue: 5,
      label2: "times",
      className:
        "flex items-center justify-between bg-pink-500 text-white px-4 py-2 my-2 rounded-lg shadow-md hover:bg-pink-600 transition",
    },
  ];

  const looksCategories = [
    {
      id: 5,
      type: "SAY",
      label: "Say",
      defaultValue: { text: "Hello", seconds: 2 },
      label2: "for seconds",
      className:
        "flex items-center justify-between bg-violet-500 text-white px-4 py-2 my-2 rounded-lg shadow-md hover:bg-violet-600 transition",
    },
    {
      id: 6,
      type: "THINK",
      label: "Think",
      defaultValue: { text: "Hmm...", seconds: 2 },
      label2: "for seconds",
      className:
        "flex items-center justify-between bg-violet-500 text-white px-4 py-2 my-2 rounded-lg shadow-md hover:bg-violet-600 transition",
    },
  ];

  return (
    <div className="w-1/4 bg-gray-100 p-4 shadow-inner rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Motion</h2>
      {motionCategories.map((motion) => (
        <MotionAndLookBlock key={motion.id} motion={motion} />
      ))}

      <h2 className="text-2xl font-bold mt-6 mb-4 text-gray-800">Looks</h2>
      {looksCategories.map((motion) => (
        <MotionAndLookBlock key={motion.id} motion={motion} />
      ))}
    </div>
  );
};

export default Sidebar;
