import React from "react";
import background_glow from "@assets/images/backgrounds/background-glow.png";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center flex-1 p-[10px] min-h-screen">
      <div className="absolute w-[calc(100%-20px)] min-h-[calc(100vh-20px)] h-[calc(100%-20px)] bg-[#060A23] -z-10 rounded-[20px]">
        <img
          src={background_glow}
          className="absolute bottom-0 transform -translate-x-1/2 left-1/2"
          alt="background"
        />
      </div>

      <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-primary-purple-1 to-primary-purple-2 text-8xl font-bold mb-4 animate-bounce">
        404
      </h1>
      <p className="text-white text-2xl mb-8">Halaman tidak ditemukan.</p>
      <NavLink
        to="/"
        className="bg-primary-purple-2 text-white px-6 py-3 rounded-full hover:bg-primary-purple-1 transition duration-300"
      >
        Kembali ke Beranda
      </NavLink>
    </div>
  );
}
