import React from "react";
import LoginForm from "../components/LoginForm/LoginForm";

function Login() {
  return (
    <div className="flex flex-col items-center gap-20 h-screen">
      <h1>Login page</h1>
      <LoginForm />
    </div>
  );
}

export default Login;
