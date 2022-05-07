import React, { useState, useRef, useEffect } from "react";
import useMinter from "../../hooks/useMinter";
import designNames from "../../designNames.json";

function shuffleArray(arr) {
  const shu = arr.slice();
  const staticRandoms = [9, 62, 23, 90, 98, 27, 19, 96, 5, 81, 42, 38, 92, 74, 65, 31, 96, 46, 43, 22, 69, 83, 59, 19, 13, 14, 44, 41, 50, 73, 51, 27, 28, 35, 76, 77, 15, 56, 36, 63, 94, 87, 95, 10, 63, 32, 17, 96, 33, 19, 93, 6, 66, 47, 100, 79, 83, 1, 20, 60, 65, 5, 45, 94, 42, 86, 56, 100, 29, 6, 33, 29, 54, 22, 59, 19, 96, 95, 47, 31, 64, 29, 5, 25, 15, 64, 29, 42, 44, 67, 91, 10, 18, 49, 36, 0];
  for (let i = shu.length - 1; i > 0; i--) {
    const j = staticRandoms[i] % (i + 1);
    [shu[i], shu[j]] = [shu[j], shu[i]];
  }
  return shu;
}

const NameMatchingMinigame = () => {
  const { lastOpenDesign } = useMinter();
  const [reveal, setReveal] = useState(null);
  const [offset, setOffset] = useState(0);

  const designIds = lastOpenDesign > 0 && Array.from({ length: lastOpenDesign }, (_, i) => i+1) || [];
  const designIdsShuffled = shuffleArray(designIds);

  const namesEls = useRef({});
  const slotsEls = useRef({});

  const handleReveal = (designId) => {
    const namesRect = namesEls.current[designId].getBoundingClientRect();
    const slotsRect = slotsEls.current[designId].getBoundingClientRect();
    const offset = {
      x: slotsRect.x - namesRect.x,
      y: slotsRect.y - namesRect.y,
    };
    setReveal(designId);
    setOffset(offset);
  };

  return (
    <div className="name-matching-minigame">
      <ul className="names">
        {designIdsShuffled.map((designId, index) => (
          <li
            key={index}
            ref={(element) => namesEls.current[designId] = element}
            onMouseEnter={handleReveal.bind(this, designId)}
            onMouseLeave={setReveal.bind(this, null)}
            className={reveal === designId && "revealed"}
          >
            <div className="name" style={reveal === designId ? {left: offset.x + 16 + 6, top: offset.y + 32 + 6} : undefined}>{designNames[designId.toString()]}</div>
          </li>
        ))}
      </ul>
      <ul className="slots">
        {designIds.map((designId, index) => (
          <li
            key={index}
            ref={(element) => slotsEls.current[designId] = element}
            onMouseEnter={handleReveal.bind(this, designId)}
            onMouseLeave={setReveal.bind(this, null)}
          >
            <div className="slot"></div>
          </li>
        ))}
      </ul>
      <ul className="designs">
        {designIds.map((designId, index) => (
          <li
            key={index}
            onMouseEnter={handleReveal.bind(this, designId)}
            onMouseLeave={setReveal.bind(this, null)}
          >
            <img src={`/assets/${designId}.simple.png`} alt={designNames[designId.toString()]} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NameMatchingMinigame;
