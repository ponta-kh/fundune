'use client';

import { Checkbox } from "@/components/shadcn/checkbox";
import { Label } from "@/components/shadcn/label";
import { FieldErrorMessage } from "@/components/common/form-item/field-error-message";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CheckboxFieldProps {
    /** `Checkbox` と `Label` を関連付けるための一意なID。`htmlFor` と `id` に使用されます。 */
    id: string;
    /** チェックボックスの横に表示されるラベルテキスト。 */
    label: string;
    /** チェックボックスの初期状態を定義します（非制御用）。 */
    defaultChecked?: boolean;
    /** チェックボックスの状態を外部から制御する場合に指定します（制御用）。 */
    checked?: boolean;
    /** チェック状態が変更されたときに呼び出されるコールバック関数。新しいチェック状態が引数として渡されます。 */
    onCheckedChange?: (checked: boolean) => void;
    /** `Label` コンポーネントに適用するCSSクラス。 */
    labelClassName?: string;
    /** `Checkbox` コンポーネントに適用するCSSクラス。 */
    checkboxClassName?: string;
    /** フィールドの下に表示するエラーメッセージの配列。 */
    errorMsg?: string[];
}

/**
 * @component CheckboxField
 * @description ラベル付きの汎用チェックボックスフィールドです。エラーメッセージ表示にも対応しています。
 *
 * ## 機能
 * - ラベルとチェックボックスを横に並べて表示します。
 * - 制御コンポーネントと非制御コンポーネントの両方のモードをサポートします。
 * - `errorMsg` prop を通じて、フィールドの下にエラーメッセージを表示できます。
 *
 * ## 状態管理
 * - `checked` prop を渡すことで、コンポーネントは制御モードで動作します。状態管理は親コンポーネントで行う必要があります。
 * - `checked` prop を渡さない場合、コンポーネントは内部で `useState` を使用して自身の状態を管理します（非制御モード）。
 *
 * ## アクセシビリティ
 * - `id` prop は `Label` の `htmlFor` と `Checkbox` の `id` を結びつけ、スクリーンリーダーの読み上げを改善します。
 *
 * ## フォーム連携
 * - `name` 属性を持つ `input[type="hidden"]` が含まれており、フォーム送信時にチェック状態を送信します。
 *
 * @example
 * ```tsx
 * // 非制御コンポーネントとして使用
 * <CheckboxField
 *   id="terms"
 *   label="利用規約に同意する"
 *   defaultChecked={false}
 * />
 *
 * // 制御コンポーネントとして使用
 * const [isChecked, setIsChecked] = useState(true);
 * <CheckboxField
 *   id="newsletter"
 *   label="ニュースレターを購読する"
 *   checked={isChecked}
 *   onCheckedChange={setIsChecked}
 *   errorMsg={!isChecked ? ["購読をおすすめします！"] : undefined}
 * />
 * ```
 */
export function CheckboxField({
    id,
    label,
    defaultChecked,
    checked,
    onCheckedChange,
    labelClassName,
    checkboxClassName,
    errorMsg,
}: CheckboxFieldProps) {
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
                <Checkbox
                    id={id}
                    checked={finalChecked}
                    onCheckedChange={handleCheckedChange}
                    className={cn(checkboxClassName)}
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