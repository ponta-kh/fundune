import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroupField } from "@/components/common/form-item/radio-group-field";

const items = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
];

const meta = {
    title: "Form-Item/RadioGroupField",
    component: RadioGroupField,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {},
} satisfies Meta<typeof RadioGroupField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: "Favorite Fruit",
        name: "fruit",
        radidItems: items,
    },
};

export const WithDefaultValue: Story = {
    args: {
        label: "Favorite Fruit",
        name: "fruit",
        radidItems: items,
        defaultValue: "banana",
    },
};
