import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

const SuccessMessage = ({ onComplete }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-lg shadow-lg bg-green-100 w-96">
      <FaCheckCircle className="text-green-600 text-4xl mb-2 animate-bounce" />
      <h2 className="text-green-700 text-xl font-bold text-center mb-2">
        You have successfully verified your mobile number!
      </h2>
      <div className="flex gap-2 mt-2 animate-ping">
        <span role="img" aria-label="flower">🌸</span>
        <span role="img" aria-label="flower">🌼</span>
        <span role="img" aria-label="flower">🌺</span>
      </div>
    </div>
  );
};

export default SuccessMessage;
