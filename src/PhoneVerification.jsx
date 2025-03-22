import React, { useState } from "react";
import PopUp from "./PopUp";
import OTPVerification from "./OTPVerification";
import axios from "axios";
import { baseURL } from "./config/baseurl";

const PhoneVerification = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showOTP, setShowOTP] = useState(false);

  const validatePhone = (input) => {
    if (!/^[0-9]{10}$/.test(input)) setError("Enter a valid 10-digit mobile number");
    else setError("");
  };

  const handleChange = (e) => {
    const input = e.target.value;
    if (/^\d*$/.test(input)) {
      setPhone(input);
      validatePhone(input);
    }
  };

  const handleVerify = async () => {
    if (!error && phone.length === 10) {
      try {
        const response = await axios.post(`${baseURL}api/auth/send-otp`, { phone });
        setPopupMessage(response?.data?.message || `Verification code sent to ${phone}`);
      } catch (err) {
        setError("Error sending OTP:", err.response?.data || err.message)
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#5A4563]">
      {!showOTP ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 h-64">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Phone Verification</h2>
          <p className="text-gray-600 text-center mb-4">Enter your mobile number</p>
          <input
            type="text"
            value={phone}
            onChange={handleChange}
            placeholder="Enter mobile number"
            className={`w-full px-4 py-2 border ${error ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring focus:ring-blue-200 outline-none`}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            onClick={handleVerify}
            disabled={error || phone.length !== 10}
            className={`w-full mt-4 px-4 py-2 text-white font-semibold rounded-lg ${
              error || phone.length !== 10 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Get OTP
          </button>
        </div>
      ) : (
        <OTPVerification phone={phone} onBack={() => setShowOTP(false)} />
      )}

      {popupMessage && <PopUp message={popupMessage} onClose={() => { setPopupMessage(""); setShowOTP(true); }} />}
    </div>
  );
};

export default PhoneVerification;
