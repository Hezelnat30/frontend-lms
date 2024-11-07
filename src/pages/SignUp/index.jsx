import React from "react";
import { useState } from "react";
import Pricing from "./pricing";
import Form from "./form";

export default function SignUp() {
  const [mode, setMode] = useState("AUTH");
  const [dataSignUp, setDataSignUp] = useState(null);

  return (
    <>
      {mode === "AUTH" ? (
        <Form setMode={setMode} setDataSignUp={setDataSignUp} />
      ) : (
        <Pricing data={dataSignUp} />
      )}
    </>
  );
}
