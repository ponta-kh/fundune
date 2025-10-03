import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/shadcn/button";
import { Tooltip } from "@/components/common/tooltip";

const meta = {
    title: "Tooltip",
    component: Tooltip,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        content: "This is a tooltip",
        children: <Button variant="outline">Hover me</Button>,
    },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Top: Story = {
    args: {
        side: "top",
    },
};

export const Right: Story = {
    args: {
        side: "right",
    },
};

export const Bottom: Story = {
    args: {
        side: "bottom",
    },
};

export const Left: Story = {
    args: {
        side: "left",
    },
};
