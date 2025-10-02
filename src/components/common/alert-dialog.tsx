"use client";

import * as React from "react";
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
    title: string;
    /** タイトルの下に表示する補足説明（任意）。 */
    description?: string;
    /** キャンセルボタンのテキスト。 */
    cancelLabel?: string;
    /** 続行ボタンのテキスト。 */
    actionLabel: string;
    /** 続行ボタンがクリックされたときに呼び出されるコールバック関数。 */
    onAction: () => void;
    /** `AlertDialogContent` コンポーネントに適用するCSSクラス。 */
    className?: string;
    /** ダイアログの開閉状態を外部から制御する場合に指定します（制御用）。 */
    open?: boolean;
    /** ダイアログの開閉状態が変更されたときに呼び出されるコールバック関数。 */
    onOpenChange?: (open: boolean) => void;
}

/**
 * @component AlertDialog
 * @description ユーザーに破壊的なアクションの確認を求めるモーダルダイアログです。
 *
 * ## 機能
 * - トリガー、タイトル、説明、アクションボタン、キャンセルボタンを簡単に設定できます。
 * - ユーザーのアクションを `onAction` コールバックで受け取ります。
 *
 * ## 依存関係
 * このコンポーネントは `shadcn/ui` の `AlertDialog` 関連コンポーネントに依存しています。
 *
 * ## 使い方
 * - `trigger` prop にダイアログを開くボタンなどの要素を渡します。
 * - `title`, `actionLabel`, `onAction` は必須です。
 *
 * @example
 * ```tsx
 * import { AlertDialog } from "./AlertDialog";
 * import { Button } from "@/components/shadcn/button";
 *
 * const MyAlertDialog = () => (
 *   <AlertDialog
 *     trigger={<Button variant="destructive">アカウントを削除</Button>}
 *     title="本当にアカウントを削除しますか？"
 *     description="この操作は元に戻せません。アカウントと関連データがすべて削除されます。"
 *     cancelLabel="キャンセル"
 *     actionLabel="削除"
 *     onAction={() => console.log("アカウント削除")}
 *   />
 * );
 * ```
 */
export function AlertDialog({
    trigger,
    title,
    description,
    cancelLabel = "Cancel",
    actionLabel,
    onAction,
    className,
    open,
    onOpenChange,
}: AlertDialogProps) {
    return (
        <ShadcnAlertDialog open={open} onOpenChange={onOpenChange}>
            {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
            <AlertDialogContent className={className}>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
                    <AlertDialogAction onClick={onAction}>{actionLabel}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </ShadcnAlertDialog>
    );
}
