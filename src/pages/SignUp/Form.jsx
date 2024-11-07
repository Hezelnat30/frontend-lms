import sms_white from "@assets/images/icons/sms-white.svg";
import key_white from "@assets/images/icons/key-white.svg";
import user_octagon from "@assets/images/icons/user-octagon-white.svg";
import Navbar from "@/components/Navbar";
import background_glow from "@assets/images/backgrounds/background-glow.png";
import InputForm from "@/components/Modules/Auth/InputForm";
import ButtonSubmitForm from "@/components/Modules/Auth/ButtonSubmitForm";
import { useForm } from "react-hook-form";
import { signUpSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Form({ setMode, setDataSignUp }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data) => {
    setDataSignUp(data);
    setMode("PRICING");
  };

  return (
    <div className="relative flex flex-col flex-1 p-2.5 min-h-screen">
      <div className="absolute w-[calc(100%-20px)] min-h-[calc(100vh-20px)] h-[calc(100%-20px)] bg-[#060A23] -z-10 rounded-[20px]">
        <img
          src={background_glow}
          className="absolute bottom-0 transform -translate-x-1/2 left-1/2"
          alt=""
        />
      </div>
      <Navbar />
      <div className="flex items-center justify-center gap-24">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-[400px] h-fit rounded-[20px] border border-[#262A56] p-[30px] gap-[30px] bg-[#080A2A] shadow-[0px_0px_10px_3px] shadow-primary-purple-1"
        >
          <div className="flex flex-col">
            <h2 className="font-bold text-[26px] leading-[39px] text-white">
              Sign Up
            </h2>
            <p className="text-slate-400">Manage your employees easily</p>
          </div>
          <hr className="border-[#262A56]" />
          <InputForm
            errorMessage={errors.name?.message}
            register={register}
            icon={user_octagon}
            placeholder="Write your name"
            type="text"
            name="name"
          />
          <InputForm
            errorMessage={errors.email?.message}
            register={register}
            icon={sms_white}
            placeholder="Write your email address"
            type="email"
            name="email"
          />
          <InputForm
            errorMessage={errors.password?.message}
            register={register}
            icon={key_white}
            placeholder="Type your secure password"
            type="password"
            name="password"
          />
          <hr className="border-[#262A56]" />
          <ButtonSubmitForm text="Sign Up Now" />
        </form>
        <div className="flex flex-col gap-[30px] max-w-md">
          <h1 className="font-extrabold text-[46px] leading-[68px] text-white">
            Sign Up & Enhance Employees Skills
          </h1>
          <p className="text-lg leading-[32px] text-white">
            We delivery robust features to anyone unconditionally so they can
            grow bigger.
          </p>
        </div>
      </div>
    </div>
  );
}
