import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import SubmitButton from "@/components/common/button/submit-button";

const meta = {
    title: "Button/SubmitButton",
    component: SubmitButton,
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <form
                action={async (formData) => {
                    action("formAction")(formData);
                    // Simulate network delay
                    await new Promise((resolve) => setTimeout(resolve, 1500));
                }}
            >
                <Story />
            </form>
        ),
    ],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        children: { control: "text" },
        loadingContent: { control: "text" },
        isPending: { control: "boolean" },
    },
} satisfies Meta<typeof SubmitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: "Submit",
        loadingContent: "Submitting...",
        isPending: false,
    },
};

export const Pending: Story = {
    args: {
        ...Default.args,
        isPending: true,
    },
};
