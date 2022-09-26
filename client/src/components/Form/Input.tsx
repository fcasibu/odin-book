import * as React from "react";
import { FormControl } from "./FormControl";

type Props = {
    type?: "text" | "email" | "password";
    id: string;
    name: string;
    label?: string;
    error?: { message: string };
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
};

export const Input = (props: Props) => {
    const { type, id, name, error, label, value, onChange, required = false } = props;
    return (
        <FormControl id={id} error={error} label={label}>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full rounded-sm p-2 border-2 focus:outline-sky-500"
            />
        </FormControl>
    );
};
