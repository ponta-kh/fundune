"use client";

import * as React from "react";
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

export interface ViewDialogProps {
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
    headerClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    footerClassName?: string;
    closeButtonText?: string;
}

/**
 * @component Dialog
 * @description ユーザーに追加情報やアクションを求めるための汎用的なモーダルダイアログです。
 *
 * ## 機能
 * - トリガー、ヘッダー、コンテンツ、フッターを簡単に設定できます。
 * - 制御コンポーネントと非制御コンポーネントの両方のモードをサポートします。
 *
 * ## 依存関係
 * このコンポーネントは `shadcn/ui` の `Dialog` 関連コンポーネントに依存しています。
 *
 * ## 使い方
 * - `trigger` prop にダイアログを開くボタンなどの要素を渡します。
 * - `title` と `children` は必須です。
 * - `description` と `footer` は任意です。
 *
 * @example
 * ```tsx
 * import { Dialog } from "./Dialog";
 * import { Button } from "@/components/shadcn/button";
 *
 * const MyDialog = () => (
 *   <Dialog
 *     trigger={<Button>プロフィールを編集</Button>}
 *     title="プロフィールの編集"
 *     description="変更を保存するには、下のボタンをクリックしてください。"
 *     footer={
 *       <>
 *         <Button variant="outline">キャンセル</Button>
 *         <Button>保存</Button>
 *       </>
 *     }
 *   >
 *     <p>ここにフォームなどのコンテンツが入ります。</p>
 *   </Dialog>
 * );
 * ```
 */
export function ViewDialog({
    trigger,
    title,
    description,
    children,
    closeButtonText = "Close",
    contentClassName,
    headerClassName,
    titleClassName,
    descriptionClassName,
    footerClassName,
}: ViewDialogProps) {
    return (
        <ShadcnDialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className={contentClassName}>
                <DialogHeader className={headerClassName}>
                    {title && <DialogTitle className={titleClassName}>{title}</DialogTitle>}
                    {description && (
                        <DialogDescription className={descriptionClassName}>
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>
                {children}
                <DialogFooter className={footerClassName}>
                    <DialogClose asChild>
                        <Button variant="outline">{closeButtonText}</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </ShadcnDialog>
    );
}
