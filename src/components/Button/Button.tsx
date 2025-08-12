import React from "react";
import ButtonVariantType from "../../types/ButtonVariantType";
import ThemeType from "../../types/ThemeType";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: ThemeType;
  onClick?: any;
  onSubmit?: any;
  onReset?: any;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: ButtonVariantType;
  children: any;
  loading?: boolean;
  className?: string;
  [key: string]: any;
}

const baseClasses = "inline-grid grid-flow-col place-items-center gap-1.5 whitespace-nowrap align-middle cursor-pointer select-none transition-colors duration-200 rounded-md border text-sm h-10 px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const byTheme: Record<ThemeType, { base: string; hover: string; ring: string; text?: string; fill?: string }> = {
  [ThemeType.primary]: {
    base: "bg-primary-600 text-white border-primary-600",
    hover: "hover:bg-primary-700",
    ring: "focus-visible:ring-primary-600"
  },
  [ThemeType.default]: {
    base: "bg-gray-200 text-gray-900 border-gray-200",
    hover: "hover:bg-gray-300",
    ring: "focus-visible:ring-gray-400"
  }
};

const byVariant: Record<ButtonVariantType, (t: ReturnType<typeof resolveTheme>) => string> = {
  [ButtonVariantType.default]: (t) => `${t.base} ${t.hover} ${t.ring}`,
  [ButtonVariantType.outline]: (t) => `bg-transparent text-current ${t.ring} border-current hover:opacity-80`,
  [ButtonVariantType.fill]: (t) => `${t.base} ${t.ring}`,
  [ButtonVariantType.transparent]: () => `bg-transparent text-black dark:text-white border-transparent hover:bg-black/5 dark:hover:bg-white/10 ${""}`,
  [ButtonVariantType.chroma]: () => `bg-primary-600 text-white border-primary-600 hover:bg-primary-400 hover:text-black ${""}`
};

function resolveTheme(theme?: ThemeType) {
  return byTheme[theme ?? ThemeType.default];
}

const Button = ({
  type,
  theme,
  variant,
  loading,
  children,
  disabled,
  className,
  ...restProps
}: ButtonProps) => {
  const t = resolveTheme(theme);
  const variantClasses = byVariant[variant ?? ButtonVariantType.default](t);
  const classes = [baseClasses, variantClasses, className].filter(Boolean).join(" ");

  return (
    <button
      className={classes}
      type={type || "button"}
      disabled={disabled || loading}
      {...restProps}
    >
      {loading && (
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;


