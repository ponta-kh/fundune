import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "@/components/common/dialog";
import { Button } from "@/components/shadcn/button";
import React from "react";

const meta = {
    title: "Common/Dialog",
    component: Dialog,
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
        children: {
            control: {
                type: null,
            },
        },
        footer: {
            control: {
                type: null,
            },
        },
    },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        trigger: <Button>Open Dialog</Button>,
        title: "Dialog Title",
        description: "This is a description for the dialog. You can put more details here.",
        children: (
            <div>
                <p>This is the main content of the dialog.</p>
                <p>You can place any React node here, like forms, text, or other components.</p>
            </div>
        ),
        footer: (
            <>
                <Button variant="outline">Cancel</Button>
                <Button>Submit</Button>
            </>
        ),
    },
};

export const WithoutDescription: Story = {
    args: {
        ...Default.args,
        description: undefined,
    },
};

export const WithoutFooter: Story = {
    args: {
        ...Default.args,
        footer: undefined,
    },
};

export const Controlled: Story = {
    render: function Render() {
        const [open, setOpen] = React.useState(false);
        return (
            <>
                <p className="mb-2 text-center">This dialog is controlled by an external state.</p>
                <Button onClick={() => setOpen(true)}>Open Controlled Dialog</Button>
                <Dialog
                    open={open}
                    onOpenChange={setOpen}
                    title="Controlled Dialog"
                    description="Its open state is managed by a React state."
                    footer={<Button onClick={() => setOpen(false)}>Close</Button>}
                >
                    <p>You can close this by clicking the button in the footer, pressing Escape, or clicking outside.</p>
                </Dialog>
            </>
        );
    },
};
