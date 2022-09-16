import * as React from "react";

const padding = {
    none: "p-0",
    sm: "px-3 py-1",
    md: "px-4 py-2",
    lg: "px-8 py-4",
};

const colors = {
    default: "bg-sky-500",
    success: "bg-green-500",
    danger: "bg-red-500",
    none: "bg-none",
};

const textColors = {
    default: "text-sky-700",
    white: "text-white",
    danger: "text-red-700",
    success: "text-green-700",
};

type Size = keyof typeof padding;
type Variant = keyof typeof colors;
type TextColor = keyof typeof textColors;

type Props = {
    children: React.ReactNode;
    size?: Size;
    variant?: Variant;
    text?: TextColor;
    onClick?: (event: React.MouseEvent) => void;
    type?: "button" | "submit" | "reset";
};

const Button = ({ children, size = "md", variant = "default", text = "white", type = "button", onClick }: Props) => {
    return (
        <button
            className={`${colors[variant]} ${textColors[text]} font-bold rounded-md ${padding[size]} hover:scale-[.98] active:scale-[.95] transition-all ease-linear`}
            onClick={onClick}
            type={type}
        >
            {" "}
            {children}
        </button>
    );
};

export default Button;
