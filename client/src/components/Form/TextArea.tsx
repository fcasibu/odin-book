import { FormControl } from "./FormControl";

type Props = {
    id: string;
    name: string;
    label?: string;
    error?: { message: string };
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const TextArea = (props: Props) => {
    const { id, name, label, error, value, onChange } = props;
    return (
        <FormControl label={label} id={id} error={error}>
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full rounded-sm p-2 border-2 focus:outline-sky-500 resize-none no-scrollbar"
            ></textarea>
        </FormControl>
    );
};
