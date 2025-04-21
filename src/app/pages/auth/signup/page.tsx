"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";
import { Main } from "@/components/Main";
import Input from "@/components/Input";
import AuthCard from "@/components/AuthCard";
import toast from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await apiClient.post("/signup", {
        name,
        email,
        password,
        role: "admin",
      });
      router.push("/pages/auth/login");
      toast.success("Sign up successfully!");
    } catch (error) {
      toast.error("Signup failed");
      console.error("Signup failed:", error);
    }
  };

  const handleLoginRedirect = () => {
    router.push("/pages/auth/login");
  };

  const footerLinks = [
    {
      text: "Already have an account? Login",
      onClick: handleLoginRedirect,
    },
  ];

  return (
    <Main>
      <div className="bg-gray-50 min-h-screen flex justify-center items-center p-4">
        <AuthCard
          title="Signup"
          onSubmit={handleSignup}
          submitButtonText="Signup"
          footerLinks={footerLinks}
        >
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name"
          />
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

export default Signup;
