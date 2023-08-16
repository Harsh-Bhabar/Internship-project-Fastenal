import React from "react";

import "./LoadingScreen.css";

export default function LoadingIcon() {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 492 492"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="loading-icon">
        <circle
          cx="246"
          cy="246"
          r="236"
          fill="none"
          stroke="black"
          strokeWidth="20"
        />
        <g id="clock-hand">
          <circle cx="246" cy="246" r="241" stroke="black" strokeWidth="10" />
          <path
            d="M383.219 105.731C379.833 102.342 374.378 102.062 370.544 105.143L225.282 225.161C219.938 230.539 217 237.653 217 245.271C217 252.638 219.854 259.612 225.086 264.821C230.318 270.031 237.34 272.944 244.866 273C251.861 272.944 259.135 270.339 264.423 265.242L316.127 202.922L384.002 118.307C386.94 114.582 386.604 109.12 383.219 105.731Z"
            fill="black"
          />
        </g>
      </g>
    </svg>
  );
}
