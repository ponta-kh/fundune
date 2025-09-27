interface FieldErrorMessageProps {
    /** 表示するエラーメッセージの配列 */
    messages?: string[];
}

/**
 * フォーム入力欄用のエラーメッセージ表示コンポーネント
 *
 * messages が空または未指定の場合は何も表示しません。
 *
 * @component
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
