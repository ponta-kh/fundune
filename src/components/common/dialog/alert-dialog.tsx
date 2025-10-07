import {
    AlertDialog as ShadcnAlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/shadcn/alert-dialog";

export interface AlertDialogProps {
    /** ダイアログを開くためのトリガー要素。 */
    trigger: React.ReactNode;
    /** ダイアログのヘッダーに表示するタイトル。 */
    title?: string;
    /** タイトルの下に表示する補足説明（任意）。 */
    description?: string;
    /** キャンセルボタンのテキスト。 */
    cancelLabel?: string;
    /** 続行ボタンのテキスト。 */
    actionLabel?: string;
    /** `AlertDialogContent` コンポーネントに適用するCSSクラス。 */
    contentClassName?: string;
    /** `AlertDialogHeader` コンポーネントに適用するCSSクラス。 */
    headerClassName?: string;
    /** `AlertDialogTitle` コンポーネントに適用するCSSクラス。 */
    titleClassName?: string;
    /** `AlertDialogDescription` コンポーネントに適用するCSSクラス。 */
    descriptionClassName?: string;
    /** `AlertDialogFooter` コンポーネントに適用するCSSクラス。 */
    footerClassName?: string;
    /** キャンセルボタンに適用するCSSクラス。 */
    cancelButtonClassName?: string;
    /** 続行ボタンに適用するCSSクラス。 */
    actionButtonClassName?: string;
    /** アクションボタンをフォームと関連付けるためのフォームID。 */
    formId?: string;
}

/**
 * @component AlertDialog
 * @description ユーザーに破壊的なアクションの確認を求めるモーダルダイアログです。
 *
 * ## 機能
 * - トリガー、タイトル、説明、アクションボタン、キャンセルボタンを簡単に設定できます。
 *
 * ## 依存関係
 * このコンポーネントは `shadcn/ui` の `AlertDialog` 関連コンポーネントに依存しています。
 *
 * ## 使い方
 * - `trigger` prop にダイアログを開くボタンなどの要素を渡します。
 * - `title`, `actionLabel` は必須です。
 *
 * @example
 * ```tsx
 * import { AlertDialog } from "./alert-dialog";
 * import { Button } from "@/components/shadcn/button";
 *
 * const MyAlertDialog = () => (
 *   <AlertDialog
 *     trigger={<Button variant="destructive">アカウントを削除</Button>}
 *     title="本当にアカウントを削除しますか？"
 *     description="この操作は元に戻せません。アカウントと関連データがすべて削除されます。"
 *     cancelLabel="キャンセル"
 *     actionLabel="削除"
 *   />
 * );
 * ```
 */
export function AlertDialog({
    trigger,
    title,
    description,
    cancelLabel = "キャンセル",
    actionLabel = "処理実行",
    contentClassName,
    headerClassName,
    titleClassName,
    descriptionClassName,
    footerClassName,
    cancelButtonClassName,
    actionButtonClassName,
    formId,
}: AlertDialogProps) {
    return (
        <ShadcnAlertDialog>
            <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
            <AlertDialogContent className={contentClassName}>
                {(title || description) && (
                    <AlertDialogHeader className={headerClassName}>
                        {title && (
                            <AlertDialogTitle className={titleClassName}>{title}</AlertDialogTitle>
                        )}
                        {description && (
                            <AlertDialogDescription className={descriptionClassName}>
                                {description}
                            </AlertDialogDescription>
                        )}
                    </AlertDialogHeader>
                )}
                <AlertDialogFooter className={footerClassName}>
                    <AlertDialogCancel className={cancelButtonClassName}>
                        {cancelLabel}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        type="submit"
                        className={actionButtonClassName}
                        form={formId}
                    >
                        {actionLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </ShadcnAlertDialog>
    );
}
