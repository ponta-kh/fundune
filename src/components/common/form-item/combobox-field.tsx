"use client";

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
    value: string;
    label: string;
}

interface ComboboxFieldProps {
    /** コンボボックスとラベルの関連付けに使うID */
    id: string;
    /** ラベルに表示するテキスト */
    label: string;
    /** 選択肢の配列 */
    items: ComboboxItem[];

    /** 未選択時に表示するプレースホルダー */
    placeholder?: string;
    /** 検索入力のプレースホルダー */
    searchPlaceholder?: string;
    /** 検索結果がない場合に表示するメッセージ */
    emptyMessage?: string;
    /** 初期選択値 */
    defaultValue?: string;

    /** 横並びにするかどうか（スマホは縦並び固定） */
    isHorizontal?: boolean;
    /** 横並び時のラベル列数 (1〜12, デフォルト: 3) */
    labelCol?: number;
    /** 横並び時の入力欄列数 (1〜12, デフォルト: 9) */
    inputCol?: number;

    /** ラベルに追加するCSSクラス */
    labelClassName?: string;
    /** ボタンに追加するCSSクラス */
    buttonClassName?: string;

    /** エラーメッセージ（複数行対応） */
    errorMsg?: string[];
}

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
        <div className={cn("grid gap-2", isHorizontal && "md:grid-cols-12 md:items-start")}>
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
