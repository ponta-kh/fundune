import type { Meta, StoryObj } from "@storybook/react";
import SubmitButtonWithAlert from "@/components/common/button/submit-button-with-alert";
import { InputField } from "@/form";
import { useActionState } from "react";

const meta = {
    title: "Button/SubmitButtonWithAlert",
    component: SubmitButtonWithAlert,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        children: { control: "text" },
        loadingContent: { control: "text" },
        isPending: { control: "boolean" },
        triggerButtonClassName: { control: "text" },
        title: { control: "text" },
        description: { control: "text" },
        actionLabel: { control: "text" },
        cancelLabel: { control: "text" },
        formId: { control: "text" },
    },
} satisfies Meta<typeof SubmitButtonWithAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: "Delete Account",
        loadingContent: "Deleting...",
        title: "Are you absolutely sure?",
        description:
            "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
        actionLabel: "Delete",
        cancelLabel: "Cancel",
        formId: "delete-form-default",
    },
    decorators: [
        (Story, { args }) => {
            const FormWrapper = () => {
                type FormState = {
                    success: boolean;
                    data: {
                        username: string;
                        email: string;
                    };
                } | null;

                const [state, formAction, isPending] = useActionState<FormState, FormData>(
                    async (prevState: FormState, formData: FormData) => {
                        // Simulate network delay
                        await new Promise((resolve) => setTimeout(resolve, 1500));
                        const data = {
                            username: formData.get("username") as string,
                            email: formData.get("email") as string,
                        };
                        alert(`Form submitted:\n${JSON.stringify(data, null, 2)}`);
                        return { success: true, data };
                    },
                    null,
                );

                return (
                    <form id={args.formId} action={formAction}>
                        <InputField
                            id="username"
                            label="ユーザー名"
                            type="text"
                            placeholder="ユーザー名を入力"
                            defaultValue={state?.data.username}
                        />
                        <InputField
                            id="email"
                            label="メールアドレス"
                            type="text"
                            placeholder="メールアドレスを入力"
                            defaultValue={state?.data.email}
                        />
                        <SubmitButtonWithAlert {...args} isPending={isPending} />
                    </form>
                );
            };

            return <FormWrapper />;
        },
    ],
};

export const Pending: Story = {
    args: {
        ...Default.args,
        isPending: true,
        formId: "delete-form-pending",
    },
    decorators: [
        (Story, { args }) => (
            <form id={args.formId}>
                <Story />
            </form>
        ),
    ],
};
