import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxField } from "@/components/common/form-item/checkbox-field";

const meta = {
    title: "Form-Item/CheckboxField",
    component: CheckboxField,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {},
} satisfies Meta<typeof CheckboxField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: "terms",
        label: "Accept terms and conditions",
    },
};

export const Checked: Story = {
    args: {
        id: "newsletter",
        label: "Subscribe to newsletter",
        defaultChecked: true,
    },
};

export const WithError: Story = {
    args: {
        id: "privacy",
        label: "I agree to the privacy policy",
        errorMsg: ["You must accept the privacy policy."],
    },
};

export const WithMultipleErrors: Story = {
    args: {
        id: "privacy",
        label: "I agree to the privacy policy",
        errorMsg: ["This is the first error.", "This is the second error."],
    },
};
