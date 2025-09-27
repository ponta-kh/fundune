import type { Meta, StoryObj } from "@storybook/react";
import { ComboboxField } from "@/components/common/form-item/combobox-field";

const frameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
];

const meta = {
    title: "Form-Item/ComboboxField",
    component: ComboboxField,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {},
} satisfies Meta<typeof ComboboxField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: "framework",
        label: "Framework",
        items: frameworks,
        placeholder: "Select framework...",
        searchPlaceholder: "Search framework...",
        emptyMessage: "No framework found.",
    },
};

export const WithDefaultValue: Story = {
    args: {
        id: "framework",
        label: "Framework",
        items: frameworks,
        defaultValue: "next.js",
    },
};

export const Horizontal: Story = {
    args: {
        id: "framework",
        label: "Framework",
        items: frameworks,
        isHorizontal: true,
    },
};

export const WithError: Story = {
    args: {
        id: "framework",
        label: "Framework",
        items: frameworks,
        errorMsg: ["Please select a framework."],
    },
};
