import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { FieldErrorMessage } from "@/components/common/form-item/field-error-message";
import { cn } from "@/lib/utils";

interface FileInputFieldProps {
    /** 入力欄とラベルの関連付けに使うID */
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
    /** インプットに追加するCSSクラス */
    inputClassName?: string;

    /** エラーメッセージ（複数行対応） */
    errorMsg?: string[];
    /** 受け付けるファイルの種類 (例: "image/*, .pdf") */
    accept?: string;
    /** 複数ファイルの選択を許可するかどうか */
    multiple?: boolean;
    /** メディアキャプチャの優先設定 (カメラまたはマイク) */
    capture?: "user" | "environment";
}

/**
 * 汎用ファイル入力フィールド
 *
 * 縦横切り替え対応、スマホは常に縦並び。
 */
export function FileInputField({
    id,
    label,
    isHorizontal = false,
    labelCol = 3,
    inputCol = 9,
    labelClassName = "",
    inputClassName = "",
    errorMsg,
    accept,
    multiple,
    capture,
}: FileInputFieldProps) {
    return (
        <div className={cn("grid gap-2", isHorizontal && "md:grid-cols-12 md:items-start")}>
            {/* ラベル */}
            <Label
                htmlFor={id}
                className={cn(labelClassName, isHorizontal && `md:col-span-${labelCol}`)}
            >
                {label}
            </Label>

            {/* ファイル入力 + エラーメッセージ */}
            <div className={cn(isHorizontal && `md:col-span-${inputCol}`)}>
                <Input
                    id={id}
                    name={id}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    capture={capture}
                    className={inputClassName}
                />
                <FieldErrorMessage messages={errorMsg} />
            </div>
        </div>
    );
}
