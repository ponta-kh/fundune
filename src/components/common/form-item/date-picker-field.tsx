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
    /** 入力欄とラベルの関連付けに使うID */
    id: string;
    /** ラベルに表示するテキスト */
    label: string;

    /** 初期値 */
    defaultValue?: Date;
    /** 選択可能な最小日 */
    min?: Date;
    /** 選択可能な最大日 */
    max?: Date;

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

/**
 * 汎用日付ピッカーフィールド
 *
 * shadcn/uiのCalendarとPopoverを使用。
 * 縦横切り替え対応、スマホは常に縦並び。
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
        <div className={cn("grid gap-2", isHorizontal && "md:grid-cols-12 md:items-start")}>
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
