import React, { useEffect } from "react";

const ThankYou: React.FC = () => {
  useEffect(() => {
    console.log("ThankYou mounted – will redirect in 5s");
    const timer = window.setTimeout(() => {
      // full reload back to “/”
      window.location.replace("/");
    }, 5000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      {/* your SVG/progress circle */}
      <svg className="w-24 h-24" viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke="#d1fae5"
          strokeWidth="8"
        />
        <circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke="#10b981"
          strokeWidth="8"
          strokeDasharray={2 * Math.PI * 36}
          strokeDashoffset={2 * Math.PI * 36}
          className="progress-circle"
        />
      </svg>

      <div className="text-4xl text-green-600">✓</div>
      <p className="text-green-700 font-semibold text-lg">
        Thank you for your feedback!
      </p>
      <p className="text-gray-500">Returning home in 5 seconds…</p>
    </div>
  );
};

export default ThankYou;
