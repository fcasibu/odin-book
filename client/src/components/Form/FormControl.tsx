import * as React from "react";

type Props = {
    children: React.ReactNode;
    label?: string;
    id: string;
    error?: { message: string };
};

export const FormControl = ({ children, label, error, id }: Props) => {
    return (
        <label htmlFor={id}>
            {label && <p className="text-xs text-slate-700 pl-1 pb-1">{label}</p>}
            {children}
            {error && (
                <div role="alert" className="text-xs text-red-500 pl-1 pt-1">
                    {error.message}
                </div>
            )}
        </label>
    );
};
