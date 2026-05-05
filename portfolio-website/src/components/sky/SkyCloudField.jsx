import { useEffect, useRef, useState } from "react";

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function randomInteger(min, max) {
  return Math.floor(randomBetween(min, max + 1));
}

function createCloudBatch() {
  const cloudCount = randomInteger(1, 5);

  return Array.from({ length: cloudCount }, (_, index) => ({
    id: `${Date.now()}-${index}-${Math.random().toString(16).slice(2)}`,
    direction: Math.random() > 0.5 ? "east" : "west",
    shape: randomInteger(1, 5),
    style: {
      "--sky-cloud-top": `${randomBetween(16, 62)}%`,
      "--sky-cloud-scale": randomBetween(0.72, 1.28).toFixed(2),
      "--sky-cloud-duration": `${randomBetween(168, 336)}s`,
      "--sky-cloud-delay": `${index * randomBetween(2, 7)}s`,
    },
  }));
}

export default function SkyCloudField() {
  const [clouds, setClouds] = useState(() => createCloudBatch());
  const cloudTimer = useRef(null);

  useEffect(() => {
    if (clouds.length > 0) {
      return undefined;
    }

    cloudTimer.current = window.setTimeout(
      () => setClouds(createCloudBatch()),
      randomBetween(10_000, 60_000)
    );

    return () => window.clearTimeout(cloudTimer.current);
  }, [clouds.length]);

  function handleCloudComplete(cloudId) {
    setClouds(currentClouds =>
      currentClouds.filter(cloud => cloud.id !== cloudId)
    );
  }

  return (
    <>
      {clouds.map(cloud => (
        <div
          key={cloud.id}
          className={`sky-lab__cloud sky-lab__cloud--${cloud.direction}`}
          style={cloud.style}
          onAnimationEnd={() => handleCloudComplete(cloud.id)}
        >
          <div
            className={`sky-lab__cloud-shape sky-lab__cloud-shape--${cloud.shape}`}
          >
            <span className="sky-lab__cloud-circle sky-lab__cloud-circle--one" />
            <span className="sky-lab__cloud-circle sky-lab__cloud-circle--two" />
            <span className="sky-lab__cloud-circle sky-lab__cloud-circle--three" />
            <span className="sky-lab__cloud-circle sky-lab__cloud-circle--four" />
            <span className="sky-lab__cloud-circle sky-lab__cloud-circle--five" />
          </div>
        </div>
      ))}
    </>
  );
}
