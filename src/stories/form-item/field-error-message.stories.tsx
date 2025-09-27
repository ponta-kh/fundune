import type { Meta, StoryObj } from "@storybook/react";
import { FieldErrorMessage } from "@/components/common/form-item/field-error-message";

const meta = {
    title: "Form-Item/FieldErrorMessage",
    component: FieldErrorMessage,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {},
} satisfies Meta<typeof FieldErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleError: Story = {
    args: {
        messages: ["This field is required."],
    },
};

export const MultipleErrors: Story = {
    args: {
        messages: ["Invalid email format.", "Email must be at most 255 characters."],
    },
};

export const NoError: Story = {
    args: {
        messages: [],
    },
};
