"use client";
import CardTitle from "@/components/CardTitle";
import Button from "@/components/Button";
import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  children: ReactNode;
  submitButtonText?: string;
  onSubmit: () => void;
  footerLinks: {
    text: string;
    onClick: () => void;
  }[];
}

const AuthCard: React.FC<AuthCardProps> = ({
  title,
  children,
  submitButtonText = "Submit",
  onSubmit,
  footerLinks,
}) => {
  return (
    <div className="card w-full max-w-md bg-base-100 shadow-xl">
      <div className="card-body">
        <CardTitle>{title}</CardTitle>
        <div className="space-y-4">
          {children}
          <div className="form-control mt-6">
            <Button
              onClick={onSubmit}
              variant="primary"
              size="md"
              className="w-full"
            >
              {submitButtonText}
            </Button>
          </div>
          <div className="text-center space-y-2">
            {footerLinks.map((link, index) => (
              <div key={index} className="mt-4">
                <a
                  onClick={link.onClick}
                  className="link link-primary cursor-pointer"
                >
                  {link.text}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
