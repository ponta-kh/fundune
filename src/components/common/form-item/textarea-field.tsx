import { Label } from "@/components/shadcn/label";
import { Textarea } from "@/components/shadcn/textarea";
import { FieldErrorMessage } from "@/components/common/form-item/field-error-message";
import { cn } from "@/lib/utils";

interface TextareaFieldProps {
    /** `Label` と `Textarea` を関連付けるための一意なID。 */
    id: string;
    /** フィールドのラベルとして表示されるテキスト。 */
    label: string;

    /** `Textarea` に表示されるプレースホルダーテキスト。 */
    placeholder?: string;
    /** `Textarea` の初期値を定義します（非制御用）。 */
    defaultValue?: string;
    /** `Textarea` の値を外部から制御する場合に指定します（制御用）。 */
    value?: string;
    /** `true` の場合、`Textarea` を読み取り専用にします。 */
    isReadonly?: boolean;

    /** `true` の場合、ラベルと入力欄を横並びに配置します（デスクトップ表示）。 */
    isHorizontal?: boolean;
    /** 横並び時のラベルが占めるカラム数（1-12）。`isHorizontal` が `true` の場合のみ有効。 */
    labelCol?: number;
    /** 横並び時の入力欄が占めるカラム数（1-12）。`isHorizontal` が `true` の場合のみ有効。 */
    inputCol?: number;

    /** `Label` コンポーネントに適用するCSSクラス。 */
    labelClassName?: string;
    /** `Textarea` コンポーネントに適用するCSSクラス。 */
    textareaClassName?: string;

    /** フィールドの下に表示するエラーメッセージの配列。 */
    errorMsg?: string[];
}

/**
 * @component TextareaField
 * @description ラベル付きの汎用テキストエリアフィールドです。
 *
 * ## 機能
 * - 複数行のテキスト入力に対応します。
 * - ラベルと入力欄の縦横レイアウト切り替えに対応しています。
 * - エラーメッセージ表示をサポートします。
 *
 * ## 依存関係
 * - `shadcn/ui` (Textarea, Label)
 * - `FieldErrorMessage`
 *
 * ## 状態管理
 * - このコンポーネントは `defaultValue` を受け付けますが、内部で状態を完全に管理するわけではありません。
 * - `react-hook-form` のようなフォームライブラリと組み合わせて使用することを想定しています。
 *
 * @example
 * ```tsx
 * <TextareaField
 *   id="comment"
 *   label="コメント"
 *   placeholder="コメントを入力してください..."
 * />
 * ```
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
            className={cn("grid gap-2", isHorizontal && "md:grid-cols-12 md:items-center")}
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
