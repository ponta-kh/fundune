import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/shadcn/select";
import { Label } from "@/components/shadcn/label";
import { FieldErrorMessage } from "@/components/common/form-item/field-error-message";
import { cn } from "@/lib/utils";

interface SelectFieldProps {
    /** `Label` と `Select` を関連付けるための一意なID。 */
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
    /** `SelectTrigger` コンポーネントに適用するCSSクラス。 */
    selectTriggerClassName?: string;
    /** `SelectContent` コンポーネントに適用するCSSクラス。 */
    selectContentClassName?: string;
    /** `SelectItem` コンポーネントに適用するCSSクラス。 */
    selectItemClassName?: string;

    /** 何も選択されていないときに `SelectTrigger` に表示されるプレースホルダー。 */
    placeholder?: string;
    /** 選択肢の先頭に「未選択」などの項目を追加する場合、そのラベルを指定します。 */
    unselectedOptionLabel?: string;
    /** `Select` に表示する選択肢の配列。 */
    items: { selectId: string; label: string }[];
    /** `Select` の初期値（非制御用）。`selectId` と一致する値を指定します。 */
    defaultValue?: string;
    /** `Select` の値を外部から制御する場合に指定します（制御用）。 */
    value?: string;

    /** フィールドの下に表示するエラーメッセージの配列。 */
    errorMsg?: string[];
}

/**
 * @component SelectField
 * @description ラベル付きの汎用セレクトボックス（ドロップダウン）フィールドです。
 *
 * ## 機能
 * - `items` 配列に基づいて、選択肢を動的に生成します。
 * - ラベルと入力欄の縦横レイアウト切り替えに対応しています。
 * - エラーメッセージ表示をサポートします。
 *
 * ## 依存関係
 * - `shadcn/ui` (Select, Label)
 * - `FieldErrorMessage`
 *
 * @example
 * ```tsx
 * const fruits = [
 *   { selectId: "apple", label: "リンゴ" },
 *   { selectId: "banana", label: "バナナ" },
 * ];
 *
 * <SelectField
 *   id="fruit"
 *   label="果物"
 *   items={fruits}
 *   placeholder="選択してください"
 *   defaultValue="banana"
 *   isHorizontal={true}
 * />
 * ```
 */
export function SelectField({
    id,
    label,
    isHorizontal = false,
    labelCol = 3,
    inputCol = 9,
    labelClassName = "",
    selectTriggerClassName = "",
    selectContentClassName = "",
    selectItemClassName = "",
    placeholder,
    unselectedOptionLabel,
    items,
    defaultValue,
    value,
    errorMsg,
}: SelectFieldProps) {
    return (
        <div className={cn("grid gap-2", isHorizontal && "md:grid-cols-12 md:items-center")}>
            {/* ラベル */}
            <Label
                htmlFor={id}
                className={cn(labelClassName, isHorizontal && `md:col-span-${labelCol}`)}
            >
                {label}
            </Label>

            {/* セレクトボックス + エラーメッセージ */}
            <div className={cn(isHorizontal && `md:col-span-${inputCol}`)}>
                <Select name={id} defaultValue={defaultValue} value={value}>
                    <SelectTrigger id={id} className={cn("w-[180px]", selectTriggerClassName)}>
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent className={selectContentClassName}>
                        {/* 未選択用オプション */}
                        {unselectedOptionLabel && (
                            <SelectItem value="">{unselectedOptionLabel}</SelectItem>
                        )}
                        {/* 通常の選択肢 */}
                        {items.map(({ selectId, label }) => (
                            <SelectItem
                                key={selectId}
                                value={selectId}
                                className={selectItemClassName}
                            >
                                {label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <FieldErrorMessage messages={errorMsg} />
            </div>
        </div>
    );
}
