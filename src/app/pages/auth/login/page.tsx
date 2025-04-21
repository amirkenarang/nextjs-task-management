"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";
import { Main } from "@/components/Main";
import Input from "@/components/Input";
import AuthCard from "@/components/AuthCard";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/pages/tasks");
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await apiClient.post("/login", { email, password });
      localStorage.setItem("token", response.data.token);
      router.push("/pages/tasks");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleForgetPasswordRedirect = () => {
    // TODO: Add forget password
    toast.success("It is comming in next versions!");
    // router.push("/pages/auth/forget-password");
  };

  const handleSignupRedirect = () => {
    router.push("/pages/auth/signup");
  };

  const footerLinks = [
    {
      text: "Forgot password? (Coming Soon)",
      onClick: handleForgetPasswordRedirect,
    },
    {
      text: "Don't have an account? Signup",
      onClick: handleSignupRedirect,
    },
  ];

  return (
    <Main>
      <div className="bg-gray-50 min-h-screen flex justify-center items-center p-4">
        <AuthCard
          title="Login"
          onSubmit={handleLogin}
          submitButtonText="Login"
          footerLinks={footerLinks}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
          />
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
          />
        </AuthCard>
      </div>
    </Main>
  );
};

export default Login;
