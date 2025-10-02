import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "@/components/common/alert";
import { Terminal } from "lucide-react";

const meta = {
    title: "common/Alert",
    component: Alert,
    tags: ["autodocs"],
    args: {
        title: "Heads up!",
        children: "You can add components to your app using the cli.",
    },
    argTypes: {
        children: {
            control: false,
            description: "アラートの本文に表示されるReact要素。",
        },
        icon: {
            control: false,
            description: "タイトル前に表示されるアイコン要素。",
        },
    },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcon: Story = {
    args: {
        icon: <Terminal className="h-4 w-4" />,
    },
};

export const Destructive: Story = {
    args: {
        variant: "destructive",
        title: "Error",
        children: "Your session has expired. Please log in again.",
    },
};

export const DestructiveWithIcon: Story = {
    args: {
        variant: "destructive",
        icon: <Terminal className="h-4 w-4" />,
        title: "Error",
        children: "Your session has expired. Please log in again.",
    },
};
