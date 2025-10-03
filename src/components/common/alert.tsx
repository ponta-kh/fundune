import { Alert as ShadcnAlert, AlertDescription, AlertTitle } from "@/components/shadcn/alert";

export interface AlertProps {
    /** アラートのタイトルです。 */
    title?: string;
    /** アラートの本文です。 */
    children: React.ReactNode;
    /** アラートの左側に表示するアイコン要素です。 */
    icon?: React.ReactNode;
    /** アラートのスタイルを定義します。'default'または'destructive'が指定できます。 */
    variant?: "default" | "destructive";
    /** アラート全体のコンテナ（`ShadcnAlert`）に適用するCSSクラスです。 */
    className?: string;
    /** `AlertTitle`コンポーネントに適用するCSSクラスです。 */
    titleClassName?: string;
    /** `AlertDescription`コンポーネントに適用するCSSクラスです。 */
    descriptionClassName?: string;
}

/**
 * @component Alert
 * @description ユーザーに重要なメッセージを伝えるための汎用的なアラートコンポーネントです。
 *
 * ## 機能
 * - タイトル、本文、アイコンを表示できます。
 * - `variant` prop を通じて、標準（default）と破壊的（destructive）の2つのスタイルを切り替えられます。
 *
 * ## 依存関係
 * このコンポーネントは `shadcn/ui` の `Alert` 関連コンポーネントに依存しています。
 *
 * ## スタイリング
 * - `className` prop を通じてアラート全体にスタイルを適用できます。
 * - `titleClassName` や `descriptionClassName` を使って各パーツに個別のスタイルを指定することも可能です。
 *
 * @example
 * ```tsx
 * import { Alert } from "./Alert";
 * import { Terminal } from "lucide-react";
 *
 * const MyAlert = () => (
 *   <Alert
 *     variant="destructive"
 *     icon={<Terminal className="h-4 w-4" />}
 *     title="エラー"
 *   >
 *     <p>これは破壊的なアクションに関するアラートです。</p>
 *   </Alert>
 * );
 * ```
 */
export function Alert({
    title,
    children,
    icon,
    variant,
    className,
    titleClassName,
    descriptionClassName,
}: AlertProps) {
    return (
        <ShadcnAlert variant={variant} className={className}>
            {icon}
            {title && <AlertTitle className={titleClassName}>{title}</AlertTitle>}
            <AlertDescription className={descriptionClassName}>{children}</AlertDescription>
        </ShadcnAlert>
    );
}
