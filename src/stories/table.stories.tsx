import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "@/components/common/table";

const meta = {
    title: "Table",
    component: Table,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        headerRow: {
            control: false,
            description: "テーブルヘッダーの行を定義するオブジェクトの配列。",
        },
        data: {
            control: false,
            description: "テーブルの各行のデータを定義するオブジェクトの配列。",
        },
        footerRows: {
            control: false,
            description: "テーブルフッターの行を定義するオブジェクトの配列。",
        },
    },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const header = [
    { label: "Invoice", className: "w-[100px]" },
    { label: "Status" },
    { label: "Method" },
    { label: "Amount", className: "text-right" },
];

const data = [
    {
        value: [
            { value: "INV001" },
            { value: "Paid" },
            { value: "Credit Card" },
            { value: "$250.00", className: "text-right" },
        ],
    },
    {
        value: [
            { value: "INV002" },
            { value: "Pending" },
            { value: "PayPal" },
            { value: "$150.00", className: "text-right" },
        ],
    },
    {
        value: [
            { value: "INV003" },
            { value: "Unpaid" },
            { value: "Bank Transfer" },
            { value: "$350.00", className: "text-right" },
        ],
    },
];

const footer = [
    [
        { value: "Total", colSpan: 3, className: "text-right font-bold" },
        { value: "$750.00", className: "text-right font-bold" },
    ],
    [
        { value: "Average", colSpan: 3, className: "text-right" },
        { value: "$250.00", className: "text-right" },
    ],
];

export const Default: Story = {
    args: {
        caption: "A list of your recent invoices.",
        headerRow: header,
        data: data,
        footerRows: footer,
    },
};

export const Empty: Story = {
    args: {
        caption: "A list of your recent invoices.",
        headerRow: header,
        data: [],
    },
};

export const NoFooter: Story = {
    args: {
        caption: "A list of your recent invoices.",
        headerRow: header,
        data: data,
    },
};
