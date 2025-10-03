import { Label } from "@/components/shadcn/label";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/radio-group";

interface RadioItem {
    /** ラジオボタンの実際の値。フォーム送信時などに使用されます。 */
    value: string;
    /** ラジオボタンの横に表示されるラベルテキスト。 */
    label: string;
}

interface RadioGroupFieldProps {
    /** ラジオグループ全体の上部に表示されるラベルテキスト。 */
    label: string;
    /** `RadioGroup` の `name` 属性。グループ内のラジオボタンを関連付けます。 */
    name: string;
    /** 表示するラジオボタンの選択肢の配列。 */
    radioItems: RadioItem[];
    /** ラジオグループの初期値（非制御用）。 */
    defaultValue?: string;
    /** ラジオグループの値を外部から制御する場合に指定します（制御用）。 */
    value?: string;
}

/**
 * @component RadioGroupField
 * @description 複数の選択肢から1つを選ぶためのラジオボタングループです。
 *
 * ## 機能
 * - `radioItems` 配列に基づいて、複数のラジオボタンを動的に生成します。
 * - 全体を囲むラベルを表示します。
 *
 * ## 依存関係
 * - `shadcn/ui` (Label, RadioGroup, RadioGroupItem)
 *
 * ## スタイリング
 * - `flex flex-wrap gap-4` クラスにより、ラジオボタンは横に並び、画面幅に応じて折り返します。
 *
 * @example
 * ```tsx
 * const fruits = [
 *   { value: "apple", label: "リンゴ" },
 *   { value: "banana", label: "バナナ" },
 *   { value: "cherry", label: "サクランボ" },
 * ];
 *
 * <RadioGroupField
 *   label="好きな果物"
 *   name="fruit"
 *   radioItems={fruits}
 *   defaultValue="banana"
 * />
 * ```
 */
export function RadioGroupField({
    label,
    name,
    radioItems,
    defaultValue,
    value,
}: RadioGroupFieldProps) {
    return (
        <>
            <Label>{label}</Label>
            <RadioGroup
                name={name}
                value={value}
                defaultValue={defaultValue}
                className="flex flex-wrap gap-4"
            >
                {radioItems.map((radioItem) => {
                    return (
                        <div key={radioItem.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={radioItem.value} id={radioItem.value} />
                            <Label htmlFor={radioItem.value}>{radioItem.label}</Label>
                        </div>
                    );
                })}
            </RadioGroup>
        </>
    );
}
