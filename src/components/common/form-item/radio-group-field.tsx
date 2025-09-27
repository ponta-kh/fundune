import { Label } from "@/components/shadcn/label";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/radio-group";

interface RadioItem {
    value: string;
    label: string;
}

interface RadioGroupFieldProps {
    label: string;
    name: string;
    radidItems: RadioItem[];
    defaultValue?: string;
    value?: string;
}

export function RadioGroupField({
    label,
    name,
    radidItems,
    defaultValue,
    value,
}: RadioGroupFieldProps) {
    return (
        <>
            <Label>{label}</Label>
            <RadioGroup
                name={name}
                value={value}
                defaultValue={defaultValue}
                className="flex flex-wrap gap-4"
            >
                {radidItems.map((radioItem) => {
                    return (
                        <div key={radioItem.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={radioItem.value} id={radioItem.value} />
                            <Label htmlFor={radioItem.value}>{radioItem.label}</Label>
                        </div>
                    );
                })}
            </RadioGroup>
        </>
    );
}
