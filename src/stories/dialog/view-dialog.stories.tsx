import type { Meta, StoryObj } from "@storybook/react";
import { ViewDialog } from "@/components/common/dialog/view-dialog";
import { Button } from "@/components/shadcn/button";

const meta = {
    title: "Common/Dialog/ViewDialog",
    component: ViewDialog,
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
        children: {
            control: false,
            description:
                "ダイアログの本文に表示されるReact要素。ストーリーごとにargsで定義されます。",
        },
    },
} satisfies Meta<typeof ViewDialog>;

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
    },
};

export const WithoutDescription: Story = {
    args: {
        ...Default.args,
        description: undefined,
    },
};

export const WithoutTitle: Story = {
    args: {
        ...Default.args,
        title: undefined,
    },
};
