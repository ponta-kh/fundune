import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "@/components/common/accordion";

const accordionItems = [
    {
        value: "item-1",
        title: "Is it accessible?",
        content: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
        value: "item-2",
        title: "Is it styled?",
        content:
            "Yes. It comes with default styles that matches the other components' aesthetic.",
    },
    {
        value: "item-3",
        title: "Is it animated?",
        content: "Yes. It's animated by default, but you can disable it if you prefer.",
    },
];

const meta = {
    title: "common/Accordion",
    component: Accordion,
    tags: ["autodocs"],
    args: {
        items: accordionItems,
    },
    argTypes: {
        items: {
            control: false,
            description: "アコーディオンの各アイテムを定義するオブジェクトの配列。",
        },
    },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        type: "single",
        collapsible: true,
        defaultValue: "item-1",
    },
};

export const Multiple: Story = {
    args: {
        type: "multiple",
        defaultValue: ["item-1", "item-2"],
    },
};

export const CustomStyled: Story = {
    args: {
        type: "single",
        collapsible: true,
        items: [
            {
                ...accordionItems[0],
                itemClassName: "border-b-2 border-red-200",
                triggerClassName: "text-red-500 hover:text-red-700",
                contentClassName: "text-red-900",
            },
            ...accordionItems.slice(1),
        ],
    },
};
