import type { Meta, StoryObj } from "@storybook/react";
import { DatePickerField } from "@/components/common/form-item/date-picker-field";

const meta = {
    title: "Form-Item/DatePickerField",
    component: DatePickerField,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {},
} satisfies Meta<typeof DatePickerField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: "birth-date",
        label: "Birth Date",
    },
};

export const WithDefaultValue: Story = {
    args: {
        id: "start-date",
        label: "Start Date",
        defaultValue: new Date(),
    },
};

export const WithMinMax: Story = {
    args: {
        id: "event-date",
        label: "Event Date",
        min: new Date(2024, 0, 1),
        max: new Date(2024, 0, 31),
    },
};

export const Horizontal: Story = {
    args: {
        id: "end-date",
        label: "End Date",
        isHorizontal: true,
    },
};

export const WithError: Story = {
    args: {
        id: "due-date",
        label: "Due Date",
        errorMsg: ["Please select a valid date."],
    },
};
