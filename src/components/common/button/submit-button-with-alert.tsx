"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { AlertDialog, type AlertDialogProps } from "@/components/common/dialog/alert-dialog";

interface SubmitButtonWithAlertProps extends Omit<AlertDialogProps, "trigger"> {
    /** トリガーボタンの表示内容 */
    children: React.ReactNode;
    /** 処理中状態での表示内容。未指定の場合は"処理中..." */
    loadingContent?: string;
    /** 送信中かどうか。親コンポーネントのuseActionStateとの併用を前提としているため、propsで取得する */
    isPending?: boolean;
    /** トリガーボタンのバリアント。未指定の場合は"destructive" */
    variant?: "success" | "warning" | "destructive";
    /** トリガーボタンの追加CSSクラス */
    triggerButtonClassName?: string;
}

/**
 * 削除確認ダイアログ付きボタンコンポーネント
 *
 * ボタンクリックでダイアログを開き、ダイアログ内のアクションボタンでフォーム送信を行います。
 * フォーム送信後はダイアログが閉じ、トリガーボタンがローディング状態を表示します。
 *
 * ## フロー
 * 1. トリガーボタンクリック → ダイアログが開く
 * 2. ダイアログで確認 → アクションボタンクリック
 * 3. ダイアログが閉じる → トリガーボタンがローディング表示
 * 4. 処理完了 → 結果表示
 *
 * @component
 */
export default function SubmitButtonWithAlert({
    children,
    loadingContent = "処理中...",
    isPending,
    variant = "destructive",
    triggerButtonClassName,
    title,
    description,
    cancelLabel,
    actionLabel,
    formId,
    contentClassName,
    headerClassName,
    titleClassName,
    descriptionClassName,
    footerClassName,
    cancelButtonClassName,
    actionButtonClassName,
}: SubmitButtonWithAlertProps) {
    return (
        <AlertDialog
            trigger={
                <Button
                    type="button"
                    variant={variant}
                    className={triggerButtonClassName}
                    disabled={isPending}
                >
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {loadingContent}
                        </>
                    ) : (
                        children
                    )}
                </Button>
            }
            title={title}
            description={description}
            cancelLabel={cancelLabel}
            actionLabel={actionLabel}
            formId={formId}
            contentClassName={contentClassName}
            headerClassName={headerClassName}
            titleClassName={titleClassName}
            descriptionClassName={descriptionClassName}
            footerClassName={footerClassName}
            cancelButtonClassName={cancelButtonClassName}
            actionButtonClassName={actionButtonClassName}
        />
    );
}
