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

