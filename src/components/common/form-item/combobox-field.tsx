'use client';

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcn/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/shadcn/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/popover";
import { Label } from "@/components/shadcn/label";
import { FieldErrorMessage } from "@/components/common/form-item/field-error-message";

interface ComboboxItem {
    /** 選択肢の実際の値。フォーム送信時などに使用されます。 */
    value: string;
    /** 選択肢として表示されるラベルテキスト。 */
    label: string;
}

interface ComboboxFieldProps {
    /** `Label` と入力要素を関連付けるための一意なID。 */
    id: string;
    /** フィールドのラベルとして表示されるテキスト。 */
    label: string;
    /** コンボボックスに表示する選択肢の配列。 */
    items: ComboboxItem[];

    /** 何も選択されていないときにトリガーボタンに表示されるプレースホルダー。 */
    placeholder?: string;
    /** 検索入力欄に表示されるプレースホルダー。 */
    searchPlaceholder?: string;
    /** 検索結果が一件も見つからなかった場合に表示されるメッセージ。 */
    emptyMessage?: string;
    /** 初期状態で選択されている項目の `value`。 */
    defaultValue?: string;

    /** `true` の場合、ラベルと入力欄を横並びに配置します（デスクトップ表示）。 */
    isHorizontal?: boolean;
    /** 横並び時のラベルが占めるカラム数（1-12）。`isHorizontal` が `true` の場合のみ有効。 */
    labelCol?: number;
    /** 横並び時の入力欄が占めるカラム数（1-12）。`isHorizontal` が `true` の場合のみ有効。 */
    inputCol?: number;

    /** `Label` コンポーネントに適用するCSSクラス。 */
    labelClassName?: string;
    /** トリガーとなる `Button` コンポーネントに適用するCSSクラス。 */
    buttonClassName?: string;

    /** フィールドの下に表示するエラーメッセージの配列。 */
    errorMsg?: string[];
}

/**
 * @component ComboboxField
 * @description 検索可能なドロップダウンリストを持つコンボボックスフィールドです。
 *
 * ## 機能
 * - `Popover` 内に `Command` コンポーネントを表示し、選択肢の検索と選択が可能です。
 * - ラベルと入力欄の縦横レイアウト切り替えに対応しています。
 * - エラーメッセージ表示をサポートします。
 *
 * ## 依存関係
 * - `lucide-react` (Check, ChevronsUpDown)
 * - `shadcn/ui` (Button, Command, Popover, Label)
 * - `FieldErrorMessage`
 *
 * ## 状態管理
 * - 選択された値 (`value`) と `Popover` の開閉状態 (`open`) を内部の `useState` で管理しています。
 * - 現状は非制御コンポーネントとしての実装です。
 *
 * ## フォーム連携
 * - `name` 属性を持つ `input[type="hidden"]` が含まれており、フォーム送信時に選択された値を送信します。
 *
 * @example
 * ```tsx
 * const frameworks = [
 *   { value: "next.js", label: "Next.js" },
 *   { value: "remix", label: "Remix" },
 *   { value: "astro", label: "Astro" },
 * ];
 *
 * <ComboboxField
 *   id="framework"
 *   label="フレームワーク"
 *   items={frameworks}
 *   placeholder="選択してください..."
 *   searchPlaceholder="検索..."
 *   emptyMessage="見つかりません。"
 *   defaultValue="next.js"
 *   isHorizontal={true}
 * />
 * ```
 */
export function ComboboxField({
    id,
    label,
    items,
    placeholder = "Select item...",
    searchPlaceholder = "Search item...",
    emptyMessage = "No item found.",
    defaultValue,
    isHorizontal = false,
    labelCol = 3,
    inputCol = 9,
    labelClassName,
    buttonClassName,
    errorMsg,
}: ComboboxFieldProps) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(defaultValue ?? "");

    const selectedLabel = items.find((item) => item.value === value)?.label;

    return (
        <div className={cn("grid gap-2", isHorizontal && "md:grid-cols-12 md:items-center")}>
            <Label
                htmlFor={id}
                className={cn(labelClassName, isHorizontal && `md:col-span-${labelCol}`)}
            >
                {label}
            </Label>

            <div className={cn(isHorizontal && `md:col-span-${inputCol}`)}>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            id={id}
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className={cn("w-[200px] justify-between", buttonClassName)}
                        >
                            {value ? selectedLabel : placeholder}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder={searchPlaceholder} />
                            <CommandList>
                                <CommandEmpty>{emptyMessage}</CommandEmpty>
                                <CommandGroup>
                                    {items.map((item) => (
                                        <CommandItem
                                            key={item.value}
                                            value={item.value}
                                            onSelect={(currentValue) => {
                                                setValue(
                                                    currentValue === value ? "" : currentValue,
                                                );
                                                setOpen(false);
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value === item.value
                                                        ? "opacity-100"
                                                        : "opacity-0",
                                                )}
                                            />
                                            {item.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                <FieldErrorMessage messages={errorMsg} />
                <input type="hidden" name={id} value={value} />
            </div>
        </div>
    );
}