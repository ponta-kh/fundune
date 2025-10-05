"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { AlertDialog, type AlertDialogProps } from "@/dialog";

interface DeleteButtonProps extends AlertDialogProps {
    /** 通常状態での表示内容。アイコンとセットにする可能性もあるのでReactNodeとしている */
    children: React.ReactNode;
    /** 処理中状態での表示内容。アイコンは決まっており、propsでは文字列のみ渡す。未指定の場合は"処理中..." */
    loadingContent?: string;
    /** 送信中かどうか。親コンポーネントのuseACtionStateとの併用を前提としているため、propsで取得する */
    isPending?: boolean;
    /** 追加のCSSクラス */
    deleteButtonClassName?: string;
}

/**
 * 送信ボタンコンポーネント
 *
 * フォームの submit ボタンとして使用でき、`pending` が true の場合は
 * ローディングアイコンと処理中状態用のテキストを表示します。
 *
 * @component
 */
export default function DeleteButton({
    children,
    loadingContent = "処理中...",
    isPending,
    deleteButtonClassName,
    formId,
}: DeleteButtonProps) {
    // useActionStateを使う場合はpropsでisPendingを受け取り、使わない場合はuseFormStatusのpendingを使う
    const { pending } = useFormStatus();
    const isDisabled = isPending ?? pending;

    return (
        <AlertDialog
            trigger={
                <Button
                    type="submit"
                    disabled={isDisabled}
                    variant="destructive"
                    className={deleteButtonClassName}
                    form={formId}
                >
                    {isDisabled ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {loadingContent}
                        </>
                    ) : (
                        children
                    )}
                </Button>
            }
        ></AlertDialog>
    );
}
