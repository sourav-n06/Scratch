// MotionAndLookBlock.js
import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import SvgIcon from './SvgIcon';

const MotionAndLookBlock = ({ motion }) => {
  const [inputValues, setInputValues] = useState({
    value: motion.defaultValue,
    x: motion.defaultValue?.x || '',
    y: motion.defaultValue?.y || '',
    text: motion.defaultValue?.text || '',
    seconds: motion.defaultValue?.seconds || '',
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'MOTION',
    item: () => {
      const dragItem = {
        motionType: motion.type,
        value: motion.type === 'SAY' || motion.type === 'THINK'
          ? {
              text: inputValues.text || motion.defaultValue.text,
              seconds: Number(inputValues.seconds) > 0 ? Number(inputValues.seconds) : motion.defaultValue.seconds,
            }
          : typeof motion.defaultValue !== 'object'
            ? inputValues.value
            : { x: inputValues.x, y: inputValues.y },
      };
      return dragItem;
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      ref={drag}
      className={`border p-2 mx-auto mb-2 ${motion.className} ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <p>{motion.label}</p>
      <SvgIcon name={motion.icon} size={15} className="text-white m-2" />

      {motion.type === 'SAY' || motion.type === 'THINK' ? (
        <>
          <input
            type="text"
            name="text"
            value={inputValues.text}
            onChange={handleChange}
            className="text-black w-20 mx-2 rounded-full p-1"
            placeholder="Text"
          />
          <input
            type="number"
            name="seconds"
            min="1"
            value={inputValues.seconds}
            onChange={handleChange}
            className="text-black w-12 mx-2 rounded-full p-1"
            placeholder="Sec"
          />
        </>
      ) : typeof motion.defaultValue !== 'object' ? (
        <input
          type="number"
          onChange={handleChange}
          className="text-black w-12 mx-7 rounded-full p-1"
          value={inputValues.value}
          name="value"
        />
      ) : (
        <div className="flex space-x-4">
          <div>
            <label>X:</label>
            <input
              type="number"
              onChange={handleChange}
              className="text-black w-12 mx-7 rounded-full p-1"
              value={inputValues.x}
              name="x"
            />
          </div>
          <div>
            <label>Y:</label>
            <input
              type="number"
              onChange={handleChange}
              className="text-black w-12 mx-7 rounded-full p-1"
              value={inputValues.y}
              name="y"
            />
          </div>
        </div>
      )}

      <p>{motion.label2}</p>
    </div>
  );
};

export default MotionAndLookBlock;