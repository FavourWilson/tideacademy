import { useEffect, useState } from "react";
import Input from "../Input";
import Sidebar from "./Sidebar"

const OTP = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(180); // 3 minutes (180 seconds)
  const [canResend, setCanResend] = useState(false);

  // Countdown logic
 useEffect(() => {
  const interval = setInterval(() => {
    setTimer((prev) => {
      if (prev <= 1) {
        clearInterval(interval);
        setCanResend(true);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, []);

  // Format mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  // Handle resend
  const handleResend = () => {
    setTimer(180);
    setCanResend(false);
    console.log("OTP resent");
  };

  const handleVerify = () => {
    console.log("Verifying OTP:", otp);
  };

  return (
    <div className="w-full min-h-screen flex">
      {/* Sidebar icon */}
        <Sidebar />

      {/* Main container */}
      <div className="flex flex-col w-full lg:w-1/2 justify-center items-center px-5">
        
        {/* Title */}
        <h1 className="font-bold font-poppins text-xl lg:text-3xl mb-10">
          Verification Code
        </h1>

        {/* Input */}
        <div className="w-full max-w-xs mb-6">
          <Input
            type="text"
            value={otp}
            onchange={(e) => setOtp(e.target.value)}
            placeholder="OTP Code"
          />
        </div>

        {/* Timer */}
        <p className="text-lg font-semibold font-poppins mb-3">
          {formatTime(timer)}
        </p>

        {/* Resend */}
        {canResend ? (
          <button
            onClick={handleResend}
            className="text-blue-600 underline mb-5"
          >
            Resend Code
          </button>
        ) : (
          <p className="text-gray-500 mb-5">Waiting to resend...</p>
        )}

        {/* Verify Button */}
        <button
          type="button"
          onClick={handleVerify}
          className="bg-primary-100 text-white rounded-xl font-semibold font-poppins w-44 px-2 py-2"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default OTP;
