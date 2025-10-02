import type { Meta, StoryObj } from "@storybook/react";
import { AlertDialog } from "@/components/common/alert-dialog";
import { Button } from "@/components/shadcn/button";
import React from "react";

const meta = {
    title: "Common/AlertDialog",
    component: AlertDialog,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        trigger: {
            control: {
                type: null,
            },
        },
        onAction: {
            action: "action executed",
        },
    },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        trigger: <Button variant="outline">Show Dialog</Button>,
        title: "Are you absolutely sure?",
        description: "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
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

export const Controlled: Story = {
    render: function Render() {
        const [open, setOpen] = React.useState(false);
        return (
            <>
                <p className="mb-2 text-center">This dialog is controlled by an external state.</p>
                <Button onClick={() => setOpen(true)}>Open Controlled Dialog</Button>
                <AlertDialog
                    open={open}
                    onOpenChange={setOpen}
                    title="Controlled Dialog"
                    description="Its open state is managed by a React state."
                    actionLabel="OK"
                    onAction={() => setOpen(false)}
                />
            </>
        );
    },
};
