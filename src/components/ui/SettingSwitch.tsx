import { useState } from "react";

interface SettingsSwitchesProps {
    label?: string;
    description?: string;
    onChange?: () => void;
}

export default function SettingsSwitches({
    label,
    description,
}: SettingsSwitchesProps) {
    const [state, setState] = useState(true);

    return (
        <div className="space-y-4">
            <div className="flex  gap-3 items-center">
                <input
                    type="checkbox"
                    id="switchStateSuccess2"
                    className="switch switch-outline switch-primary is-valid mt-2"
                    checked={state}
                    onChange={(e) => {
                        setState(e.target.checked);
                    }}
                />
                <label
                    htmlFor="switchStateSuccess2"
                    className="label-text cursor-pointer flex flex-col justify-center "
                >
                    <span className="text-base">{label}</span>
                    <span>{description}</span>
                </label>
            </div>
        </div>
    );
}
