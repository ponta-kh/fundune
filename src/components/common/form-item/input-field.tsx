import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { FieldErrorMessage } from "@/components/common/form-item/field-error-message";
import { cn } from "@/lib/utils";

interface InputFieldProps {
    /** `Label` と `Input` を関連付けるための一意なID。 */
    id: string;
    /** フィールドのラベルとして表示されるテキスト。 */
    label: string;
    /** `Input` コンポーネントの `type` 属性。 */
    type: "text" | "number" | "password";

    /** `Input` に表示されるプレースホルダーテキスト。 */
    placeholder?: string;
    /** `Input` の初期値を定義します（非制御用）。 */
    defaultValue?: string;
    /** `Input` の値を外部から制御する場合に指定します（制御用）。 */
    value?: string;
    /** `true` の場合、`Input` を読み取り専用にします。 */
    isReadonly?: boolean;

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
}

/**
 * @component InputField
 * @description ラベル、入力欄、エラーメッセージを組み合わせた汎用的なテキスト入力フィールドです。
 *
 * ## 機能
 * - `text`, `number`, `password` タイプをサポートします。
 * - ラベルと入力欄の縦横レイアウト切り替えに対応しています。
 * - 制御コンポーネントと非制御コンポーネントの両方のモードをサポートします。
 * - エラーメッセージ表示をサポートします。
 *
 * ## 依存関係
 * - `shadcn/ui` (Input, Label)
 * - `FieldErrorMessage`
 *
 * ## 状態管理
 * - `value` prop を渡すことで、コンポーネントは制御モードで動作します。`onChange` イベントを使用して状態を親で管理する必要があります。
 * - `value` prop を渡さない場合、`defaultValue` を初期値として使用する非制御コンポーネントとして動作します。
 *
 * @example
 * ```tsx
 * // 非制御コンポーネントとして使用
 * <InputField
 *   id="username"
 *   label="ユーザー名"
 *   type="text"
 *   placeholder="ユーザー名を入力"
 *   defaultValue=""
 * />
 *
 * // 制御コンポーネントとして使用
 * const [password, setPassword] = useState("");
 * <InputField
 *   id="password"
 *   label="パスワード"
 *   type="password"
 *   value={password}
 *   onChange={(e) => setPassword(e.target.value)}
 *   isHorizontal={true}
 *   errorMsg={password.length < 8 ? ["8文字以上で入力してください"] : []}
 * />
 * ```
 */
export function InputField({
    id,
    label,
    type,
    placeholder,
    defaultValue,
    value,
    isReadonly = false,
    isHorizontal = false,
    labelCol = 3,
    inputCol = 9,
    labelClassName = "",
    inputClassName = "",
    errorMsg,
}: InputFieldProps) {
    return (
        <div
            // 基本は縦並び(grid gap-2)、横並びなら md: 以上で grid-cols-12
            className={cn("grid gap-2", isHorizontal && "md:grid-cols-12 md:items-center")}
        >
            {/* ラベル */}
            <Label
                htmlFor={id}
                className={cn(
                    labelClassName,
                    // 横並び時のみ col-span を付与
                    isHorizontal && `md:col-span-${labelCol}`,
                )}
            >
                {label}
            </Label>

            {/* 入力欄 + エラーメッセージ */}
            <div className={cn(isHorizontal && `md:col-span-${inputCol}`)}>
                <Input
                    id={id}
                    name={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    defaultValue={defaultValue}
                    readOnly={isReadonly}
                    className={inputClassName}
                />
                <FieldErrorMessage messages={errorMsg} />
            </div>
        </div>
    );
}