'use client';

import { Switch } from "@/components/shadcn/switch";
import { Label } from "@/components/shadcn/label";
import { FieldErrorMessage } from "@/components/common/form-item/field-error-message";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SwitchFieldProps {
    /** `Switch` と `Label` を関連付けるための一意なID。 */
    id: string;
    /** スイッチの横に表示されるラベルテキスト。 */
    label: string;
    /** スイッチの初期状態を定義します（非制御用）。 */
    defaultChecked?: boolean;
    /** スイッチの状態を外部から制御する場合に指定します（制御用）。 */
    checked?: boolean;
    /** スイッチの状態が変更されたときに呼び出されるコールバック関数。 */
    onCheckedChange?: (checked: boolean) => void;
    /** `Label` コンポーネントに適用するCSSクラス。 */
    labelClassName?: string;
    /** `Switch` コンポーネントに適用するCSSクラス。 */
    switchClassName?: string;
    /** フィールドの下に表示するエラーメッセージの配列。 */
    errorMsg?: string[];
}

/**
 * @component SwitchField
 * @description オン/オフを切り替えるためのラベル付きスイッチフィールドです。
 *
 * ## 機能
 * - ラベルとスイッチを横に並べて表示します。
 * - 制御コンポーネントと非制御コンポーネントの両方のモードをサポートします。
 * - エラーメッセージ表示に対応しています。
 *
 * ## 依存関係
 * - `shadcn/ui` (Switch, Label)
 * - `FieldErrorMessage`
 *
 * ## 状態管理
 * - `checked` prop を渡すことで、コンポーネントは制御モードで動作します。状態は親で管理する必要があります。
 * - `checked` prop がない場合、コンポーネントは内部の `useState` で状態を管理します（非制御モード）。
 *
 * ## フォーム連携
 * - `name` 属性を持つ `input[type="hidden"]` が含まれており、フォーム送信時にスイッチの状態を送信します。
 *
 * @example
 * ```tsx
 * // 非制御コンポーネントとして使用
 * <SwitchField id="dark-mode" label="ダークモード" defaultChecked={true} />
 *
 * // 制御コンポーネントとして使用
 * const [notifications, setNotifications] = useState(false);
 * <SwitchField
 *   id="notifications"
 *   label="通知を有効にする"
 *   checked={notifications}
 *   onCheckedChange={setNotifications}
 * />
 * ```
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