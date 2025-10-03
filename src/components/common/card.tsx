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
    /** カードのヘッダーに表示するタイトルです。 */
    title?: string;
    /** タイトルの下に表示する補足説明です。 */
    description?: string;
    /** ヘッダーの右側に表示するアクション要素（ボタンなど）です。 */
    action?: React.ReactNode;
    /** カードのフッターに表示する要素です。 */
    footer?: React.ReactNode;
    /** カード全体のコンテナ（`ShadcnCard`）に適用するCSSクラスです。 */
    className?: string;
    /** `CardTitle`コンポーネントに適用するCSSクラスです。 */
    titleClassName?: string;
    /** `CardDescription`コンポーネントに適用するCSSクラスです。 */
    descriptionClassName?: string;
    /** `CardAction`コンポーネントに適用するCSSクラスです。 */
    actionClassName?: string;
    /** `CardContent`コンポーネントに適用するCSSクラスです。 */
    contentClassName?: string;
    /** `CardFooter`コンポーネントに適用するCSSクラスです。デフォルトは "flex-col gap-2" です。 */
    footerClassName?: string;
    /** カードのメインコンテンツとして表示する要素です。 */
    children: React.ReactNode;
}

/**
 * @component Card
 * @description 情報を整理して表示するための汎用的なカードコンポーネントです。
 *
 * ## 機能
 * - ヘッダー、コンテンツ、フッターの各セクションを組み合わせて柔軟なレイアウトを構築できます。
 * - ヘッダーにはタイトル、説明、アクション要素を配置可能です。
 *
 * ## 依存関係
 * このコンポーネントは `shadcn/ui` の以下のコンポーネントに依存しています:
 * - `Card` (as `ShadcnCard`)
 * - `CardHeader`
 * - `CardFooter`
 * - `CardTitle`
 * - `CardDescription`
 * - `CardContent`
 * - `CardAction`
 *
 * ## スタイリング
 * - 各パーツ（`title`, `description`, `content`など）に個別のCSSクラスを適用できます。
 * - `className` prop を通じてカード全体にスタイルを適用することも可能です。
 *
 * @example
 * ```tsx
 * import { Card } from "./Card";
 * import { Button } from "@/components/shadcn/button";
 *
 * const MyCard = () => (
 *   <Card
 *     title="カードのタイトル"
 *     description="これはカードの簡単な説明文です。"
 *     action={<Button variant="outline">アクション</Button>}
 *     footer={<p>フッター情報</p>}
 *     className="w-[350px]"
 *   >
 *     <p>
 *       ここにカードの本文が入ります。
 *       テキストや他のコンポーネントを自由に配置できます。
 *     </p>
 *   </Card>
 * );
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
