import { Label } from "@/components/shadcn/label";
import { Textarea } from "@/components/shadcn/textarea";
import { FieldErrorMessage } from "@/components/common/form-item/field-error-message";
import { cn } from "@/lib/utils";

interface TextareaFieldProps {
    /** テキストエリアとラベルの関連付けに使うID */
    id: string;
    /** ラベルに表示するテキスト */
    label: string;

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
    /** テキストエリアに追加するCSSクラス */
    textareaClassName?: string;

    /** エラーメッセージ（複数行対応） */
    errorMsg?: string[];
}

/**
 * 汎用テキストエリアフィールド
 *
 * 縦横切り替え対応、スマホは常に縦並び。
 */
export function TextareaField({
    id,
    label,
    placeholder,
    defaultValue,
    value,
    isReadonly = false,
    isHorizontal = false,
    labelCol = 3,
    inputCol = 9,
    labelClassName = "",
    textareaClassName = "",
    errorMsg,
}: TextareaFieldProps) {
    return (
        <div
            // 基本は縦並び(grid gap-2)、横並びなら md: 以上で grid-cols-12
            className={cn("grid gap-2", isHorizontal && "md:grid-cols-12 md:items-start")}
        >
            {/* ラベル */}
            <Label
                htmlFor={id}
                className={cn(labelClassName, isHorizontal && `md:col-span-${labelCol}`)}
            >
                {label}
            </Label>

            {/* テキストエリア + エラーメッセージ */}
            <div className={cn(isHorizontal && `md:col-span-${inputCol}`)}>
                <Textarea
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    value={value}
                    readOnly={isReadonly}
                    className={textareaClassName}
                />
                <FieldErrorMessage messages={errorMsg} />
            </div>
        </div>
    );
}
