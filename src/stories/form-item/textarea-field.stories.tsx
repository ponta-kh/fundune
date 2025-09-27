import type { Meta, StoryObj } from "@storybook/react";
import { TextareaField } from "@/components/common/form-item/textarea-field";

const meta = {
    title: "Form-Item/TextareaField",
    component: TextareaField,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {},
} satisfies Meta<typeof TextareaField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: "comment",
        label: "Comment",
        placeholder: "Enter your comment here...",
    },
};

export const WithDefaultValue: Story = {
    args: {
        id: "bio",
        label: "Biography",
        defaultValue: "This is a default biography.",
    },
};

export const Horizontal: Story = {
    args: {
        id: "feedback",
        label: "Feedback",
        isHorizontal: true,
    },
};

export const Readonly: Story = {
    args: {
        id: "terms",
        label: "Terms of Service",
        defaultValue: "These are the terms of service. They are readonly.",
        isReadonly: true,
    },
};

export const WithError: Story = {
    args: {
        id: "message",
        label: "Message",
        errorMsg: ["Message cannot be empty.", "Message is too short."],
    },
};
