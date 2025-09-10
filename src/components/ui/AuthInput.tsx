interface AuthInputProps {
    label: string;
    type: string;
    id: string;
    placeholder?: string;
    icon?: string | boolean;
}

export default function AuthInput({
    label,
    type,
    id,
    placeholder,
    icon = "",
    ...props
}: AuthInputProps) {
    return (
        <div className="w-md mt-8">
            <label className="label-text" htmlFor={id}>
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                className="input"
                id={id}
                {...props}
            />
        </div>
    );
}
