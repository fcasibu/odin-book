import * as React from "react";

type Props = {
    children: React.ReactNode;
};

export const FormControl = ({ children }: Props) => {
    return (
        <label>
            <p></p>
            {children}
        </label>
    );
};
