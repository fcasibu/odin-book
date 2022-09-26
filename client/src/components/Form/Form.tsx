import * as React from "react";

type Props = {
    children: React.ReactNode;
    onSubmit?: (event: React.FormEvent) => void;
};

const Form = ({ children, onSubmit }: Props) => {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-2 w-full">
            {children}
        </form>
    );
};

export default Form;
