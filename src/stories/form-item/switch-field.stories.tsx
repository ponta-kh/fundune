import type { Meta, StoryObj } from "@storybook/react";
import { SwitchField } from "@/components/common/form-item/switch-field";

const meta = {
    title: "Form-Item/SwitchField",
    component: SwitchField,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {},
} satisfies Meta<typeof SwitchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: "dark-mode",
        label: "Dark Mode",
    },
};

export const Checked: Story = {
    args: {
        id: "notifications",
        label: "Enable Notifications",
        defaultChecked: true,
    },
};

export const WithError: Story = {
    args: {
        id: "auto-save",
        label: "Auto Save",
        errorMsg: ["Failed to enable auto save."],
    },
};
