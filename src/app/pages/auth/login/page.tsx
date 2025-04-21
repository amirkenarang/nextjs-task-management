"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";
import { Main } from "@/components/Main";
import Button from "@/components/Button";
import Input from "@/components/Input";
import CardTitle from "@/components/CardTitle";

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
    // router.push("/pages/auth/forget-password");
  };

  const handleSignupRedirect = () => {
    router.push("/pages/auth/signup");
  };

  return (
    <Main>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <CardTitle>Login</CardTitle>
          <div className="space-y-4">
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
                onClick={handleLogin}
                variant="primary"
                size="md"
                className="w-full"
              >
                Login
              </Button>
            </div>
            <div className="text-center mt-4">
              <a
                onClick={handleForgetPasswordRedirect}
                className="link link-primary cursor-pointer"
              >
                Forgot password? (Comming Soon)
              </a>
            </div>
            <div className="text-center mt-4 space-y-2">
              <p className="text-sm">
                Already, don&apos;t have an account?{" "}
                <a
                  onClick={handleSignupRedirect}
                  className="link link-primary cursor-pointer"
                >
                  Signup
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Login;
