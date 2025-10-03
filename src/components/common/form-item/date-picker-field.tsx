"use client";

import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcn/button";
import { Calendar } from "@/components/shadcn/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/popover";
import { Label } from "@/components/shadcn/label";
import { FieldErrorMessage } from "@/components/common/form-item/field-error-message";

interface DatePickerFieldProps {
    /** `Label` と入力要素を関連付けるための一意なID。 */
    id: string;
    /** フィールドのラベルとして表示されるテキスト。 */
    label: string;

    /** 初期状態で選択されている日付。 */
    defaultValue?: Date;
    /** 選択可能な最も過去の日付。 */
    min?: Date;
    /** 選択可能な最も未来の日付。 */
    max?: Date;

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
 * @component DatePickerField
 * @description カレンダーから日付を選択するためのポップアップ付き日付ピッカーフィールドです。
 *
 * ## 機能
 * - ボタンクリックでカレンダーをポップアップ表示し、日付を選択できます。
 * - 選択可能な日付の範囲を `min` と `max` propで制限できます。
 * - ラベルと入力欄の縦横レイアウト切り替えに対応しています。
 * - エラーメッセージ表示をサポートします。
 *
 * ## 依存関係
 * - `lucide-react` (CalendarIcon)
 * - `shadcn/ui` (Button, Calendar, Popover, Label)
 * - `FieldErrorMessage`
 *
 * ## 状態管理
 * - 選択された日付 (`date`) と `Popover` の開閉状態 (`isPopoverOpen`) を内部の `useState` で管理しています。
 * - 現状は非制御コンポーネントとしての実装です。
 *
 * ## フォーム連携
 * - `name` 属性を持つ `input[type="hidden"]` が含まれており、フォーム送信時に選択された日付をISO 8601形式の文字列で送信します。
 *
 * @example
 * ```tsx
 * <DatePickerField
 *   id="birthdate"
 *   label="生年月日"
 *   defaultValue={new Date(2000, 0, 1)}
 *   min={new Date(1900, 0, 1)}
 *   max={new Date()}
 *   isHorizontal={true}
 * />
 * ```
 */
export function DatePickerField({
    id,
    label,
    defaultValue,
    min,
    max,
    isHorizontal = false,
    labelCol = 3,
    inputCol = 9,
    labelClassName = "",
    buttonClassName = "",
    errorMsg,
}: DatePickerFieldProps) {
    const [date, setDate] = useState<Date | undefined>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handleSelectDate = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        setIsPopoverOpen(false);
    };

    return (
        <div className={cn("grid gap-2", isHorizontal && "md:grid-cols-12 md:items-center")}>
            {/* ラベル */}
            <Label
                htmlFor={id}
                className={cn(labelClassName, isHorizontal && `md:col-span-${labelCol}`)}
            >
                {label}
            </Label>

            {/* 日付ピッカー + エラーメッセージ */}
            <div className={cn(isHorizontal && `md:col-span-${inputCol}`)}>
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            id={id}
                            variant={"outline"}
                            className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !date && "text-muted-foreground",
                                buttonClassName,
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? date.toLocaleDateString() : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            disabled={(date) =>
                                (min !== undefined && date < min) ||
                                (max !== undefined && date > max)
                            }
                            onSelect={handleSelectDate}
                        />
                    </PopoverContent>
                </Popover>
                <FieldErrorMessage messages={errorMsg} />

                {/* フォーム送信用 */}
                <input type="hidden" name={id} value={date ? date.toISOString() : ""} />
            </div>
        </div>
    );
}
