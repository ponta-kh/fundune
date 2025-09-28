import * as React from "react";
import {
    Accordion as ShadcnAccordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/shadcn/accordion";

interface AccordionItemProps {
    /** アコーディオンの各項目を識別するための一意な値です。 */
    value: string;
    /** ヘッダーとして表示されるタイトルです。クリックするとコンテンツが開閉します。 */
    title: React.ReactNode;
    /** 開いたときに表示されるコンテンツです。 */
    content: React.ReactNode;
    /** `AccordionItem`に適用するCSSクラスです。 */
    itemClassName?: string;
    /** `AccordionTrigger`に適用するCSSクラスです。 */
    triggerClassName?: string;
    /** `AccordionContent`に適用するCSSクラスです。 */
    contentClassName?: string;
}

export interface AccordionProps {
    /** 表示するアコーディオンの項目の配列。 */
    items: AccordionItemProps[];
    /**
     * アコーディオンのタイプを決定します。
     * - `single`: 一度に1つの項目のみ開けます。
     * - `multiple`: 複数の項目を同時に開けます。
     * @default "single"
     */
    type?: "single" | "multiple";
    /**
     * `type="single"` の場合に、開いている項目を閉じることができるかどうか。
     * @default false
     */
    collapsible?: boolean;
    /** 初期状態で開いておく項目の `value`。`type="single"`なら文字列、`type="multiple"`なら文字列配列。 */
    defaultValue?: string | string[];
    /** `Accordion`ルート要素に適用するCSSクラスです。 */
    className?: string;
}

/**
 * @component Accordion
 * @description クリックでコンテンツを開閉できるアコーディオンコンポーネントです。
 *
 * ## 機能
 * - `items` prop に配列を渡すだけで、複数のアコーディオン項目を簡単に生成できます。
 * - `type` prop で、一度に単一の項目のみ開くか、複数の項目を開くかを制御できます。
 *
 * ## 依存関係
 * このコンポーネントは `shadcn/ui` の `Accordion` 関連コンポーネントに依存しています。
 *
 * ## スタイリング
 * - `className` を通じて、アコーディオン全体や各項目（`item`, `trigger`, `content`）にカスタムスタイルを適用できます。
 *
 * @example
 * ```tsx
 * const accordionItems = [
 *   {
 *     value: "item-1",
 *     title: "これは項目1ですか？",
 *     content: "はい、これは項目1のコンテンツです。",
 *   },
 *   {
 *     value: "item-2",
 *     title: "これは項目2ですか？",
 *     content: "はい、これは項目2のコンテンツです。",
 *   },
 * ];
 *
 * <Accordion
 *   items={accordionItems}
 *   type="single"
 *   collapsible
 *   defaultValue="item-1"
 * />
 * ```
 */
export function Accordion({
    items,
    type = "single",
    collapsible = false,
    defaultValue,
    className,
}: AccordionProps) {
    return (
        <ShadcnAccordion
            type={type}
            collapsible={collapsible}
            defaultValue={defaultValue}
            className={className}
        >
            {items.map((item) => (
                <AccordionItem
                    key={item.value}
                    value={item.value}
                    className={item.itemClassName}
                >
                    <AccordionTrigger className={item.triggerClassName}>
                        {item.title}
                    </AccordionTrigger>
                    <AccordionContent className={item.contentClassName}>
                        {item.content}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </ShadcnAccordion>
    );
}
