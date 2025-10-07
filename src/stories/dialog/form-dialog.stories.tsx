import type { Meta, StoryObj } from "@storybook/react";
import { FormDialog } from "@/components/common/dialog/form-dialog";
import { Button } from "@/components/shadcn/button";
import SubmitButton from "@/components/common/button/submit-button";
import { InputField } from "@/form";

const meta = {
    title: "Dialog/FormDialog",
    component: FormDialog,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof FormDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 疑似的なサーバーアクション関数
 * Storybook 環境では "use server" を使えないため、
 * クライアントで擬似的に再現。
 */
async function mockServerAction(formData: FormData) {
    console.log("✅ mockServerAction called:", Object.fromEntries(formData.entries()));
    await new Promise((resolve) => setTimeout(resolve, 800));
}

export const Default: Story = {
    args: {
        trigger: <Button variant="primary">Edit Profile</Button>,
        title: "Edit Profile",
        description: "Make changes to your profile here. Click save when you're done.",
        footerComponent: (
            <Button type="submit" form="profile-form">
                フッターにも配置できます
            </Button>
        ),
        children: ({ setOpen }) => (
            <form
                id="profile-form"
                action={async (formData) => {
                    await mockServerAction(formData);
                    alert(
                        `Form submitted:\n${JSON.stringify(Object.fromEntries(formData.entries()), null, 2)}`,
                    );
                    setOpen(false);
                }}
                className="grid gap-4 py-4"
            >
                <InputField
                    id="username"
                    label="ユーザー名"
                    type="text"
                    placeholder="ユーザー名を入力"
                />
                <InputField
                    id="email"
                    label="メールアドレス"
                    type="text"
                    placeholder="メールアドレスを入力"
                />
                <SubmitButton>Submit</SubmitButton>
            </form>
        ),
    },
};
