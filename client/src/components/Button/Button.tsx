import * as React from "react";

const padding = {
    sm: "px-2 py-1",
    md: "px-4 py-2",
    lg: "px-6 py-4",
};

const colors = {
    success: "bg-green-500",
    default: "bg-sky-500",
};

type Size = "sm" | "md" | "lg";

type Variant = "success" | "default";

type Props = {
    children: React.ReactNode;
    size: Size;
    variant: Variant;
};

const Button = ({ children, size, variant }: Props) => {
    return (
        <button
            className={`${colors[variant]} text-white font-bold rounded-md ${padding[size]} hover:scale-95 active:scale-90 transition-all ease-linear`}
        >
            {" "}
            {children}
        </button>
    );
};

export default Button;
