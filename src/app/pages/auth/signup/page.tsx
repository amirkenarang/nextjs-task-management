"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";
import { Main } from "@/components/Main";
import Button from "@/components/Button";
import Input from "@/components/Input";
import CardTitle from "@/components/CardTitle";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const response = await apiClient.post("/signup", {
        name,
        email,
        password,
        role: "admin",
      });
      localStorage.setItem("token", response.data.token);
      router.push("/pages/tasks");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const handleLoginRedirect = () => {
    router.push("/pages/auth/login");
  };

  return (
    <Main>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <CardTitle>Signup</CardTitle>
          <div className="space-y-4">
            <Input
              type="name"
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
            <div className="form-control mt-6">
              <Button
                onClick={handleSignup}
                variant="primary"
                size="md"
                className="w-full"
              >
                Signup
              </Button>
            </div>
            <div className="text-center mt-4 space-y-2">
              <p className="text-sm">
                Already have an account?{" "}
                <a
                  onClick={handleLoginRedirect}
                  className="link link-primary cursor-pointer"
                >
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Signup;
