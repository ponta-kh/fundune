import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { FieldErrorMessage } from "@/components/common/form-item/field-error-message";
import { cn } from "@/lib/utils";

interface InputFieldProps {
    /** 入力欄とラベルの関連付けに使うID */
    id: string;
    /** ラベルに表示するテキスト */
    label: string;
    /** 入力欄のタイプ（text / number / password のみ） */
    type: "text" | "number" | "password";

    /** プレースホルダーテキスト */
    placeholder?: string;
    /** 初期値 */
    defaultValue?: string;
    /** 入力値 */
    value?: string;
    /** 読み取り専用にするかどうか（デフォルト: false） */
    isReadonly?: boolean;

    /** 横並びにするかどうか（スマホは縦並び固定） */
    isHorizontal?: boolean;
    /** 横並び時のラベル列数 (1〜12, デフォルト: 3) */
    labelCol?: number;
    /** 横並び時の入力欄列数 (1〜12, デフォルト: 9) */
    inputCol?: number;

    /** ラベルに追加するCSSクラス */
    labelClassName?: string;
    /** インプットに追加するCSSクラス */
    inputClassName?: string;

    /** エラーメッセージ（複数行対応） */
    errorMsg?: string[];
}

/**
 * 汎用テキスト入力フィールド
 *
 * 縦横切り替え対応、スマホは常に縦並び。
 */
export function InputField({
    id,
    label,
    type,
    placeholder,
    defaultValue,
    value,
    isReadonly = false,
    isHorizontal = false,
    labelCol = 3,
    inputCol = 9,
    labelClassName = "",
    inputClassName = "",
    errorMsg,
}: InputFieldProps) {
    return (
        <div
            // 基本は縦並び(grid gap-2)、横並びなら md: 以上で grid-cols-12
            className={cn("grid gap-2", isHorizontal && "md:grid-cols-12 md:items-start")}
        >
            {/* ラベル */}
            <Label
                htmlFor={id}
                className={cn(
                    labelClassName,
                    // 横並び時のみ col-span を付与
                    isHorizontal && `md:col-span-${labelCol}`,
                )}
            >
                {label}
            </Label>

            {/* 入力欄 + エラーメッセージ */}
            <div className={cn(isHorizontal && `md:col-span-${inputCol}`)}>
                <Input
                    id={id}
                    name={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    defaultValue={defaultValue}
                    readOnly={isReadonly}
                    className={inputClassName}
                />
                <FieldErrorMessage messages={errorMsg} />
            </div>
        </div>
    );
}
