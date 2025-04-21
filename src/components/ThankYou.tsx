import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CIRCLE_RADIUS = 36;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

const ThankYou = () => {
  const nav = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      nav("/"); // back to home after 5s
    }, 5000);
    return () => clearTimeout(timer);
  }, [nav]);

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      {/* SVG Circle */}
      <svg className="w-24 h-24" viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r={CIRCLE_RADIUS}
          fill="none"
          stroke="#d1fae5" /* light green track */
          strokeWidth="8"
        />
        <circle
          cx="40"
          cy="40"
          r={CIRCLE_RADIUS}
          fill="none"
          stroke="#10b981" /* green progress */
          strokeWidth="8"
          strokeDasharray={CIRCLE_CIRCUMFERENCE}
          strokeDashoffset={CIRCLE_CIRCUMFERENCE}
          className="progress-circle"
        />
      </svg>

      {/* Checkmark */}
      <div className="text-4xl text-green-600">✓</div>

      {/* Message */}
      <p className="text-green-700 font-semibold text-lg">
        Thank you for your feedback!
      </p>
    </div>
  );
};

export default ThankYou;
