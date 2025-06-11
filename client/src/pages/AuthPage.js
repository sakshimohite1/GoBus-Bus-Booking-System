import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isLogin ? "Login with OTP" : "Sign Up"}
        </h2>

        <div className="flex justify-center mb-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 font-medium rounded-l-full ${
              isLogin ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 font-medium rounded-r-full ${
              !isLogin ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Signup
          </button>
        </div>

        {isLogin ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
};

export default AuthPage;
