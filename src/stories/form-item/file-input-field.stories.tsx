import type { Meta, StoryObj } from "@storybook/react";
import { FileInputField } from "@/components/common/form-item/file-input-field";

const meta = {
    title: "Form-Item/FileInputField",
    component: FileInputField,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {},
} satisfies Meta<typeof FileInputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: "avatar",
        label: "Avatar",
    },
};

export const Horizontal: Story = {
    args: {
        id: "resume",
        label: "Resume",
        isHorizontal: true,
    },
};

export const WithAccept: Story = {
    args: {
        id: "photos",
        label: "Photos",
        accept: "image/*",
        multiple: true,
    },
};

export const WithError: Story = {
    args: {
        id: "document",
        label: "Document",
        errorMsg: ["Please upload a file.", "File size exceeds limit."],
    },
};
