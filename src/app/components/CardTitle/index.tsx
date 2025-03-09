import React from "react";

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

const CardTitle: React.FC<CardTitleProps> = ({ children, className = "" }) => {
  return (
    <h2 className={`card-title text-2xl font-bold mb-4 ${className}`}>
      {children}
    </h2>
  );
};

export default CardTitle;
