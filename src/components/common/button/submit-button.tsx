"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/shadcn/button";

interface SubmitButtonProps {
    /** 通常状態での表示内容。アイコンとセットにする可能性もあるのでReactNodeとしている */
    children: React.ReactNode;
    /** 処理中状態での表示内容。アイコンは決まっており、propsでは文字列のみ渡す。未指定の場合は"処理中..." */
    loadingContent?: string;
    /** 送信中かどうか。親コンポーネントのuseACtionStateとの併用を前提としているため、propsで取得する */
    isPending?: boolean;
    /** トリガーボタンのバリアント。未指定の場合は"success" */
    variant?: "success" | "warning" | "destructive";
    /** 追加のCSSクラス */
    className?: string;
    /** formのid属性。ボタンがform内にない場合にformと紐づけるために設定が必要 */
    formId?: string;
}

/**
 * 送信ボタンコンポーネント
 *
 * フォームの submit ボタンとして使用でき、`pending` が true の場合は
 * ローディングアイコンと処理中状態用のテキストを表示します。
 *
 * @component
 */
export default function SubmitButton({
    children,
    loadingContent = "処理中...",
    isPending,
    variant = "success",
    className,
    formId,
}: SubmitButtonProps) {
    // useActionStateを使う場合はpropsでisPendingを受け取り、使わない場合はuseFormStatusのpendingを使う
    const { pending } = useFormStatus();
    const isDisabled = isPending ?? pending;

    return (
        <Button
            type="submit"
            disabled={isDisabled}
            variant={variant}
            className={className}
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
    );
}
