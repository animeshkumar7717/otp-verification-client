import React, { useState, useEffect } from "react";

const OTPVerification = ({ phone, onVerify, onResend, onBack }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(120);
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setResendDisabled(false);
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVerify = () => {
    if (/^\d{6}$/.test(otp)) onVerify(otp);
    else setError("Enter a valid 6-digit code");
  };

  const handleResend = () => {
    setResendDisabled(true);
    setTimer(120);
    onResend();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-96 relative">
      <button onClick={onBack} className="absolute top-3 left-3 bg-gray-200 px-3 py-1 rounded-md text-gray-700 hover:bg-gray-300">
        Back
      </button>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-6">Enter OTP</h2>
      <p className="text-gray-600 mb-2">Sent to {phone}</p>
      <input
        type="text"
        value={otp}
        onChange={(e) => /^\d*$/.test(e.target.value) && setOtp(e.target.value)}
        maxLength={6}
        placeholder="Enter 6-digit OTP"
        className={`w-full px-4 py-2 border ${error ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring focus:ring-blue-200 outline-none text-center`}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="flex gap-4 mt-4">
        <button
          onClick={handleVerify}
          disabled={otp.length !== 6}
          className={`px-4 py-2 text-white font-semibold rounded-lg ${
            otp.length !== 6 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Verify
        </button>
        <button
          onClick={handleResend}
          disabled={resendDisabled}
          className={`px-4 py-2 text-white font-semibold rounded-lg ${
            resendDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
          }`}
        >
          Send Code Again
        </button>
      </div>
      <p className="text-gray-500 mt-3">Resend in {formatTime(timer)}</p>
    </div>
  );
};

export default OTPVerification;
