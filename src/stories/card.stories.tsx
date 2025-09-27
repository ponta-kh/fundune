import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "@/components/common/card";
import { Button } from "@/components/shadcn/button";

const meta = {
    title: "Card",
    component: Card,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: "Card Title",
        description: "This is the card description.",
        children: "This is the card content.",
        footer: "This is the card footer.",
    },
};

export const WithAction: Story = {
    args: {
        title: "Card Title",
        description: "This is the card description.",
        action: <Button>Action</Button>,
        children: "This is the card content.",
        footer: "This is the card footer.",
    },
};

export const OnlyContent: Story = {
    args: {
        children: "This is the only content in the card.",
    },
};

export const WithCustomClass: Story = {
    args: {
        title: "Custom Styled Card",
        children: "This card has a custom border.",
        className: "border-blue-500 border-2",
        titleClassName: "text-blue-500",
        contentClassName: "text-gray-600",
        footer: "Custom footer",
        footerClassName: "bg-blue-100",
    },
};
