import React from "react";
import sms_white from "@assets/images/icons/sms-white.svg";
import key_white from "@assets/images/icons/key-white.svg";
import background_glow from "@assets/images/backgrounds/background-glow.png";
import Navbar from "@/components/Navbar";
import InputForm from "@/components/Modules/Auth/InputForm";
import ButtonSubmitForm from "@/components/Modules/Auth/ButtonSubmitForm";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { postSignIn } from "@/services/authService";
import secureLocalStorage from "react-secure-storage";
import { STORAGE_KEY } from "@/utils/const";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Form({ type }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data) => postSignIn(data),
  });

  const onSubmit = async (data) => {
    try {
      const response = await mutateAsync(data);
      const result = response.result;
      secureLocalStorage.setItem(STORAGE_KEY, result);
      result.role === "manager" ? navigate("/manager") : navigate("/student");
    } catch (error) {
      const errorMessage = error.response.data.message;
      if (errorMessage) {
        toast(errorMessage, { type: "error" });
      } else {
        console.log("Failed to sign in", error);
      }
    }
  };

  return (
    <div className="relative flex flex-col p-[10px] min-h-screen">
      <div className="absolute w-[calc(100%-20px)] min-h-[calc(100vh-20px)] h-[calc(100%-20px)] bg-[#060A23] -z-10 rounded-[20px]">
        <img
          src={background_glow}
          className="absolute bottom-0 transform -translate-x-1/2 left-1/2"
          alt="background-glow"
        />
      </div>
      <Navbar type={type} />
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-[400px] min-h-max rounded-[20px] border border-[#262A56] p-8 gap-8 bg-[#080A2A] shadow-[0px_0px_10px_3px] shadow-primary-purple-1"
        >
          <div className="flex flex-col">
            <h1 className="font-bold text-[26px] leading-[39px] text-white">
              Welcome Back!
            </h1>
            <p className="text-slate-400">Manage your employees easily</p>
          </div>
          <hr className="border-[#262A56]" />
          <InputForm
            errorMessage={errors.email?.message}
            register={register}
            icon={sms_white}
            name="email"
            type="email"
            placeholder="Write your email address"
          />
          <div>
            <InputForm
              errorMessage={errors.password?.message}
              register={register}
              icon={key_white}
              name="password"
              type="password"
              placeholder="Write your secure password"
            />
            <div className="flex justify-center mt-3">
              <NavLink
                to="#"
                className="text-sm leading-[21px] text-white hover:underline"
              >
                Forgot Password ?
              </NavLink>
            </div>
          </div>
          <hr className="border-[#262A56]" />
          <ButtonSubmitForm
            text={type === "manager" ? "Sign In to Manage" : "Sign In to Learn"}
            disabled={isPending ? true : false}
          />
        </form>
      </div>
    </div>
  );
}
