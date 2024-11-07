import React from "react";
import background_glow from "@assets/images/backgrounds/background-glow.png";
import Navbar from "@/components/Navbar";
import note_favorite_white from "@assets/images/icons/note-favorite-white.svg";
import tick_circle_white from "@assets/images/icons/tick-circle-white.svg";
import { ReactSVG } from "react-svg";
import { useMutation } from "@tanstack/react-query";
import { postSignUp } from "@/services/authService";
import { getGeoLocation } from "@/services/geoLocationService";
import { useState } from "react";
import { useEffect } from "react";

export default function Pricing({ data }) {
  const [isIndonesianUser, setIsIndonesianUser] = useState(false);

  const { isPending, mutateAsync: signUp } = useMutation({
    mutationFn: (signUpData) => postSignUp(signUpData),
  });
  const { isPending: isGeoPending, mutateAsync: fetchGeoLocation } =
    useMutation({
      mutationFn: getGeoLocation,
      onSuccess: (country) => {
        setIsIndonesianUser(country === "ID");
      },
      onError: (error) => {
        console.error("Error fetching geolocation", error);
      },
    });

  useEffect(() => {
    fetchGeoLocation();
  }, []);

  const submitData = async (price) => {
    try {
      if (!data) return;
      const payload = {
        ...data,
        price,
      };
      const response = await signUp(payload);
      const midtransUrl = response.data.midtrans_payment_url;
      window.location.replace(midtransUrl);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative flex flex-col p-[10px]">
      <div className="absolute w-[calc(100%-20px)] min-h-[calc(100vh-20px)] h-[calc(100%-20px)] bg-[#060A23] -z-10 rounded-[20px]">
        <img
          src={background_glow}
          className="absolute bottom-0 transform -translate-x-1/2 left-1/2"
          alt="background"
        />
      </div>
      <Navbar />
      <header className="flex flex-col items-center gap-5 text-center mt-[50px]">
        <h1 className="font-extrabold text-[46px] leading-[69px] text-white">
          Best Pricing For Everyone
          <br />
          Who Wants to Grow Business
        </h1>
        <p className="text-lg leading-[27px] text-white">
          We delivery robust features to anyone unconditionally.
        </p>
      </header>
      <div className="grid grid-cols-2 gap-[30px] max-w-[840px] mx-auto mt-[60px] pb-6">
        <div className="card flex flex-col h-fit rounded-[20px] border border-[#262A56] p-[30px] gap-[30px] bg-[#080A2A]">
          <img
            src={note_favorite_white}
            className="w-[60px] h-[60px]"
            alt="icon"
          />
          <div>
            <p className="font-extrabold text-[46px] leading-[69px] text-white">
              Rp 80.000
            </p>
            <p className="text-[#6B6C7F] mt-[6px]">Billed every single month</p>
          </div>
          <hr className="border-[#262A56]" />
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-[6px]">
              <ReactSVG src={tick_circle_white} alt="icon" />
              <p className="font-semibold text-white">
                Access gigantic features company
              </p>
            </div>
            <div className="flex items-center gap-[6px]">
              <ReactSVG src={tick_circle_white} alt="icon" />
              <p className="font-semibold text-white">
                Students analytics and export
              </p>
            </div>
          </div>
          <hr className="border-[#262A56]" />
          <div className="flex flex-col gap-3">
            {isGeoPending ? (
              <p className="text-white">
                Checking availability in your region...
              </p>
            ) : isIndonesianUser ? (
              <button
                type="button"
                onClick={() => submitData(80000)}
                disabled={isPending}
              >
                <div className="flex items-center justify-center gap-3 w-full rounded-full border p-[14px_20px] transition-all duration-300 hover:bg-[#662FFF] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#662FFF] border-[#8661EE] shadow-[-10px_-6px_10px_0_#7F33FF_inset]">
                  <span className="font-semibold text-white">
                    Choose This Plan
                  </span>
                </div>
              </button>
            ) : (
              <p className="text-[#FF435A]">
                This plan is not available at this moment in your country, try
                again later.
              </p>
            )}
            <button type="button">
              <div className="flex items-center justify-center gap-3 w-full rounded-full border p-[14px_20px] transition-all duration-300 hover:bg-[#662FFF] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]">
                <span className="font-semibold text-white">
                  Contact Our Sales
                </span>
              </div>
            </button>
          </div>
        </div>
        <div className="card flex flex-col h-fit rounded-[20px] border border-[#262A56] p-[30px] gap-[30px] bg-[#080A2A]">
          <img
            src={note_favorite_white}
            className="w-[60px] h-[60px]"
            alt="icon"
          />
          <div>
            <p className="font-extrabold text-[46px] leading-[69px] text-white">
              Rp 280.000
            </p>
            <p className="text-[#6B6C7F] mt-[6px]">Billed every single month</p>
          </div>
          <hr className="border-[#262A56]" />
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-[6px]">
              <ReactSVG src={tick_circle_white} alt="icon" />
              <p className="font-semibold text-white">
                Access gigantic features company
              </p>
            </div>
            <div className="flex items-center gap-[6px]">
              <ReactSVG src={tick_circle_white} alt="icon" />
              <p className="font-semibold text-white">
                Students analytics and export
              </p>
            </div>
            <div className="flex items-center gap-[6px]">
              <ReactSVG src={tick_circle_white} alt="icon" />
              <p className="font-semibold text-white">
                Life support 24/7 maintenances
              </p>
            </div>
            <div className="flex items-center gap-[6px]">
              <ReactSVG src={tick_circle_white} alt="icon" />
              <p className="font-semibold text-white">
                Export and analyze data real time
              </p>
            </div>
            <div className="flex items-center gap-[6px]">
              <ReactSVG src={tick_circle_white} alt="icon" />
              <p className="font-semibold text-white">
                More big features coming soon
              </p>
            </div>
          </div>
          <hr className="border-[#262A56]" />
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => submitData(280000)}
              disabled={isPending}
            >
              <div className="flex items-center justify-center gap-3 w-full rounded-full border p-[14px_20px] transition-all duration-300 hover:bg-[#662FFF] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#662FFF] border-[#8661EE] shadow-[-10px_-6px_10px_0_#7F33FF_inset]">
                <span className="font-semibold text-white">
                  Choose This Plan
                </span>
              </div>
            </button>
            <button to="#">
              <div className="flex items-center justify-center gap-3 w-full rounded-full border p-[14px_20px] transition-all duration-300 hover:bg-[#662FFF] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]">
                <span className="font-semibold text-white">
                  Contact Our Sales
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
