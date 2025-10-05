"use client";

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
import { useState } from "react";

export interface ViewDialogProps {
    /** ダイアログを開くためのトリガー要素。 */
    trigger?: React.ReactNode;
    /** ダイアログを画面描画時に表示するかどうか。デフォルトはfalse。 */
    isInitiallyOpen?: boolean;
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
    /** 閉じるボタンに適用するCSSクラス。 */
    closeButtonClassName?: string;
    /** 閉じるボタンのバリアント。デフォルトは "secondary"。 */
    closeButtonVariant?: "primary" | "secondary" | "destructive" | "outline" | "ghost";
    /** 閉じるボタンのテキスト。デフォルトは "Close"。 */
    closeButtonText?: string;
}

/**
 * @component ViewDialog
 * @description 情報表示用の汎用的なモーダルダイアログです。
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
export function ViewDialog({
    trigger,
    isInitiallyOpen = false,
    title,
    description,
    children,
    contentClassName,
    headerClassName,
    titleClassName,
    descriptionClassName,
    footerClassName,
    closeButtonClassName,
    closeButtonVariant = "secondary",
    closeButtonText = "閉じる",
}: ViewDialogProps) {
    const [open, setOpen] = useState(isInitiallyOpen);

    return (
        <ShadcnDialog open={open} onOpenChange={setOpen}>
            {title && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className={contentClassName}>
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
                    <DialogClose asChild>
                        <Button variant={closeButtonVariant} className={closeButtonClassName}>
                            {closeButtonText}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </ShadcnDialog>
    );
}
