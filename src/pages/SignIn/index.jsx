import React from "react";
import sms_white from "@assets/images/icons/sms-white.svg";
import key_white from "@assets/images/icons/key-white.svg";
import space_logo from "@assets/images/logos/spacelogo.svg";
import background_glow from "@assets/images/backgrounds/background-glow.png";
import { ReactSVG } from "react-svg";
import Form from "@/pages/SignIn/Form";

export default function SignIn({ type = "manager" }) {
  return <Form type={type} />;
}
