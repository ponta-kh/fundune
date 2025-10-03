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

export interface MultipleAccordionProps {
    items: AccordionItemProps[];
    defaultValue?: string[];
    className?: string;
}

/**
 * @component MultipleAccordion
 * @description 複数の項目を同時に開閉できるアコーディオンコンポーネントです。
 *
 * ## 機能
 * - `items` prop に配列を渡すだけで、複数のアコーディオン項目を簡単に生成できます。
 * - `defaultValue` prop で、初期状態で開いておく項目を指定できます。
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
 *   {
 *     value: "item-3",
 *     title: "これは項目3ですか？",
 *     content: "はい、これは項目3のコンテンツです。",
 *   },
 * ];
 *
 * // "item-1" と "item-2" を初期状態で開く
 * <MultipleAccordion
 *   items={accordionItems}
 *   defaultValue={["item-1", "item-2"]}
 * />
 * ```
 */
export function MultipleAccordion({ items, defaultValue, className }: MultipleAccordionProps) {
    return (
        <ShadcnAccordion type="multiple" defaultValue={defaultValue} className={className}>
            {items.map((item) => (
                <AccordionItem key={item.value} value={item.value} className={item.itemClassName}>
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
