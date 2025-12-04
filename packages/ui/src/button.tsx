"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  appName?: string; // Optional now, kept for backward compatibility if needed
}

export const Button = ({ children, className, appName, ...props }: ButtonProps) => {
  return (
    <button
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};
