import React, { useState } from "react";
import "./styles.css";

const radians = (deg: number) => (deg * Math.PI) / 180;
const toFixed = (num: number, dec = 2) => parseFloat(num.toFixed(dec));

export default function App() {
  const [angle, setAngle] = useState<number>(0);
  const radius = 100;
  const cx = 150,
    cy = 150;
  const rad = radians(angle);
  const x = cx + radius * Math.cos(rad);
  const y = cy - radius * Math.sin(rad);

  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const tan = Math.abs(cos) < 0.0001 ? Infinity : Math.tan(rad);

  const quadrant = angle < 90 ? 1 : angle < 180 ? 2 : angle < 270 ? 3 : 4;

  return (
    <div className="App">
      <h1>Unit Circle Visualizer</h1>
      <svg width="300" height="300">
        {/* Quadrant shading */}
        <rect
          x="150"
          y="0"
          width="150"
          height="150"
          fill="lightyellow"
          opacity="0.3"
        />
        <rect
          x="0"
          y="0"
          width="150"
          height="150"
          fill="lightblue"
          opacity="0.3"
        />
        <rect
          x="0"
          y="150"
          width="150"
          height="150"
          fill="lightpink"
          opacity="0.3"
        />
        <rect
          x="150"
          y="150"
          width="150"
          height="150"
          fill="lightgreen"
          opacity="0.3"
        />

        <circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke="black"
          strokeWidth="2"
          fill="none"
        />
        <line x1={cx} y1={cy} x2={x} y2={y} stroke="red" strokeWidth="2" />
        <circle cx={x} cy={y} r="4" fill="red" />
        <line
          x1={cx}
          y1={cy}
          x2={cx + radius}
          y2={cy}
          stroke="gray"
          strokeDasharray="4"
        />
        <text x={cx + 5} y={cy - 5} fontSize="12">
          0°
        </text>

        {/* Tangent Line */}
        {Math.abs(cos) > 0.0001 && (
          <line
            x1={cx}
            y1={cy}
            x2={cx + 50}
            y2={cy - 50 * tan}
            stroke="orange"
            strokeDasharray="5,5"
          />
        )}
      </svg>

      <input
        type="range"
        min="0"
        max="360"
        value={angle}
        onChange={(e) => setAngle(Number(e.target.value))}
      />

      <p>
        <strong>Angle: {angle}°</strong>
      </p>
      <p>
        cos({angle}°) = <strong>{toFixed(cos)}</strong>
      </p>
      <p>
        sin({angle}°) = <strong>{toFixed(sin)}</strong>
      </p>
      <p>
        tan({angle}°) = <strong>{tan === Infinity ? "∞" : toFixed(tan)}</strong>
      </p>

      <hr />

      <h2>Live Graphs</h2>
      <svg width="300" height="100" viewBox="0 0 360 100">
        <path
          d={`M ${angle} ${50 - sin * 40}`}
          stroke="blue"
          strokeWidth="2"
          fill="none"
        />
        <text x="5" y="15" fontSize="12" fill="blue">
          sin
        </text>
        <circle cx={angle} cy={50 - sin * 40} r="3" fill="blue" />
      </svg>
      <svg width="300" height="100" viewBox="0 0 360 100">
        <path
          d={`M ${angle} ${50 - cos * 40}`}
          stroke="green"
          strokeWidth="2"
          fill="none"
        />
        <text x="5" y="15" fontSize="12" fill="green">
          cos
        </text>
        <circle cx={angle} cy={50 - cos * 40} r="3" fill="green" />
      </svg>
      <svg width="300" height="100" viewBox="0 0 360 100">
        {Math.abs(cos) > 0.0001 && (
          <>
            <path
              d={`M ${angle} ${50 - Math.min(Math.max(tan, -2), 2) * 20}`}
              stroke="orange"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx={angle}
              cy={50 - Math.min(Math.max(tan, -2), 2) * 20}
              r="3"
              fill="orange"
            />
          </>
        )}
        <text x="5" y="15" fontSize="12" fill="orange">
          tan
        </text>
      </svg>

      <hr />
      <h3>🔍 Quick Tip</h3>
      <p>
        In Quadrant {quadrant},{" "}
        {quadrant === 1
          ? "all"
          : quadrant === 2
          ? "sine"
          : quadrant === 3
          ? "tangent"
          : "cosine"}{" "}
        is positive.
      </p>

      <h3>🧠 Mini Quiz</h3>
      <p>What is the sign of sine at 135°?</p>
      <button onClick={() => alert("Positive — it’s in Quadrant II!")}>
        Show Answer
      </button>
    </div>
  );
}
