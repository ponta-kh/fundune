interface FieldErrorMessageProps {
    /** 表示するエラーメッセージの文字列配列。 */
    messages?: string[];
}

/**
 * @component FieldErrorMessage
 * @description フォームの入力フィールド下に、バリデーションエラーなどのメッセージを表示するためのコンポーネントです。
 *
 * ## 機能
 * - `messages` prop に渡された文字列の配列をリスト表示します。
 * - 複数のメッセージがある場合は、それぞれが改行されて表示されます。
 * - `messages` が `undefined`、`null`、または空の配列の場合、コンポーネントは何もレンダリングしません。
 *
 * ## スタイリング
 * - デフォルトでは、テキストは赤色（`text-red-500`）で表示されます。
 * - テキストサイズは `text-sm` です。
 *
 * @example
 * ```tsx
 * // エラーが1つの場合
 * <FieldErrorMessage messages={["このフィールドは必須です。"]} />
 *
 * // エラーが複数の場合
 * <FieldErrorMessage messages={["無効なメールアドレスです。", "255文字以内で入力してください。"]} />
 *
 * // エラーがない場合（何も表示されない）
 * <FieldErrorMessage messages={[]} />
 * <FieldErrorMessage />
 * ```
 */
export function FieldErrorMessage({ messages }: FieldErrorMessageProps) {
    if (!messages || messages.length === 0) return null;

    return (
        <p className="text-sm text-red-500">
            {messages.map((msg, index) => (
                <span key={index}>
                    {msg}
                    {index < messages.length - 1 && <br />}
                </span>
            ))}
        </p>
    );
}
