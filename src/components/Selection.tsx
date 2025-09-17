import { useState, useEffect } from "react";

interface SelectionProps {
    options?: string[];
    placeholder?: string;
    onChange?: (value: string) => void;
    defaultValue?: string;
}
export default function Selection({
    options = [],
    defaultValue = "",
    placeholder = "Select an option...",
    onChange,
}: SelectionProps) {
    const [value, setValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    return (
        <div className="relative w-[30%]">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center border px-3 py-2 rounded relative"
            >
                <span>{value.length > 0 ? value : placeholder}</span>
                <span className="icon-[tabler--caret-up-down] shrink-0 size-4 text-base-content absolute top-1/2 right-3 -translate-y-1/2"></span>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full border rounded bg-white shadow">
                    {options.map((opt) => (
                        <div
                            key={opt}
                            onClick={() => {
                                setValue(opt);
                                setIsOpen(false);
                                onChange?.(opt);
                            }}
                            className={`flex justify-between items-center p-2 cursor-pointer hover:bg-gray-100 ${
                                value === opt ? "text-primary font-medium" : ""
                            }`}
                        >
                            <span>{opt}</span>
                            {value === opt && (
                                <span className="icon-[tabler--check] shrink-0 size-4 text-primary" />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
