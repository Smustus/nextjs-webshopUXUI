/* "use client";
import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  href,
}) => {
  if (href) {
    return (
      <Link
        href={href}
        className={`inline-block hover:text-focus-visible:outline-dotted focus-visible:text-stone-100 focus-visible:rounded drop-shadow-lg min-h-fit text-center ${
          className || ""
        }`}
        role="button"
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-white inline-block p-3 m-2 bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600 rounded-full hover:shadow-xl hover:text-white hover:bg-gradient-to-tr hover:from-slate-700 hover:via-slate-500 hover:to-slate-700 hover:text-focus-visible:outline-dotted focus-visible:bg-gradient-to-tr focus-visible:from-slate-700 focus-visible:via-slate-500 focus-visible:to-slate-700 shadow-md drop-shadow-lg min-w-fit min-h-fit font-semibold text-center transition duration-200 active:scale-95 ${
        className || ""
      } ${
        disabled
          ? "from-slate-600/50 via-slate-700/50 to-slate-800/50 text-white/20 active:scale-100 hover:text-white/20 hover:bg-gradient-to-br hover:from-slate-600/50 hover:via-slate-700/50 hover:to-slate-800/50"
          : ""
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button; */

"use client";
import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  ariaLabel?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  href,
  ariaLabel,
}) => {
  if (href) {
    return (
      <Link
        href={href}
        className={`inline-block hover:text-focus-visible:outline-dotted focus-visible:text-stone-100 focus-visible:rounded drop-shadow-lg min-h-fit text-center ${
          className || ""
        } ${disabled ? "pointer-events-none opacity-50" : ""}`}
        role="button"
        aria-disabled={disabled}
        aria-label={ariaLabel}
        tabIndex={disabled ? -1 : 0}
        onClick={(e) => disabled && e.preventDefault()}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-white inline-block p-3 m-2 bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600 rounded-full hover:shadow-xl hover:text-white hover:bg-gradient-to-tr hover:from-slate-700 hover:via-slate-500 hover:to-slate-700 hover:text-focus-visible:outline-dotted focus-visible:bg-gradient-to-tr focus-visible:from-slate-700 focus-visible:via-slate-500 focus-visible:to-slate-700 shadow-md drop-shadow-lg min-w-fit min-h-fit font-semibold text-center transition duration-200 active:scale-95 ${
        className || ""
      } ${
        disabled
          ? "from-slate-600/50 via-slate-700/50 to-slate-800/50 text-white/20 active:scale-100 hover:text-white/20 hover:bg-gradient-to-br hover:from-slate-600/50 hover:via-slate-700/50 hover:to-slate-800/50"
          : ""
      }`}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
