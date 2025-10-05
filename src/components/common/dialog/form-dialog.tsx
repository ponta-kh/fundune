"use client";

import { useActionState, useEffect, useState } from "react";
import {
    Dialog as ShadcnDialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/shadcn/dialog";
import { Button } from "@/components/shadcn/button";

interface ActionState<T> {
    data: T | null;
    success: boolean;
    messages: Record<string, string[]>;
}

export interface FormDialogProps<T> {
    /** ダイアログを開くためのトリガー要素。 */
    trigger: React.ReactNode;
    /** ダイアログのヘッダーに表示するタイトル。 */
    title?: string;
    /** タイトルの下に表示する補足説明（任意）。 */
    description?: string;
    /** ダイアログのメインコンテンツとして表示する要素。 */
    children: React.ReactNode;
    /** `DialogContent` コンポーネントに適用するCSSクラス。 */
    contentClassName?: string;
    /** `DialogHeader` コンポーネントに適用するCSSクラス。 */
    headerClassName?: string;
    /** `DialogTitle` コンポーネントに適用するCSSクラス。 */
    titleClassName?: string;
    /** `DialogDescription` コンポーネントに適用するCSSクラス。 */
    descriptionClassName?: string;
    /** `DialogFooter` コンポーネントに適用するCSSクラス。 */
    footerClassName?: string;
    /** フォームのサブミット時に実行されるサーバアクション。 */
    formBodyAction: (prevState: ActionState<T>, formData: FormData) => Promise<ActionState<T>>;
    /** 初期値 */
    initialState: ActionState<T>;
    /** サブミットボタンに適用するCSSクラス。 */
    submitButtonClassName?: string;
    /** サブミットボタンのバリアント。デフォルトは "primary"。 */
    submitButtonVariant?: "primary" | "secondary" | "destructive" | "outline" | "ghost";
    /** サブミットボタンのテキスト。デフォルトは "サブミット"。 */
    submitButtonText?: string;
    /** 閉じるボタンに適用するCSSクラス。 */
    cancelButtonClassName?: string;
    /** 閉じるボタンのバリアント。デフォルトは "secondary"。 */
    cancelButtonVariant?: "primary" | "secondary" | "destructive" | "outline" | "ghost";
    /** 閉じるボタンのテキスト。デフォルトは "キャンセル"。 */
    cancelButtonText?: string;
}

/**
 * @component FormDialog
 * @description Form機能を持たせた汎用的なモーダルダイアログです。
 *
 * ## 機能
 * - トリガー、ヘッダー、コンテンツを簡単に設定できます。
 * - フッターにはデフォルトで閉じるボタンが表示されます。
 *
 * ## 依存関係
 * このコンポーネントは `shadcn/ui` の `Dialog` 関連コンポーネントに依存しています。
 *
 * ## 使い方
 * - `trigger` prop にダイアログを開くボタンなどの要素を渡します。
 * - `children` は必須です。
 * - `title`, `description` は任意です。
 *
 * @example
 * ```tsx
 * import { ViewDialog } from "./view-dialog";
 * import { Button } from "@/components/shadcn/button";
 *
 * const MyDialog = () => (
 *   <ViewDialog
 *     trigger={<Button>プロフィールを表示</Button>}
 *     title="プロフィール"
 *     description="これがあなたのプロフィール情報です。"
 *   >
 *     <p>ここに名前やメールアドレスなどの詳細情報が表示されます。</p>
 *   </ViewDialog>
 * );
 * ```
 */
export function FormDialog<T>({
    trigger,
    title,
    description,
    children,
    contentClassName,
    headerClassName,
    titleClassName,
    descriptionClassName,
    footerClassName,
    formBodyAction,
    initialState,
    submitButtonClassName,
    submitButtonVariant = "primary",
    submitButtonText = "サブミット",
    cancelButtonClassName,
    cancelButtonVariant = "secondary",
    cancelButtonText = "キャンセル",
}: FormDialogProps<T>) {
    const [open, setOpen] = useState(false);

    const [state, formAction, isPending] = useActionState(formBodyAction, initialState);

    useEffect(() => {
        if (state.success) {
            setOpen(false);
        }
    }, [state]);

    return (
        <ShadcnDialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className={contentClassName}>
                <form action={formAction}>
                    {(title || description) && (
                        <DialogHeader className={headerClassName}>
                            {title && <DialogTitle className={titleClassName}>{title}</DialogTitle>}
                            {description && (
                                <DialogDescription className={descriptionClassName}>
                                    {description}
                                </DialogDescription>
                            )}
                        </DialogHeader>
                    )}
                    {children}
                    <DialogFooter className={footerClassName}>
                        <Button
                            variant={submitButtonVariant}
                            className={submitButtonClassName}
                            type="submit"
                            disabled={isPending}
                        >
                            {submitButtonText}
                        </Button>
                        <DialogClose asChild>
                            <Button
                                variant={cancelButtonVariant}
                                className={cancelButtonClassName}
                                disabled={isPending}
                            >
                                {cancelButtonText}
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </ShadcnDialog>
    );
}
