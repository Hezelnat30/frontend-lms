import Navbar from "@/components/Navbar";
import React from "react";
import { NavLink } from "react-router-dom";
import background_glow from "@assets/images/backgrounds/background-glow.png";

export default function SuccessCheckout() {
  return (
    <div className="relative flex flex-col flex-1 p-[10px] min-h-screen">
      <div className="absolute w-[calc(100%-20px)] min-h-[calc(100vh-20px)] h-[calc(100%-20px)] bg-[#060A23] -z-10 rounded-[20px]">
        <img
          src={background_glow}
          className="absolute bottom-0 transform -translate-x-1/2 left-1/2"
          alt="background"
        />
      </div>
      <Navbar />
      <div className="flex min-h-[calc(100vh-248px)] flex-col justify-center items-center gap-6 mx-auto">
        <h1 className="font-extrabold text-[46px] leading-[69px] text-white text-center">
          Success Checkout <br /> Please Sign In to Continue
        </h1>
        <NavLink to="/manager/signin">
          <div className="flex items-center justify-center w-max rounded-full border p-[20px_54px] transition-all duration-300 hover:bg-primary-purple-1 hover:border-primary-purple-2 hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-primary-purple-2 border-primary-purple-1 shadow-[-10px_-6px_10px_0_#7F33FF_inset]">
            <span className="font-semibold text-white">Sign In Now</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
