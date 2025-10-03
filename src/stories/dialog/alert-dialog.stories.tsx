import type { Meta, StoryObj } from "@storybook/react";
import { AlertDialog } from "@/components/common/dialog/alert-dialog";
import { Button } from "@/components/shadcn/button";

const meta = {
    title: "Dialog/AlertDialog",
    component: AlertDialog,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        trigger: {
            control: false,
            description:
                "ダイアログを開くためのトリガーとなるReact要素。ストーリーごとにargsで定義されます。",
        },
    },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        trigger: <Button variant="outline">Show Dialog</Button>,
        title: "Are you absolutely sure?",
        description:
            "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
        cancelLabel: "Cancel",
        actionLabel: "Continue",
    },
};

export const Destructive: Story = {
    args: {
        ...Default.args,
        trigger: <Button variant="destructive">Delete Account</Button>,
        title: "Do you really want to delete your account?",
        actionLabel: "Delete",
    },
};
