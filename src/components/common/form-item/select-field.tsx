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
    /** セレクトボックスとラベルの関連付けに使うID */
    id: string;
    /** ラベルに表示するテキスト */
    label: string;

    /** 横並びにするかどうか（スマホは縦並び固定） */
    isHorizontal?: boolean;
    /** 横並び時のラベル列数 (1〜12, デフォルト: 3) */
    labelCol?: number;
    /** 横並び時の入力欄列数 (1〜12, デフォルト: 9) */
    inputCol?: number;

    /** ラベルに追加するCSSクラス */
    labelClassName?: string;
    /** セレクトボックスに追加するCSSクラス */
    selectTriggerClassName?: string;
    /** セレクトボックスに追加するCSSクラス */
    selectContentClassName?: string;
    /** セレクトボックスに追加するCSSクラス */
    selectItemClassName?: string;

    /** セレクトボックス未選択時に表示するプレースホルダー */
    placeholder?: string;
    /** 未選択用に先頭に追加する項目のラベル */
    unselectedOptionLabel?: string;
    /** 選択肢の配列。`selectId` が値、`label` が表示名 */
    items: { selectId: string; label: string }[];
    /** 初期選択値（`selectId` に一致する値） */
    defaultValue?: string;
    /** 入力値 */
    value?: string;

    /** エラーメッセージ（複数行対応） */
    errorMsg?: string[];
}

/**
 * 汎用セレクトフィールド
 *
 * 縦横切り替え対応、スマホは常に縦並び。
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
        <div className={cn("grid gap-2", isHorizontal && "md:grid-cols-12 md:items-start")}>
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
