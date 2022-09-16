import * as React from "react";

type Props = {
    children: React.ReactNode;
    onSubmit?: (event: React.FormEvent) => void;
}

const Form = ({ children, onSubmit }: Props) => {
    return (
        <form onSubmit={onSubmit}>
            {children}
        </form>
    )
};

export default Form;
