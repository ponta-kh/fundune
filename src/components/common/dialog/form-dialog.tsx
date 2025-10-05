"use client";

import { useState } from "react";
import {
    Dialog as ShadcnDialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/shadcn/dialog";

export interface FormDialogProps {
    /** ダイアログを開くためのトリガー要素。 */
    trigger: React.ReactNode;
    /** ダイアログのヘッダーに表示するタイトル。 */
    title?: string;
    /** タイトルの下に表示する補足説明（任意）。 */
    description?: string;
    /** ダイアログのメインコンテンツとして表示する要素。setOpenを受け取る関数を指定します。 */
    children: (props: { setOpen: (open: boolean) => void }) => React.ReactNode;
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
    /** ダイアログのフッターに設置するコンポーネント要素。 */
    footerComponent?: React.ReactNode;
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
export function FormDialog({
    trigger,
    title,
    description,
    children,
    contentClassName,
    headerClassName,
    titleClassName,
    descriptionClassName,
    footerClassName,
    footerComponent,
}: FormDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <ShadcnDialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
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
                {children({ setOpen })}
                {footerComponent && (
                    <DialogFooter className={footerClassName}>{footerComponent}</DialogFooter>
                )}
            </DialogContent>
        </ShadcnDialog>
    );
}
