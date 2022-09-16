import * as React from 'react';
import { FormControl } from "./FormControl";

type Props = {
    type?: "text" | "email" | "password";
    id: string;
    name: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
};

export const Input = (props: Props) => {
    const { type, id, name, value, onChange, required = false } = props;
    return (
        <FormControl>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
            />
        </FormControl>
    );
};
