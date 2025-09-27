"use client";

import { Switch } from "@/components/shadcn/switch";
import { Label } from "@/components/shadcn/label";
import { FieldErrorMessage } from "@/components/common/form-item/field-error-message";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SwitchFieldProps {
    /** スイッチとラベルの関連付けに使うID */
    id: string;
    /** ラベルに表示するテキスト */
    label: string;
    /** 初期状態（ONかどうか） */
    defaultChecked?: boolean;
    /** チェック状態 */
    checked?: boolean;
    /** チェック状態が変更されたときのコールバック */
    onCheckedChange?: (checked: boolean) => void;
    /** ラベルに追加するCSSクラス */
    labelClassName?: string;
    /** スイッチに追加するCSSクラス */
    switchClassName?: string;
    /** エラーメッセージ（複数行対応） */
    errorMsg?: string[];
}

/**
 * 汎用スイッチフィールド
 *
 * ラベルとスイッチを横に並べたシンプルなコンポーネントです。
 */
export function SwitchField({
    id,
    label,
    defaultChecked,
    checked,
    onCheckedChange,
    labelClassName,
    switchClassName,
    errorMsg,
}: SwitchFieldProps) {
    const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);

    const isControlled = checked !== undefined;
    const finalChecked = isControlled ? checked : internalChecked;

    const handleCheckedChange = (c: boolean) => {
        if (!isControlled) {
            setInternalChecked(c);
        }
        if (onCheckedChange) {
            onCheckedChange(c);
        }
    };

    return (
        <div>
            <div className="flex items-center space-x-2">
                <Switch
                    id={id}
                    checked={finalChecked}
                    onCheckedChange={handleCheckedChange}
                    className={cn(switchClassName)}
                />
                <Label htmlFor={id} className={cn("font-normal", labelClassName)}>
                    {label}
                </Label>
                <input type="hidden" name={id} value={String(finalChecked)} />
            </div>
            <FieldErrorMessage messages={errorMsg} />
        </div>
    );
}
