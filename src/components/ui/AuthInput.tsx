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
        <div className="input w-md mb-8">
            <span
                className={`icon-[${icon}] text-base-content/80 my-auto size-5 shrink-0`}
            ></span>
            <div className="input-floating group">
                <input
                    type={type}
                    placeholder={placeholder}
                    className="ps-4"
                    id={id}
                    {...props}
                />
                <label className="input-floating-label" htmlFor={id}>
                    {label}
                </label>
            </div>
        </div>
    );
}
