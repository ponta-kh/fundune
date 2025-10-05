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
 * import { FormDialog } from "./form-dialog";
 * import { Button } from "@/components/shadcn/button";
 * import { Input } from "@/components/shadcn/input";
 *
 * const MyFormDialog = () => (
 *   <FormDialog
 *     trigger={<Button>フォームを開く</Button>}
 *     title="新規作成"
 *     description="新しい項目を作成します。"
 *     footerComponent={<Button type="submit" form="my-form">保存</Button>}
 *   >
 *     {({ setOpen }) => (
 *       <form id="my-form" onSubmit={(e) => {
 *         e.preventDefault();
 *         console.log("submitting");
 *         setOpen(false);
 *       }}>
 *         <Input placeholder="項目名" />
 *       </form>
 *     )}
 *   </FormDialog>
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
