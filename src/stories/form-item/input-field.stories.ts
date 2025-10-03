import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "@/components/common/form-item/input-field.tsx";

const meta = {
    title: "Form-Item/InputField", // ← Storybookのサイドバーに表示されるカテゴリ/名前
    component: InputField, // ← このストーリーが対象とするコンポーネント
    tags: ["autodocs"], // ← Docsタブ自動生成用
    argTypes: {
        type: {
            // ← コントロールUIの指定
            control: "radio",
            options: ["text", "number", "password"],
        },
    },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: "username",
        label: "ユーザー名",
        type: "text",
        placeholder: "名前を入力してください",
    },
};

export const WithDefaultValue: Story = {
    args: {
        id: "username-default",
        label: "ユーザー名",
        type: "text",
        placeholder: "名前を入力してください",
        defaultValue: "山田 太郎",
    },
};

export const Horizontal: Story = {
    args: {
        id: "username-horizontal",
        label: "ユーザー名",
        type: "text",
        placeholder: "名前を入力してください",
        isHorizontal: true,
    },
};

export const Readonly: Story = {
    args: {
        id: "username-readonly",
        label: "ユーザー名",
        type: "text",
        defaultValue: "編集不可",
        isReadonly: true,
    },
};

export const WithError: Story = {
    args: {
        id: "username-error",
        label: "ユーザー名",
        type: "text",
        placeholder: "名前を入力してください",
        errorMsg: ["ユーザー名は必須です。", "2文字以上で入力してください。"],
    },
};

export const Password: Story = {
    args: {
        id: "password",
        label: "パスワード",
        type: "password",
        placeholder: "パスワードを入力してください",
    },
};
