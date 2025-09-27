import {
    Card as ShadcnCard,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/shadcn/card";

export interface CardProps {
    /** カードのタイトル（任意） */
    title?: string;
    /** 補足説明（任意） */
    description?: string;
    /** タイトル右側などに置くアクション（任意） */
    action?: React.ReactNode;
    /** フッター部分（任意） */
    footer?: React.ReactNode;
    /** ShadcnCard に付与する cssクラス（任意） */
    className?: string;
    /** titleコンポーネント に付与する cssクラス（任意） */
    titleClassName?: string;
    /** descriptionコンポーネント に付与する cssクラス（任意） */
    descriptionClassName?: string;
    /** actionコンポーネント に付与する cssクラス（任意） */
    actionClassName?: string;
    /** contentコンポーネント に付与する cssクラス（任意） */
    contentClassName?: string;
    /** footerコンポーネント に付与する cssクラス（任意） */
    footerClassName?: string;
    /** 本文（必須） */
    children: React.ReactNode;
}

/**
 * 汎用カードコンポーネント
 *
 * shadcn/ui の Card コンポーネントをベースにしたカスタムカード。
 * - タイトル、説明、アクションは任意。
 * - メインの `content` は必須。
 * - `footer` は任意で、補足情報やボタンを置く想定。
 *
 * @component
 * @example
 * ```tsx
 * <Card
 *   title="カードのタイトル"
 *   description="カードの説明文"
 *   action={<Button>アクション</Button>}
 *   content={<p>ここにカードの内容が入ります。</p>}
 *   footer={<span>フッター情報</span>}
 * />
 * ```
 */
export function Card({
    title,
    description,
    action,
    footer,
    className,
    titleClassName,
    descriptionClassName,
    actionClassName,
    contentClassName,
    footerClassName = "flex-col gap-2",
    children,
}: CardProps) {
    return (
        <ShadcnCard className={className}>
            {/* ヘッダー部分（タイトル・説明・アクション） */}
            {(title || description || action) && (
                <CardHeader>
                    {title && <CardTitle className={titleClassName}>{title}</CardTitle>}
                    {description && (
                        <CardDescription className={descriptionClassName}>
                            {description}
                        </CardDescription>
                    )}
                    {action && <CardAction className={actionClassName}>{action}</CardAction>}
                </CardHeader>
            )}

            {/* メインコンテンツ部分（必須） */}
            <CardContent className={contentClassName}>{children}</CardContent>

            {/* フッター部分（任意） */}
            {footer && <CardFooter className={footerClassName}>{footer}</CardFooter>}
        </ShadcnCard>
    );
}
