import {
    Tooltip as ShadcnTooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/shadcn/tooltip";

export interface TooltipProps {
    /** ツールチップの内容です。 */
    content: React.ReactNode;
    /** ツールチップを表示するトリガー要素です。 */
    children: React.ReactNode;
    /** ツールチップの表示位置を指定します。'top'、'right'、'bottom'、'left'が指定できます。 */
    side?: "top" | "right" | "bottom" | "left";
    /** ツールチップの表示位置のオフセットを指定します。デフォルトは4です。 */
    sideOffset?: number;
    /** ツールチップのアライメントを指定します。'start'、'center'、'end'が指定できます。 */
    align?: "start" | "center" | "end";
    /** ツールチップのアライメントのオフセットを指定します。デフォルトは0です。 */
    alignOffset?: number;
    /** 追加のCSSクラス名を指定します。 */
    className?: string;
}

export function Tooltip({
    content,
    children,
    side = "top",
    sideOffset = 4,
    align = "center",
    alignOffset = 0,
    className,
}: TooltipProps) {
    return (
        <ShadcnTooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent
                side={side}
                sideOffset={sideOffset}
                align={align}
                alignOffset={alignOffset}
                className={className}
            >
                {content}
            </TooltipContent>
        </ShadcnTooltip>
    );
}
