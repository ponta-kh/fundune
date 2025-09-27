import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { FieldErrorMessage } from "@/components/common/form-item/field-error-message";
import { cn } from "@/lib/utils";

interface FileInputFieldProps {
    /** `Label` と `Input` を関連付けるための一意なID。 */
    id: string;
    /** フィールドのラベルとして表示されるテキスト。 */
    label: string;

    /** `true` の場合、ラベルと入力欄を横並びに配置します（デスクトップ表示）。 */
    isHorizontal?: boolean;
    /** 横並び時のラベルが占めるカラム数（1-12）。`isHorizontal` が `true` の場合のみ有効。 */
    labelCol?: number;
    /** 横並び時の入力欄が占めるカラム数（1-12）。`isHorizontal` が `true` の場合のみ有効。 */
    inputCol?: number;

    /** `Label` コンポーネントに適用するCSSクラス。 */
    labelClassName?: string;
    /** `Input` コンポーネントに適用するCSSクラス。 */
    inputClassName?: string;

    /** フィールドの下に表示するエラーメッセージの配列。 */
    errorMsg?: string[];
    /** `input` 要素の `accept` 属性。許可するファイルタイプを指定します（例: "image/*, .pdf"）。 */
    accept?: string;
    /** `input` 要素の `multiple` 属性。`true` の場合、複数ファイルの選択を許可します。 */
    multiple?: boolean;
    /** `input` 要素の `capture` 属性。モバイルデバイスでカメラやマイクを直接起動する際に使用します。 */
    capture?: "user" | "environment";
}

/**
 * @component FileInputField
 * @description ファイル選択のためのラベル付き入力フィールドです。
 *
 * ## 機能
 * - `shadcn/ui` の `Input` を `type="file"` として使用します。
 * - ラベルと入力欄の縦横レイアウト切り替えに対応しています。
 * - エラーメッセージ表示をサポートします。
 * - `accept`, `multiple`, `capture` など、標準のファイル入力属性をサポートします。
 *
 * ## 依存関係
 * - `shadcn/ui` (Input, Label)
 * - `FieldErrorMessage`
 *
 * ## スタイリング
 * - `labelClassName` と `inputClassName` を通じて、ラベルと入力コンポーネントに個別のスタイルを適用できます。
 *
 * @example
 * ```tsx
 * // 単一の画像ファイルを選択
 * <FileInputField
 *   id="avatar"
 *   label="アバター画像"
 *   accept="image/png, image/jpeg"
 *   isHorizontal={true}
 * />
 *
 * // 複数のファイルを選択
 * <FileInputField
 *   id="documents"
 *   label="書類"
 *   multiple={true}
 *   errorMsg={["ファイルを選択してください"]}
 * />
 * ```
 */
export function FileInputField({
    id,
    label,
    isHorizontal = false,
    labelCol = 3,
    inputCol = 9,
    labelClassName = "",
    inputClassName = "",
    errorMsg,
    accept,
    multiple,
    capture,
}: FileInputFieldProps) {
    return (
        <div className={cn("grid gap-2", isHorizontal && "md:grid-cols-12 md:items-start")}>
            {/* ラベル */}
            <Label
                htmlFor={id}
                className={cn(labelClassName, isHorizontal && `md:col-span-${labelCol}`)}
            >
                {label}
            </Label>

            {/* ファイル入力 + エラーメッセージ */}
            <div className={cn(isHorizontal && `md:col-span-${inputCol}`)}>
                <Input
                    id={id}
                    name={id}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    capture={capture}
                    className={inputClassName}
                />
                <FieldErrorMessage messages={errorMsg} />
            </div>
        </div>
    );
}