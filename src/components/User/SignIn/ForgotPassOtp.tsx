import  { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosUser from "../../../service/axios/axiosUser";
import NewPassword from "./NewPassword";


const ForgotPassOtp = ({ email }: { email: string | null }) => {
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const [timeLeft, setTimeLeft] = useState<number>(30);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prevCounter) => prevCounter - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value; 
    setOtp(newOtp);

    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus();
    }

    if (element.value === "") {
      if (element.previousSibling) {
        (element.previousSibling as HTMLInputElement).focus();
      }
    }

    if (newOtp.every((digit) => digit !== "")) {
      document.getElementById("verify-button")?.focus(); 
    }
  };

  const handleResend = async () => {
    setOtp(new Array(4).fill(""));
    setTimeLeft(30);
    
    const requestData = {
        email: email,
        name: 'User',
    };

    try {
        const { data } = await axiosUser().post("/resendOtp", requestData,{
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (data.message === "success") {
            toast.success("OTP sent Successfully");
        } else {
            toast.error("Failed to send OTP.");
        }
    } catch (error) {
        console.error('Error sending OTP:', error);
        toast.error((error as Error).message + ' kkkk');
    }
};

  const verifyOtp = async () => {
    const otpValue = otp.join(""); 

    const formData = {
      email,
      otp: otpValue,
    };
    try {
      const { data } = await axiosUser().post('/otpVerify', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (data.message === 'success') {
        toast.success('OTP matched Successfully');
        setShowNewPassword(true); 
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

 

  return (
    <>
      {showNewPassword ? (
        <NewPassword email={email||''}/>
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-4 text-gray-700 text-center">Verify OTP</h1>
          <div className="flex justify-center space-x-2 my-4">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center border rounded text-lg focus:outline-none focus:ring-2 focus:ring-black"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
          <div className="text-center mt-4">
            {timeLeft > 0 ? (
              <p className="text-gray-600">Resend OTP in {timeLeft} seconds</p>
            ) : (
              <button onClick={handleResend} className="text-blue-500 font-semibold hover:underline">
                Resend OTP
              </button>
            )}
          </div>
          <button
            onClick={verifyOtp}
            id="verify-button"
            className="w-full py-2 mt-4 bg-slate-800 text-white rounded hover:bg-black"
          >
            Verify
          </button>
        </>
      )}
    </>
  );
  
};

export default ForgotPassOtp;
