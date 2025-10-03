import type { Meta, StoryObj } from "@storybook/react";
import { SelectField } from "@/components/common/form-item/select-field";

const items = [
    { selectId: "apple", label: "Apple" },
    { selectId: "banana", label: "Banana" },
    { selectId: "cherry", label: "Cherry" },
];

const meta = {
    title: "Form-Item/SelectField",
    component: SelectField,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {},
} satisfies Meta<typeof SelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: "fruit-select",
        label: "Favorite Fruit",
        items: items,
        placeholder: "Select a fruit",
    },
};

export const WithDefaultValue: Story = {
    args: {
        id: "fruit-select",
        label: "Favorite Fruit",
        items: items,
        defaultValue: "banana",
    },
};

export const Horizontal: Story = {
    args: {
        id: "fruit-select",
        label: "Favorite Fruit",
        items: items,
        isHorizontal: true,
    },
};

export const WithError: Story = {
    args: {
        id: "fruit-select",
        label: "Favorite Fruit",
        items: items,
        errorMsg: ["Please select a fruit."],
    },
};
