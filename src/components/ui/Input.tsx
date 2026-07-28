import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className = "", ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={`w-full border border-line bg-paper px-4 py-2.5 font-body text-sm text-ink placeholder:text-slate-soft focus:outline-none focus:border-merah transition-colors ${className}`}
      {...props}
    />
  );
});

export default Input;
